/* Complète la fiche Restaurant (JSON-LD de index.html) depuis les données :
   la carte et ses prix viennent de public/data/menu.js, les horaires de
   public/data/hours.js — rien n'est recopié à la main dans le balisage. */

import { schemaHours } from './hours.js';

const fr = (v) => (v && typeof v === 'object' ? v.fr : v);

/* Un plat a un prix, ou des prix par colonne (Seul / Menu) : un MenuItem par
   prix, la colonne en suffixe du nom. */
function menuItems(item, labels) {
  const base = item.num != null ? `${item.num}. ${fr(item.name)}` : fr(item.name);
  const description = item.note ? { description: fr(item.note) } : {};
  const offer = (price) => ({ '@type': 'Offer', price: Number(price).toFixed(2), priceCurrency: 'EUR' });

  if (Array.isArray(item.tiers)) {
    return item.tiers
      .map((price, i) => (price == null ? null : {
        '@type': 'MenuItem',
        name: labels[i] ? `${base} (${labels[i]})` : base,
        ...description,
        offers: offer(price)
      }))
      .filter(Boolean);
  }
  if (item.price == null) return [];
  return [{ '@type': 'MenuItem', name: base, ...description, offers: offer(item.price) }];
}

/* « 7,50–12,50 € » : ce que coûte un plat, calculé depuis la carte. Le prix
   n'est donc jamais recopié à la main : il suit le tableau de bord.
   Les accompagnements, les desserts et les boissons sont exclus — ce ne sont
   pas des plats, et sans eux la fourchette commencerait à 1 € (une petite
   bouteille d'eau), ce qui ferait croire qu'on mange ici pour 1 €. */
const NOT_A_MEAL = ['texmex', 'desserts', 'boissons'];

function euro(n) {
  return n.toFixed(2).replace('.', ',').replace(',00', '');
}

function priceRange(menu) {
  const prices = [];
  (menu.categories || [])
    .filter((cat) => NOT_A_MEAL.indexOf(cat.id) === -1)
    .forEach((cat) => {
      const items = cat.groups ? cat.groups.flatMap((g) => g.items || []) : (cat.items || []);
      items.filter((it) => !it.hidden).forEach((it) => {
        if (Array.isArray(it.tiers)) it.tiers.forEach((p) => { if (p != null) prices.push(Number(p)); });
        else if (it.price != null) prices.push(Number(it.price));
      });
    });
  if (!prices.length) return '';
  const min = Math.min.apply(null, prices);
  const max = Math.max.apply(null, prices);
  return min === max ? euro(min) + ' €' : euro(min) + '–' + euro(max) + ' €';
}

export function enrichRestaurantLd() {
  const node = document.getElementById('restaurantLd');
  const site = window.PIZZA_AVENUE_SITE;
  const menu = window.PIZZA_AVENUE_MENU;
  if (!node || !site || !menu) return;

  let data;
  try { data = JSON.parse(node.textContent); } catch (e) { return; }

  data.name = site.brand.name;
  /* Relatif à la page : marche à la racine d'un domaine comme sous
     /pizza-avenue/ (GitHub Pages). */
  data.url = new URL('./', document.baseURI).href;
  data.image = new URL('assets/og.jpg', document.baseURI).href;

  /* Plus précis que le « € » écrit dans index.html. */
  const range = priceRange(menu);
  if (range) data.priceRange = range;

  const labels = (menu.tierLabels && menu.tierLabels.fr) || [];
  const sections = (menu.categories || [])
    .map((cat) => {
      const items = (cat.groups ? cat.groups.flatMap((g) => g.items || []) : cat.items || [])
        .filter((it) => !it.hidden);
      return {
        '@type': 'MenuSection',
        name: fr(cat.name),
        hasMenuItem: items.flatMap((it) => menuItems(it, labels))
      };
    })
    .filter((s) => s.hasMenuItem.length);
  data.hasMenu = { '@type': 'Menu', name: 'Menu halal', hasMenuSection: sections };

  if (site.address.lat) {
    data.geo = { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng };
  }

  /* Horaires : un créneau par service, plus les fermetures exceptionnelles. */
  const { specs, closures } = schemaHours();
  if (specs.length) data.openingHoursSpecification = specs;
  if (closures.length) data.specialOpeningHoursSpecification = closures;

  node.textContent = JSON.stringify(data);
}
