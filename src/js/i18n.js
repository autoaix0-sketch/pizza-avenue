/* =========================================================================
   PIZZA AVENUE — moteur de langues (FR / ES / EN)
   =========================================================================
   Porté depuis Taco Naan (assets/js/site.js) : même mécanique — un
   dictionnaire plat, un attribut data-i18n / data-i18n-html / data-i18n-aria,
   la langue mémorisée en localStorage, détectée sinon depuis le navigateur.
   ========================================================================= */

export const STRINGS = {
  fr: {
    skip: 'Aller au contenu',
    'nav.menu': 'La carte',
    'nav.maison': 'La maison',
    'nav.avis': 'Les avis',
    'nav.venir': 'Nous trouver',
    'nav.call': 'Commander',
    'nav.open': 'Menu',
    'nav.close': 'Fermer',
    'price.from': 'dès',

    'hero.kicker': 'Pizza · Burgers · Tacos · Tex-Mex',
    'hero.t1': 'Bonne bouffe.',
    'hero.t2': 'Bonne humeur.',
    'hero.t3': 'Tous les jours.',
    'hero.lede': 'Pâte pétrie sur place, viande grillée à la commande, sauces maison. <strong>Toujours vite, jamais bâclé.</strong>',
    'hero.cta': 'Voir la carte',
    'hero.scroll': 'Faites défiler',
    'hero.badge': 'FAIT MAISON ✦ SERVI CHAUD ✦',
    'brand.p': 'Pizza Avenue est né d’une idée simple : le fast-food peut être fait avec soin, sans perdre en vitesse ni en plaisir. Quatre cuisines, une seule exigence.',

    'menu.eyebrow': 'La carte',
    'menu.h2': 'Quatre routes, <em>une avenue</em>',
    'menu.intro': 'Tout est préparé à la commande. Les prix sont les mêmes sur place et à emporter.',
    'menu.extras': 'À côté',

    'formules.eyebrow': 'Les formules',
    'formules.h2': 'Nos formules <em>signature</em>',
    'formules.intro': 'Des menus pensés pour être partagés — ou pas. Prix fixes, sur place et à emporter.',
    'poster.price': 'la formule',
    'poster.order': 'Commander',

    'maison.eyebrow': 'La maison',
    'maison.h2': 'Un comptoir, <em>pas une chaîne</em>',
    'maison.p1': 'On a ouvert avenue pour faire une chose correctement : une pâte pétrie sur place, une viande grillée au moment où vous la commandez, des sauces qu’on fait nous-mêmes.',
    'maison.p2': 'Pas de raccourci, pas de surgelé qui traîne, pas quarante minutes d’attente. Vous commandez, on prépare, c’est prêt.',
    'maison.caption': 'cuite minute, chaque jour',
    'proof.1.t': 'La pâte, tous les jours',
    'proof.1.d': 'Pétrie et poussée sur place, jamais la veille.',
    'proof.2.t': 'Servi vite, servi chaud',
    'proof.2.d': 'Chaque plat part du grill ou du four à la commande.',
    'proof.3.t': 'Quatre cuisines, un seul comptoir',
    'proof.3.d': 'Pizza, burgers, tacos, tex-mex — sans compromis sur aucune.',

    'avis.eyebrow': 'Les avis',
    'avis.h2': '{n} personnes ont pris le temps d’écrire.',
    'avis.write': 'Laisser un avis',
    'avis.read': 'Voir les avis',
    'avis.source': 'Avis repris tels quels de notre fiche Google.',

    'venir.eyebrow': 'Nous trouver',
    'venir.h2': 'Sur <em>l’avenue</em>',
    'venir.address': 'Adresse',
    'venir.phone': 'Téléphone',
    'venir.hours': 'Horaires',
    'venir.service': 'Service',
    'venir.service.v': 'Sur place et à emporter. Commande par téléphone.',
    'venir.route': 'Itinéraire',
    'map.title': 'Ouvrir la carte',
    'map.sub': 'Cliquer pour charger',
    'map.note': 'La carte Google ne se charge qu’à votre demande : la page reste rapide et aucun traceur ne démarre avant.',

    'cta.eyebrow': 'Pour finir',
    'cta.h2': 'On se voit sur l’avenue.',
    'cta.p': 'Appelez, passez, repartez avec. C’est toute la promesse.',
    'cta.order': 'Commander maintenant',

    'foot.tagline': 'Fast food · Good mood',
    'foot.orders': 'Commandes',
    'foot.legal': '© 2026 Pizza Avenue',

    open: 'Ouvert',
    closed: 'Fermé',
    'closes.in': 'ferme dans',
    'closes.at': 'ferme à',
    'opens.at': 'ouvre à',
    'opens.tomorrow': 'ouvre demain à',
    min: 'min',
    close: 'Fermer'
  },

  es: {
    skip: 'Ir al contenido',
    'nav.menu': 'La carta',
    'nav.maison': 'La casa',
    'nav.avis': 'Opiniones',
    'nav.venir': 'Encontrarnos',
    'nav.call': 'Pedir',
    'nav.open': 'Menú',
    'nav.close': 'Cerrar',
    'price.from': 'desde',

    'hero.kicker': 'Pizza · Burgers · Tacos · Tex-Mex',
    'hero.t1': 'Buena comida.',
    'hero.t2': 'Buen rollo.',
    'hero.t3': 'Todos los días.',
    'hero.lede': 'Masa amasada aquí, carne a la plancha al momento, salsas caseras. <strong>Siempre rápido, nunca descuidado.</strong>',
    'hero.cta': 'Ver la carta',
    'hero.scroll': 'Desliza hacia abajo',
    'hero.badge': 'CASERO ✦ SERVIDO CALIENTE ✦',
    'brand.p': 'Pizza Avenue nació de una idea simple: la comida rápida puede hacerse con cuidado, sin perder velocidad ni placer. Cuatro cocinas, una sola exigencia.',

    'menu.eyebrow': 'La carta',
    'menu.h2': 'Cuatro caminos, <em>una avenida</em>',
    'menu.intro': 'Todo se prepara al momento. Los precios son los mismos en sala y para llevar.',
    'menu.extras': 'Para acompañar',

    'formules.eyebrow': 'Las fórmulas',
    'formules.h2': 'Nuestras fórmulas <em>de la casa</em>',
    'formules.intro': 'Menús pensados para compartir — o no. Precio cerrado, en sala y para llevar.',
    'poster.price': 'la fórmula',
    'poster.order': 'Pedir',

    'maison.eyebrow': 'La casa',
    'maison.h2': 'Un mostrador, <em>no una cadena</em>',
    'maison.p1': 'Abrimos en la avenida para hacer una cosa bien: masa amasada aquí, carne a la plancha al pedirla, salsas que hacemos nosotros mismos.',
    'maison.p2': 'Sin atajos, sin congelados de fondo, sin cuarenta minutos de espera. Pides, preparamos, listo.',
    'maison.caption': 'recién horneada, cada día',
    'proof.1.t': 'La masa, cada día',
    'proof.1.d': 'Amasada y fermentada aquí, nunca del día anterior.',
    'proof.2.t': 'Servido rápido, servido caliente',
    'proof.2.d': 'Cada plato sale de la plancha o del horno al pedirlo.',
    'proof.3.t': 'Cuatro cocinas, un solo mostrador',
    'proof.3.d': 'Pizza, burgers, tacos, tex-mex — sin compromisos en ninguna.',

    'avis.eyebrow': 'Opiniones',
    'avis.h2': '{n} personas se tomaron el tiempo de escribir.',
    'avis.write': 'Dejar una opinión',
    'avis.read': 'Ver opiniones',
    'avis.source': 'Opiniones tomadas tal cual de nuestra ficha de Google.',

    'venir.eyebrow': 'Encontrarnos',
    'venir.h2': 'En <em>la avenida</em>',
    'venir.address': 'Dirección',
    'venir.phone': 'Teléfono',
    'venir.hours': 'Horario',
    'venir.service': 'Servicio',
    'venir.service.v': 'En sala y para llevar. Pedidos por teléfono.',
    'venir.route': 'Cómo llegar',
    'map.title': 'Abrir el mapa',
    'map.sub': 'Clic para cargar',
    'map.note': 'El mapa de Google solo se carga si lo pides: la página va rápido y ningún rastreador arranca antes.',

    'cta.eyebrow': 'Para terminar',
    'cta.h2': 'Nos vemos en la avenida.',
    'cta.p': 'Llama, pasa, llévatelo. Esa es toda la promesa.',
    'cta.order': 'Pedir ahora',

    'foot.tagline': 'Fast food · Good mood',
    'foot.orders': 'Pedidos',
    'foot.legal': '© 2026 Pizza Avenue',

    open: 'Abierto',
    closed: 'Cerrado',
    'closes.in': 'cierra en',
    'closes.at': 'cierra a las',
    'opens.at': 'abre a las',
    'opens.tomorrow': 'abre mañana a las',
    min: 'min',
    close: 'Cerrar'
  },

  en: {
    skip: 'Skip to content',
    'nav.menu': 'Menu',
    'nav.maison': 'The house',
    'nav.avis': 'Reviews',
    'nav.venir': 'Find us',
    'nav.call': 'Order',
    'nav.open': 'Menu',
    'nav.close': 'Close',
    'price.from': 'from',

    'hero.kicker': 'Pizza · Burgers · Tacos · Tex-Mex',
    'hero.t1': 'Good food.',
    'hero.t2': 'Good mood.',
    'hero.t3': 'Every day.',
    'hero.lede': 'Dough kneaded here, meat seared to order, sauces made in-house. <strong>Always fast, never rushed.</strong>',
    'hero.cta': 'See the menu',
    'hero.scroll': 'Scroll down',
    'hero.badge': 'HOUSE MADE ✦ SERVED HOT ✦',
    'brand.p': 'Pizza Avenue started from one idea: fast food can be made with care without losing speed or fun. Four kitchens, one standard.',

    'menu.eyebrow': 'The menu',
    'menu.h2': 'Four roads, <em>one avenue</em>',
    'menu.intro': 'Everything is made to order. Prices are the same dine-in and to go.',
    'menu.extras': 'On the side',

    'formules.eyebrow': 'The deals',
    'formules.h2': 'Our <em>signature</em> deals',
    'formules.intro': 'Meals built for sharing — or not. Fixed prices, dine-in and to go.',
    'poster.price': 'the deal',
    'poster.order': 'Order',

    'maison.eyebrow': 'The house',
    'maison.h2': 'A counter, <em>not a chain</em>',
    'maison.p1': 'We opened on the avenue to do one thing right: dough kneaded here, meat seared the moment you order it, sauces we make ourselves.',
    'maison.p2': 'No shortcuts, no frozen backlog, no forty-minute wait. You order, we cook, it’s ready.',
    'maison.caption': 'baked to order, every day',
    'proof.1.t': 'The dough, every day',
    'proof.1.d': 'Kneaded and proofed on site, never yesterday’s.',
    'proof.2.t': 'Served fast, served hot',
    'proof.2.d': 'Every dish leaves the grill or the oven to order.',
    'proof.3.t': 'Four kitchens, one counter',
    'proof.3.d': 'Pizza, burgers, tacos, Tex-Mex — no compromise on any of them.',

    'avis.eyebrow': 'Reviews',
    'avis.h2': '{n} people took the time to write.',
    'avis.write': 'Leave a review',
    'avis.read': 'Read reviews',
    'avis.source': 'Reviews taken as-is from our Google listing.',

    'venir.eyebrow': 'Find us',
    'venir.h2': 'On <em>the avenue</em>',
    'venir.address': 'Address',
    'venir.phone': 'Phone',
    'venir.hours': 'Hours',
    'venir.service': 'Service',
    'venir.service.v': 'Dine-in and takeaway. Order by phone.',
    'venir.route': 'Directions',
    'map.title': 'Open the map',
    'map.sub': 'Click to load',
    'map.note': 'The Google map only loads on request — the page stays fast and no tracker starts before that.',

    'cta.eyebrow': 'Last thing',
    'cta.h2': 'See you on the avenue.',
    'cta.p': 'Call, swing by, walk out with it. That’s the whole promise.',
    'cta.order': 'Order now',

    'foot.tagline': 'Fast food · Good mood',
    'foot.orders': 'Orders',
    'foot.legal': '© 2026 Pizza Avenue',

    open: 'Open',
    closed: 'Closed',
    'closes.in': 'closes in',
    'closes.at': 'closes at',
    'opens.at': 'opens at',
    'opens.tomorrow': 'opens tomorrow at',
    min: 'min',
    close: 'Close'
  }
};

let lang = 'fr';
const changeListeners = [];

export function currentLang() {
  return lang;
}

export function t(key) {
  return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.fr[key] || key;
}

export function pick(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.fr || '';
}

export function onLanguageChange(fn) {
  changeListeners.push(fn);
}

function $$(sel, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
}

export function applyLanguage(next, reviewCount) {
  lang = STRINGS[next] ? next : 'fr';
  document.documentElement.setAttribute('lang', lang);

  $$('[data-i18n]').forEach((node) => {
    let text = t(node.getAttribute('data-i18n'));
    if (reviewCount != null) text = text.replace('{n}', reviewCount);
    node.textContent = text;
  });
  $$('[data-i18n-html]').forEach((node) => {
    node.innerHTML = t(node.getAttribute('data-i18n-html'));
  });
  $$('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
  });
  $$('.lang button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
  });

  try { localStorage.setItem('pizzaavenue.lang', lang); } catch (e) { /* navigation privée */ }

  changeListeners.forEach((fn) => fn(lang));
}

export function initialLanguage() {
  let saved = null;
  try { saved = localStorage.getItem('pizzaavenue.lang'); } catch (e) { /* ignore */ }
  if (saved && STRINGS[saved]) return saved;
  const browser = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  return STRINGS[browser] ? browser : 'fr';
}

export function wireLanguage(reviewCount) {
  const box = document.querySelector('.lang');
  if (!box) return;
  box.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-lang]');
    if (button) applyLanguage(button.getAttribute('data-lang'), reviewCount);
  });
}
