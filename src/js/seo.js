/* Complète la fiche Restaurant (JSON-LD de index.html) depuis les données :
   la carte et ses prix viennent de src/data/menu.js, les horaires de
   src/data/site.js — rien n'est recopié à la main dans le balisage. */

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function hhmm(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

const fr = (v) => (v && typeof v === 'object' ? v.fr : v);

function menuItem(item) {
  return {
    '@type': 'MenuItem',
    name: item.num != null ? `${item.num}. ${fr(item.name)}` : fr(item.name),
    ...(item.note ? { description: fr(item.note) } : {}),
    offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'EUR' }
  };
}

export function enrichRestaurantLd() {
  const node = document.getElementById('restaurantLd');
  const site = window.PIZZA_AVENUE_SITE;
  const menu = window.PIZZA_AVENUE_MENU;
  if (!node || !site || !menu) return;

  let data;
  try { data = JSON.parse(node.textContent); } catch (e) { return; }

  data.name = site.brand.name;
  data.url = location.origin + '/';
  data.image = location.origin + '/assets/og.jpg';
  data.hasMenu = {
    '@type': 'Menu',
    name: 'Menu halal',
    hasMenuSection: menu.categories.map((cat) => ({
      '@type': 'MenuSection',
      name: fr(cat.name),
      hasMenuItem: (cat.groups ? cat.groups.flatMap((g) => g.items) : cat.items).map(menuItem)
    }))
  };

  if (site.address.lat) {
    data.geo = { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng };
  }

  /* Horaires : seulement quand ils existent (TODO-OWNER dans site.js). */
  const services = (site.hours && site.hours.services) || [];
  if (services.length) {
    data.openingHoursSpecification = services.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAYS,
      opens: hhmm(s[0]),
      closes: hhmm(s[1])
    }));
  }

  node.textContent = JSON.stringify(data);
}
