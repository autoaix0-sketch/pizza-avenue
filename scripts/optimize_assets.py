"""
Pizza Avenue — asset pipeline
==============================

Turns the image slots in `images/` into web-ready AVIF + WebP in
`public/assets/food/`, and writes `src/data/manifest.js` — the
{ stem, kind, sizes: [[w, h], …] } contract that `picture()` in
src/js/utils.js reads, so every <picture> ships its real width/height and
nothing shifts while loading.

The slots are fixed filenames (see images/SOURCES.md):

    images/hero_pizza.png   images/cat_*.png   images/garnish_*.png
    images/maison_scene.jpg

Drop a new file in with the same name, rerun this script, and it is live.
PNG masters keep their transparency: WebP and AVIF both carry alpha and are
roughly 10x lighter than PNG on the wire.

Only files directly in `images/` are read — `images/raw/` (untouched
uploads) and `images/legacy/` (retired pass-1 cutouts) are ignored.

For a photo on a white background, cut it out first with
scripts/cutout.py.

Usage: python scripts/optimize_assets.py
"""
from pathlib import Path
import shutil

import pillow_avif  # noqa: F401  (registers the AVIF plugin with Pillow)
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "public" / "assets" / "food"
MANIFEST = ROOT / "src" / "data" / "manifest.js"

BREAKPOINTS = [480, 960, 1600]


def widths_for(source_width: int) -> list[int]:
    """Standard breakpoints below the source width, plus the source width
    itself as the top size. Never upscales."""
    ws = [b for b in BREAKPOINTS if b < source_width]
    ws.append(min(source_width, BREAKPOINTS[-1]))
    return sorted(set(ws))


def save_variant(im: Image.Image, path_no_ext: Path, width: int):
    work = im
    if work.width > width:
        work = work.resize((width, round(work.height * width / work.width)), Image.LANCZOS)
    work.save(f"{path_no_ext}.webp", quality=84, method=6)
    work.save(f"{path_no_ext}.avif", quality=60)
    return work.size


def main():
    # Start clean: a retired image must not linger in public/ and get served.
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    entries = {}
    sources = sorted(
        p for p in SRC.iterdir()
        if p.is_file() and p.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp")
    )

    for src in sources:
        key = src.stem.lower().replace("-", "_")
        im = Image.open(src)
        im.load()
        has_alpha = "A" in im.getbands()
        im = im.convert("RGBA" if has_alpha else "RGB")
        kind = "cutout" if has_alpha else "photo"

        sizes = [list(save_variant(im, OUT / f"{key}-{w}", w)) for w in widths_for(im.width)]
        entries[key] = {"stem": key, "kind": kind, "sizes": sizes}
        print(f"{src.name:24s} -> {key:16s} {kind:6s} {sizes}")

    lines = [
        "/* Généré par scripts/optimize_assets.py — ne pas modifier à la main. */",
        "/* Dimensions réelles de chaque image, pour réserver la place avant",
        "   le chargement et éviter que la page ne saute. */",
        "window.PIZZA_AVENUE_IMAGES = {",
    ]
    for key in sorted(entries):
        e = entries[key]
        sizes_str = ", ".join(f"[{w}, {h}]" for w, h in e["sizes"])
        lines.append(f"  {key}: {{ stem: '{e['stem']}', kind: '{e['kind']}', sizes: [{sizes_str}] }},")
    lines.append("};")
    MANIFEST.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\nWrote {MANIFEST.relative_to(ROOT)} ({len(entries)} entries)")


if __name__ == "__main__":
    main()
