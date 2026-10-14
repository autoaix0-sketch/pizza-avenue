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
    'nav.formules': 'Formules',
    'nav.maison': 'La maison',
    'nav.avis': 'Les avis',
    'nav.venir': 'Nous trouver',
    'nav.call': 'Commander',
    'nav.open': 'Menu',
    'nav.close': 'Fermer',
    'price.from': 'dès',

    'banner.text': 'Ouverture prochaine.',
    'banner.follow': 'Suivez-nous sur Instagram',

    'hero.kicker': 'Pizzeria halal · À emporter · Dax',
    'hero.t1': 'Bonjour Dax.',
    'hero.t2': 'Ciao la faim.',
    'hero.t3': 'Pizzas à emporter.',
    'hero.lede': 'Pâte fraîche, taille unique, menu halal. <strong>75 av. Saint-Vincent de Paul, Dax.</strong>',
    'hero.cta': 'Voir la carte',
    'hero.call': 'Appeler',
    'hero.scroll': 'Faites défiler',
    'hero.badge': 'PÂTE FRAÎCHE ✦ MENU HALAL ✦ DAX ✦',
    'brand.h': 'Une faim de caractère.',
    'brand.p': 'Pizza Avenue, c’est la pizzeria halal à emporter de Dax : une pâte fraîche, des pizzas bien garnies, des prix simples. Et aussi calzone, panizza, makloub, kapsalon et tex-mex.',

    'menu.eyebrow': 'La carte',
    'menu.h2': 'Une avenue <em>de goûts</em>',
    'menu.intro': 'Menu halal · Pâte fraîche · Taille unique. Les numéros sont ceux de la boutique : commandez par numéro au téléphone.',
    'menu.extras': 'Suppléments',
    'menu.special': 'spéciale de la maison',

    'formules.eyebrow': 'Formules & offres',
    'formules.h2': 'Les bons <em>plans</em>',
    'formules.intro': 'Les offres de la carte, tout simplement.',
    'poster.price': 'la formule',
    'poster.plus': 'en plus',
    'poster.order': 'Commander',

    'maison.eyebrow': 'La maison',
    'maison.h2': 'Un comptoir, <em>pas une chaîne</em>',
    'maison.p1': 'Pizza Avenue est une pizzeria à emporter au 75 avenue Saint-Vincent de Paul, à Dax. Une carte claire : 20 pizzas, calzone, panizza, makloub, kapsalon et tex-mex.',
    'maison.p2': 'Vous appelez, vous passez, vous repartez avec. Des pizzas qui rassemblent toujours !',
    'maison.caption': 'pâte fraîche, taille unique',
    'proof.1.t': 'Pâte fraîche',
    'proof.1.d': 'Chaque pizza part d’une pâte fraîche.',
    'proof.2.t': 'Menu halal',
    'proof.2.d': 'Toute la carte est halal.',
    'proof.3.t': 'Taille unique, prix simples',
    'proof.3.d': 'Une seule taille, de 8 à 12 € la pizza.',

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
    'venir.service.v': 'À emporter. Commande par téléphone.',
    'venir.route': 'Itinéraire',
    'map.title': 'Ouvrir la carte',
    'map.sub': 'Cliquer pour charger',
    'map.note': 'La carte Google ne se charge qu’à votre demande : la page reste rapide et aucun traceur ne démarre avant.',

    'cta.eyebrow': 'Pour finir',
    'cta.h2': 'On se voit sur l’avenue.',
    'cta.p': 'Appelez, passez, repartez avec.',
    'cta.order': 'Commander par téléphone',

    'bar.call': 'Appeler',
    'bar.route': 'Itinéraire',
    'bar.menu': 'La carte',

    'foot.tagline': 'Des pizzas qui rassemblent toujours !',
    'foot.orders': 'Commandes',
    'foot.legal': '© 2026 Pizza Avenue · Dax',
    'foot.mentions': 'Mentions légales',

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
    'nav.formules': 'Ofertas',
    'nav.maison': 'La casa',
    'nav.avis': 'Opiniones',
    'nav.venir': 'Encontrarnos',
    'nav.call': 'Pedir',
    'nav.open': 'Menú',
    'nav.close': 'Cerrar',
    'price.from': 'desde',

    'banner.text': 'Próxima apertura.',
    'banner.follow': 'Síguenos en Instagram',

    'hero.kicker': 'Pizzería halal · Para llevar · Dax',
    'hero.t1': 'Bonjour Dax.',
    'hero.t2': 'Ciao la faim.',
    'hero.t3': 'Pizzas para llevar.',
    'hero.lede': 'Masa fresca, tamaño único, menú halal. <strong>75 av. Saint-Vincent de Paul, Dax.</strong>',
    'hero.cta': 'Ver la carta',
    'hero.call': 'Llamar',
    'hero.scroll': 'Desliza hacia abajo',
    'hero.badge': 'MASA FRESCA ✦ MENÚ HALAL ✦ DAX ✦',
    'brand.h': 'Une faim de caractère.',
    'brand.p': 'Pizza Avenue es la pizzería halal para llevar de Dax: masa fresca, pizzas bien cargadas y precios sencillos. También calzone, panizza, makloub, kapsalon y tex-mex.',

    'menu.eyebrow': 'La carta',
    'menu.h2': 'Una avenida <em>de sabores</em>',
    'menu.intro': 'Menú halal · Masa fresca · Tamaño único. Los números son los de la tienda: pide por número por teléfono.',
    'menu.extras': 'Suplementos',
    'menu.special': 'especial de la casa',

    'formules.eyebrow': 'Menús y ofertas',
    'formules.h2': 'Las buenas <em>ofertas</em>',
    'formules.intro': 'Las ofertas de la carta, sin más.',
    'poster.price': 'el menú',
    'poster.plus': 'más',
    'poster.order': 'Pedir',

    'maison.eyebrow': 'La casa',
    'maison.h2': 'Un mostrador, <em>no una cadena</em>',
    'maison.p1': 'Pizza Avenue es una pizzería para llevar en el 75 de la avenida Saint-Vincent de Paul, en Dax. Una carta clara: 20 pizzas, calzone, panizza, makloub, kapsalon y tex-mex.',
    'maison.p2': 'Llamas, pasas y te lo llevas. Pizzas para compartir, siempre.',
    'maison.caption': 'masa fresca, tamaño único',
    'proof.1.t': 'Masa fresca',
    'proof.1.d': 'Cada pizza empieza con masa fresca.',
    'proof.2.t': 'Menú halal',
    'proof.2.d': 'Toda la carta es halal.',
    'proof.3.t': 'Tamaño único, precios sencillos',
    'proof.3.d': 'Un solo tamaño, de 8 a 12 € la pizza.',

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
    'venir.service.v': 'Para llevar. Pedidos por teléfono.',
    'venir.route': 'Cómo llegar',
    'map.title': 'Abrir el mapa',
    'map.sub': 'Clic para cargar',
    'map.note': 'El mapa de Google solo se carga si lo pides: la página va rápido y ningún rastreador arranca antes.',

    'cta.eyebrow': 'Para terminar',
    'cta.h2': 'Nos vemos en la avenida.',
    'cta.p': 'Llama, pasa y llévatelo.',
    'cta.order': 'Pedir por teléfono',

    'bar.call': 'Llamar',
    'bar.route': 'Cómo llegar',
    'bar.menu': 'La carta',

    'foot.tagline': 'Des pizzas qui rassemblent toujours !',
    'foot.orders': 'Pedidos',
    'foot.legal': '© 2026 Pizza Avenue · Dax',
    'foot.mentions': 'Aviso legal',

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
    'nav.formules': 'Deals',
    'nav.maison': 'The house',
    'nav.avis': 'Reviews',
    'nav.venir': 'Find us',
    'nav.call': 'Order',
    'nav.open': 'Menu',
    'nav.close': 'Close',
    'price.from': 'from',

    'banner.text': 'Opening soon.',
    'banner.follow': 'Follow us on Instagram',

    'hero.kicker': 'Halal pizzeria · Takeaway · Dax',
    'hero.t1': 'Bonjour Dax.',
    'hero.t2': 'Ciao la faim.',
    'hero.t3': 'Pizza to take away.',
    'hero.lede': 'Fresh dough, one size, halal menu. <strong>75 av. Saint-Vincent de Paul, Dax.</strong>',
    'hero.cta': 'See the menu',
    'hero.call': 'Call',
    'hero.scroll': 'Scroll down',
    'hero.badge': 'FRESH DOUGH ✦ HALAL MENU ✦ DAX ✦',
    'brand.h': 'Une faim de caractère.',
    'brand.p': 'Pizza Avenue is the halal takeaway pizzeria of Dax: fresh dough, well-topped pizzas and simple prices. Also calzone, panizza, makloub, kapsalon and Tex-Mex.',

    'menu.eyebrow': 'The menu',
    'menu.h2': 'An avenue <em>of flavours</em>',
    'menu.intro': 'Halal menu · Fresh dough · One size. The numbers are the shop numbers: order by number on the phone.',
    'menu.extras': 'Extras',
    'menu.special': 'house special',

    'formules.eyebrow': 'Deals & offers',
    'formules.h2': 'The good <em>deals</em>',
    'formules.intro': 'The offers on the menu, nothing more.',
    'poster.price': 'the deal',
    'poster.plus': 'extra',
    'poster.order': 'Order',

    'maison.eyebrow': 'The house',
    'maison.h2': 'A counter, <em>not a chain</em>',
    'maison.p1': 'Pizza Avenue is a takeaway pizzeria at 75 avenue Saint-Vincent de Paul, in Dax. A clear menu: 20 pizzas, calzone, panizza, makloub, kapsalon and Tex-Mex.',
    'maison.p2': 'You call, you come by, you take it home. Pizzas that always bring people together!',
    'maison.caption': 'fresh dough, one size',
    'proof.1.t': 'Fresh dough',
    'proof.1.d': 'Every pizza starts with fresh dough.',
    'proof.2.t': 'Halal menu',
    'proof.2.d': 'The whole menu is halal.',
    'proof.3.t': 'One size, simple prices',
    'proof.3.d': 'One size only, €8 to €12 a pizza.',

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
    'venir.service.v': 'Takeaway. Order by phone.',
    'venir.route': 'Directions',
    'map.title': 'Open the map',
    'map.sub': 'Click to load',
    'map.note': 'The Google map only loads on request — the page stays fast and no tracker starts before that.',

    'cta.eyebrow': 'Last thing',
    'cta.h2': 'See you on the avenue.',
    'cta.p': 'Call, come by, take it home.',
    'cta.order': 'Order by phone',

    'bar.call': 'Call',
    'bar.route': 'Directions',
    'bar.menu': 'Menu',

    'foot.tagline': 'Des pizzas qui rassemblent toujours !',
    'foot.orders': 'Orders',
    'foot.legal': '© 2026 Pizza Avenue · Dax',
    'foot.mentions': 'Legal notice',

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
