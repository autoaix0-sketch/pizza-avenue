"""
Pizza Avenue — local background removal
========================================

Two modes, both deterministic and offline:

  white  For photos shot on a pure / near-white background (stock "PNG"
         downloads, image-model outputs that ignored "transparent"). Removes
         every near-white pixel connected to the image border, then softens
         the edge. Near-white areas *inside* the subject (mozzarella, a bun's
         highlight) are untouched because they are not connected to the border.

  neutral  For a grey/white backdrop, including the fake "transparency"
         checkerboard that stock "PNG" previews bake into a JPG.

  neutral-round  `neutral`, then an outline fit for round subjects (a
         pizza): clips anything that bulges past the crust, e.g. a baked-in
         shadow that still carries checkerboard.

  round  For a round pizza on a board or table. Walks outward from the centre
         along 720 rays, finds the crust's outer edge as the steepest drop in
         brightness, median-filters that radius around the circle (so a
         charred blister or a basil leaf cannot bite into the outline) and
         cuts along it.

Both write a transparent PNG trimmed to the subject and padded to a square,
which is the shape the hero wedge geometry expects (see index.html).

Usage:
  python scripts/cutout.py white images/raw/pizza.jpg images/cat_pizza.png
  python scripts/cutout.py round images/raw/piizza.jpg images/hero_pizza.png
"""
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SUPERSAMPLE = 4


def white_matte(rgb: np.ndarray, tol: float = 26.0) -> np.ndarray:
    """Boolean foreground mask: False where the pixel is near-white AND
    connected to the border."""
    dist = np.sqrt(((255.0 - rgb.astype(np.float32)) ** 2).sum(axis=2))
    return border_flood(dist < tol)


def neutral_matte(rgb: np.ndarray) -> np.ndarray:
    """Same idea for a grey/white backdrop — typically a "transparent PNG"
    preview whose checkerboard was flattened into the pixels. Background =
    colourless (chroma < 12) and not dark (a baked-in shadow darkens the
    checker to ~105), connected to the border. Food is
    never that grey; charred crust spots are dark, so they stay."""
    f = rgb.astype(np.int16)
    chroma = f.max(axis=2) - f.min(axis=2)
    lum = f.mean(axis=2)
    return border_flood((chroma < 12) & (lum > 95))


def border_flood(candidate: np.ndarray) -> np.ndarray:
    """Flood-fill `candidate` pixels from the image border; return the
    foreground mask (everything the flood did not reach)."""
    h, w = candidate.shape
    near_white = candidate
    bg = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near_white[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near_white[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and near_white[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                q.append((ny, nx))
    return ~bg


def round_outline(im: Image.Image, inset: float = 3.0):
    """Polygon (list of (x, y)) following the crust's outer edge."""
    a = np.asarray(im.filter(ImageFilter.GaussianBlur(2))).astype(np.float32)
    lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    h, w = lum.shape
    cx, cy = w / 2.0, h / 2.0
    guess = min(w, h) * 0.41
    n = 720
    thetas = np.linspace(0, 2 * np.pi, n, endpoint=False)
    radii = np.arange(guess * 0.85, guess * 1.15, 1.0)

    for _ in range(3):
        r = np.zeros(n)
        for i, t in enumerate(thetas):
            xs = np.clip((cx + radii * np.cos(t)).astype(int), 0, w - 1)
            ys = np.clip((cy + radii * np.sin(t)).astype(int), 0, h - 1)
            prof = np.convolve(lum[ys, xs], np.ones(5) / 5, mode='same')
            g = prof[4:] - prof[:-4]
            r[i] = radii[np.argmin(g[2:-2]) + 4]
        k = 15
        rp = np.concatenate([r[-k:], r, r[:k]])
        r = np.array([np.median(rp[i:i + 2 * k + 1]) for i in range(n)])
        xs, ys = cx + r * np.cos(thetas), cy + r * np.sin(thetas)
        cx, cy = xs.mean(), ys.mean()

    r = r - inset
    return list(zip(cx + r * np.cos(thetas), cy + r * np.sin(thetas)))


def round_refine(fg: np.ndarray) -> list:
    """For a round subject: walk the matte's outline along 720 rays from its
    centroid, fit a smooth near-circle to it (radius + an elliptical term,
    refit twice after dropping outliers) and clip every ray that bulges past
    that fit. Removes leftovers such as a baked-in shadow still carrying
    checkerboard under the crust, without flattening the crust's own
    irregular edge."""
    ys, xs = np.nonzero(fg)
    cx, cy = xs.mean(), ys.mean()
    h, w = fg.shape
    n = 720
    th = np.linspace(0, 2 * np.pi, n, endpoint=False)
    rmax = int(np.hypot(w, h) / 2)
    r = np.zeros(n)
    for i, t in enumerate(th):
        steps = np.arange(0, rmax)
        px = np.clip((cx + steps * np.cos(t)).astype(int), 0, w - 1)
        py = np.clip((cy + steps * np.sin(t)).astype(int), 0, h - 1)
        inside = fg[py, px]
        # First run of 4 background pixels = the edge along this ray.
        out = np.flatnonzero(~inside)
        edge = rmax
        for j in out:
            if j + 3 < len(inside) and not inside[j:j + 4].any():
                edge = j
                break
        r[i] = edge

    basis = np.stack([np.ones(n), np.cos(2 * th), np.sin(2 * th)], axis=1)
    keep = np.ones(n, dtype=bool)
    for _ in range(3):
        coef, *_ = np.linalg.lstsq(basis[keep], r[keep], rcond=None)
        fit = basis @ coef
        keep = np.abs(r - fit) < 0.025 * fit
    # Pull in 3px: the last ring of pixels carries grey from the backdrop.
    r = np.minimum(r, fit * 1.012) - 3.0
    return list(zip(cx + r * np.cos(th), cy + r * np.sin(th)))


def mask_from_polygon(size, poly) -> Image.Image:
    w, h = size
    big = Image.new('L', (w * SUPERSAMPLE, h * SUPERSAMPLE), 0)
    ImageDraw.Draw(big).polygon([(x * SUPERSAMPLE, y * SUPERSAMPLE) for x, y in poly], fill=255)
    return big.resize((w, h), Image.LANCZOS)


def finish(im: Image.Image, alpha: Image.Image, out_path: str):
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    rgba = rgba.crop(bbox)
    side = max(rgba.size)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    square.paste(rgba, ((side - rgba.width) // 2, (side - rgba.height) // 2))
    square.save(out_path)
    print(f'{out_path}: {square.size}')


def main():
    mode, src, dst = sys.argv[1:4]
    im = Image.open(src).convert('RGB')
    if mode in ('white', 'neutral'):
        fg = (white_matte if mode == 'white' else neutral_matte)(np.asarray(im))
        alpha = Image.fromarray((fg * 255).astype(np.uint8))
        # Pull the edge in by a pixel, then soften it: removes the pale halo
        # a hard white-key leaves around crusts and buns.
        alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    elif mode == 'neutral-round':
        fg = neutral_matte(np.asarray(im))
        alpha = mask_from_polygon(im.size, round_refine(fg)).filter(ImageFilter.GaussianBlur(0.7))
    elif mode == 'round':
        alpha = mask_from_polygon(im.size, round_outline(im)).filter(ImageFilter.GaussianBlur(0.7))
    else:
        raise SystemExit(f'unknown mode {mode!r} (white | neutral | neutral-round | round)')
    finish(im, alpha, dst)


if __name__ == '__main__':
    main()
