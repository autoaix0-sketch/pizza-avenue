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
