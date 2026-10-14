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

  /* decode() peut rester en attente pour toujours (onglet en arrière-plan,
     certains navigateurs intégrés) alors que l'image est chargée : toute la
     page attendrait. On part donc dès que l'image est décodée OU chargée,
     et au plus tard après 3 s. */
  const loaded = new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  img.src = url;
  const decoded = img.decode ? img.decode() : loaded;
  const timeout = new Promise((res) => setTimeout(res, 3000));

  return Promise.race([decoded, loaded, timeout])
    .then(() => {
      document.querySelectorAll('#heroPizza .pizza-photo').forEach((el) => el.setAttribute('href', url));
      return url;
    })
    .catch(() => null);
}
