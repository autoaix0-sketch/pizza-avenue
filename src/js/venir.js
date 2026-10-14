/* Remplit adresse / téléphone / horaires / liens depuis src/data/site.js, et
   charge la carte Google seulement au clic (aucun traceur avant). */

import { pick, t } from './i18n.js';

function hhmm(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

export function renderContact() {
  const site = window.PIZZA_AVENUE_SITE;
  if (!site) return;

  const addrLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
  const addrEl = document.getElementById('venirAddress');
  if (addrEl) { addrEl.textContent = addrLine; addrEl.href = site.address.mapsUrl || '#'; }

  const phoneEl = document.getElementById('venirPhone');
  if (phoneEl) { phoneEl.textContent = site.phone.human; phoneEl.href = 'tel:' + site.phone.link; }

  const hoursEl = document.getElementById('venirHours');
  if (hoursEl) {
    const services = site.hours.services || [];
    hoursEl.innerHTML = services.map((s) => `<span>${hhmm(s[0])} – ${hhmm(s[1])}</span>`).join('');
    /* Horaires pas encore connus (TODO-OWNER dans site.js) : on masque la ligne. */
    const row = hoursEl.closest('.info-row');
    if (row) row.hidden = !services.length;
  }

  const routeEl = document.getElementById('venirRoute');
  if (routeEl) {
    routeEl.href = site.address.lat
      ? `https://www.google.com/maps/dir/?api=1&destination=${site.address.lat},${site.address.lng}`
      : (site.address.mapsUrl || '#');
  }

  const footAddr = document.getElementById('footAddress');
  if (footAddr) footAddr.innerHTML = `${site.address.street}<br>${site.address.postalCode} ${site.address.city}`;

  const footPhone = document.getElementById('footPhone');
  if (footPhone) { footPhone.textContent = site.phone.human; footPhone.href = 'tel:' + site.phone.link; }

  const footLinks = document.getElementById('footLinks');
  if (footLinks) {
    const links = [];
    if (site.links.instagram) links.push(`<a href="${site.links.instagram}" target="_blank" rel="noopener">Instagram</a>`);
    if (site.links.googleReviews) links.push(`<a href="${site.links.googleReviews}" target="_blank" rel="noopener">Google</a>`);
    footLinks.innerHTML = links.join('');
  }

  const ctaOrder = document.getElementById('ctaOrder');
  if (ctaOrder && site.links.orderOnline) ctaOrder.href = site.links.orderOnline;
}

export function wireMap() {
  const box = document.querySelector('.mapbox');
  const btn = box && box.querySelector('.mapbox__facade');
  if (!box || !btn) return;

  btn.addEventListener('click', () => {
    const site = window.PIZZA_AVENUE_SITE;
    const q = site ? encodeURIComponent(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`) : '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps?q=${q}&output=embed`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('aria-label', t('map.title'));
    box.innerHTML = '';
    box.appendChild(iframe);
  }, { once: true });
}
