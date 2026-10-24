/* La carte, les horaires, les offres et les photos envoyées sont des fichiers
   JSON dans public/data/, chargés par index.html avant ce module : le tableau
   de bord les réécrit sans reconstruire le code. */
import './data/site.js';
import './data/manifest.js';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/yellowtail/400.css';
import '@fontsource/anton/400.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/hero.css';
import './styles/sections.css';

import { applyLanguage, initialLanguage, wireLanguage, onLanguageChange } from './js/i18n.js';
import { paintStatus, renderHours } from './js/hours.js';
import { renderMenu, wireMenuRows } from './js/menu.js';
import { renderContact, renderBanner, wireMap } from './js/venir.js';
import { renderPosters } from './js/posters.js';
import { initReveals, initNavScrim, initReviewsVisibility, numberSections, initMobileNav } from './js/sections.js';
import { initHero } from './js/hero/timeline.js';
import { enrichRestaurantLd } from './js/seo.js';
import { loadHeroPhoto } from './js/hero/photo.js';

// Le téléchargement de la photo du héros part dès l'évaluation du module,
// en parallèle des polices — c'est l'image la plus importante de la page.
const heroPhoto = loadHeroPhoto();

function resolveMotionPreference() {
  const params = new URLSearchParams(location.search);
  const override = params.get('motion'); // ?motion=reduced | ?motion=full — QA
  if (override === 'reduced') return true;
  if (override === 'full') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function boot(photoUrl) {
  const site = window.PIZZA_AVENUE_SITE;
  const reduced = resolveMotionPreference();
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';

  const reviewCount = site && site.reviews ? site.reviews.count : null;

  onLanguageChange(() => {
    renderMenu();
    renderPosters();
    renderHours();
    renderBanner();
    paintStatus();
    numberSections(); // la section « offres » disparaît quand il n'y en a pas
    initReveals();
  });

  wireLanguage(reviewCount);
  wireMenuRows();
  wireMap();
  initNavScrim();
  initMobileNav();
  initReviewsVisibility();
  renderContact();
  enrichRestaurantLd();

  applyLanguage(initialLanguage(), reviewCount);
  initHero({ reduced, hasPhoto: !!photoUrl });
  document.getElementById('heroStage')?.classList.add('is-ready');

  /* Le badge ouvert / fermé et l'avis de fermeture se mettent à jour seuls. */
  setInterval(() => { paintStatus(); renderBanner(); }, 60000);
}

/* Le héros ne démarre qu'une fois les polices ET la photo prêtes : le
   premier rendu ne saute pas et la pizza n'apparaît pas à moitié chargée. */
function whenReady() {
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.all([fontsReady.catch(() => null), heroPhoto]).then(([, url]) => boot(url));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', whenReady);
} else {
  whenReady();
}
