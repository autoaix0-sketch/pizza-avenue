/* =========================================================================
   PIZZA AVENUE — la photo du héros
   =========================================================================
   Choisit dans le manifeste la taille de images/hero_pizza.png adaptée à
   l'écran (taille affichée × densité de pixels), la décode AVANT le
   premier rendu du héros, puis la pose sur les neuf <image> du SVG
   (la photo entière + les 8 parts découpées). Rien n'est écrit en dur
   dans index.html : remplacer images/hero_pizza.png et relancer
   scripts/optimize_assets.py suffit.
   ========================================================================= */

const KEY = 'hero_pizza';

function pickUrl() {
  const entry = (window.PIZZA_AVENUE_IMAGES || {})[KEY];
  if (!entry) return null;

  // Taille réelle de la pizza à l'écran (offsetWidth ignore les transforms),
  // agrandie par le zoom maximal de la phase 2 et la densité de pixels.
  const el = document.getElementById('heroPizza');
  const cssPx = (el && el.offsetWidth) || 480;
  const needed = cssPx * 1.15 * Math.min(window.devicePixelRatio || 1, 2.5);

  const sizes = entry.sizes.map((s) => s[0]).sort((a, b) => a - b);
  const width = sizes.find((w) => w >= needed) || sizes[sizes.length - 1];
  return `assets/food/${entry.stem}-${width}.webp`;
}

/* Démarre le téléchargement tout de suite (appelé au chargement du module,
   avant même que les polices soient prêtes) et renvoie une promesse qui se
   résout quand l'image est décodée — ou tout de suite si elle échoue : un
   héros sans photo vaut mieux qu'une page bloquée. */
export function loadHeroPhoto() {
  const url = pickUrl();
  if (!url) return Promise.resolve(null);

  const img = new Image();
  img.decoding = 'async';
  img.fetchPriority = 'high';
  img.src = url;

  const decoded = img.decode ? img.decode() : new Promise((res) => { img.onload = res; });
  return decoded
    .then(() => {
      document.querySelectorAll('#heroPizza .pizza-photo').forEach((el) => el.setAttribute('href', url));
      return url;
    })
    .catch(() => null);
}
