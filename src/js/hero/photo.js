/* =========================================================================
   PIZZA AVENUE — la photo du héros
   =========================================================================
   Choisit dans le manifeste la taille de images/hero_pizza.png adaptée à
   l'écran (taille affichée × densité de pixels), la décode AVANT le
   premier rendu du héros, puis la pose sur les neuf <image> du SVG
   (la photo entière + les 8 parts découpées). Rien n'est écrit en dur
   dans index.html : remplacer images/hero_pizza.png et relancer
   scripts/optimize_assets.py suffit.

   Format : AVIF d'abord, WebP si le navigateur ne sait pas le lire. C'est
   la plus grosse image de la page, et l'AVIF pèse ~38 % de moins (67 Ko au
   lieu de 108 Ko en 742 px, 36 Ko au lieu de 62 Ko en 480 px). Un <picture>
   ferait ce choix tout seul, mais une <image> SVG ne sait pas le faire :
   on essaie donc, et on retombe sur le WebP si le décodage échoue.
   ========================================================================= */

const KEY = 'hero_pizza';

function entry() {
  return (window.PIZZA_AVENUE_IMAGES || {})[KEY] || null;
}

/* La largeur du fichier à prendre, d'après la place réelle à l'écran. */
function pickWidth() {
  const data = entry();
  if (!data) return null;

  // offsetWidth ignore les transforms : c'est la taille avant animation.
  const el = document.getElementById('heroPizza');
  const cssPx = (el && el.offsetWidth) || 480;
  const needed = cssPx * 1.15 * Math.min(window.devicePixelRatio || 1, 2.5);

  const sizes = data.sizes.map((s) => s[0]).sort((a, b) => a - b);
  return sizes.find((w) => w >= needed) || sizes[sizes.length - 1];
}

function urlFor(width, ext) {
  return `assets/food/${entry().stem}-${width}.${ext}`;
}

/* Télécharge et décode une URL. Résout avec l'URL, rejette si le navigateur
   ne sait pas lire ce format — c'est ce rejet qui déclenche le repli WebP.

   decode() peut rester en attente pour toujours (onglet en arrière-plan,
   certains navigateurs intégrés) alors que l'image est chargée : toute la
   page attendrait. On part donc dès que l'image est décodée OU chargée,
   et au plus tard après 3 s. */
function load(url) {
  const img = new Image();
  img.decoding = 'async';
  img.fetchPriority = 'high';

  const loaded = new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  img.src = url;
  const decoded = img.decode ? img.decode() : loaded;
  const timeout = new Promise((res) => setTimeout(res, 3000));

  return Promise.race([decoded, loaded, timeout]).then(() => url);
}

/* Démarre le téléchargement tout de suite (appelé au chargement du module,
   avant même que les polices soient prêtes) et renvoie une promesse qui se
   résout quand l'image est décodée — ou tout de suite si elle échoue : un
   héros sans photo vaut mieux qu'une page bloquée. */
export function loadHeroPhoto() {
  const width = pickWidth();
  if (!width) return Promise.resolve(null);

  return load(urlFor(width, 'avif'))
    .catch(() => load(urlFor(width, 'webp')))
    .then((url) => {
      document.querySelectorAll('#heroPizza .pizza-photo').forEach((el) => el.setAttribute('href', url));
      return url;
    })
    .catch(() => null);
}
