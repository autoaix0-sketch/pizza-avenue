/* Remplit adresse / téléphone / horaires / liens depuis src/data/site.js, et
   charge la carte Google seulement au clic (aucun traceur avant). */

import { t } from './i18n.js';
import { renderHours, upcomingClosure, closureText } from './hours.js';
import { escapeHtml } from './utils.js';

export function renderContact() {
  const site = window.PIZZA_AVENUE_SITE;
  if (!site) return;

  const addrLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
  const addrEl = document.getElementById('venirAddress');
  if (addrEl) { addrEl.textContent = addrLine; addrEl.href = site.address.mapsUrl || '#'; }

  const phoneEl = document.getElementById('venirPhone');
  if (phoneEl) { phoneEl.textContent = site.phone.human; phoneEl.href = 'tel:' + site.phone.link; }

  renderHours();

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

  /* Chaque bouton « Commander » / « Appeler » : le téléphone (ou un lien de
     commande en ligne s'il est renseigné dans site.js). */
  const orderHref = site.links.orderOnline || 'tel:' + site.phone.link;
  document.querySelectorAll('[data-order]').forEach((a) => { a.href = orderHref; });
  document.querySelectorAll('[data-phone]').forEach((el) => { el.textContent = site.phone.human; });

  const barRoute = document.getElementById('barRoute');
  if (barRoute && routeEl) barRoute.href = routeEl.href;

  renderBanner();
}

/* Le bandeau du haut. Une fermeture exceptionnelle (aujourd'hui ou dans les
   sept jours, public/data/hours.js) passe avant « Ouverture prochaine »
   (site.openingSoon). Le visiteur peut fermer l'avis de fermeture ; il revient
   si la fermeture change. La barre du haut se pose dessous grâce à --banner-h. */
let bannerWired = false;

export function renderBanner() {
  const site = window.PIZZA_AVENUE_SITE;
  const banner = document.getElementById('openBanner');
  if (!banner || !site) return;

  const soonNodes = banner.querySelectorAll('[data-banner="soon"]');
  const closureNodes = banner.querySelectorAll('[data-banner="closure"]');
  const closureEl = document.getElementById('closureText');

  const closure = upcomingClosure();
  let dismissed = false;
  const key = closure ? `pizzaavenue.notice.${closure.from}.${closure.to}` : '';
  if (key) {
    try { dismissed = sessionStorage.getItem(key) === '1'; } catch (e) { /* ignore */ }
  }
  const showClosure = !!closure && !dismissed;

  if (showClosure) {
    const { when, note } = closureText(closure);
    closureEl.innerHTML = `<b>${escapeHtml(when)}</b>` + (note ? ` — ${escapeHtml(note)}` : '');
  }
  closureNodes.forEach((node) => { node.hidden = !showClosure; });
  soonNodes.forEach((node) => { node.hidden = showClosure || !site.openingSoon; });
  banner.hidden = !(showClosure || site.openingSoon);
  banner.dataset.key = key;

  const link = document.getElementById('openBannerLink');
  if (link && site.links.instagram) link.href = site.links.instagram;

  const setHeight = () => {
    document.documentElement.style.setProperty('--banner-h', banner.hidden ? '0px' : banner.offsetHeight + 'px');
  };
  setHeight();

  if (!bannerWired) {
    bannerWired = true;
    addEventListener('resize', setHeight, { passive: true });
    banner.querySelector('.openbar__close').addEventListener('click', () => {
      try { sessionStorage.setItem(banner.dataset.key, '1'); } catch (e) { /* ignore */ }
      renderBanner();
    });
  }
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
