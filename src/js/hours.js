/* =========================================================================
   PIZZA AVENUE — badge ouvert / fermé
   =========================================================================
   Porté depuis Taco Naan (assets/js/site.js: parisMinutes / openState /
   paintStatus). Calcule l'heure dans le fuseau du restaurant (pas celui du
   visiteur) et rafraîchit le badge toutes les minutes.
   ========================================================================= */

import { t } from './i18n.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function zoneMinutes(timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(new Date());
  let h = 0, m = 0;
  parts.forEach((p) => {
    if (p.type === 'hour') h = parseInt(p.value, 10);
    if (p.type === 'minute') m = parseInt(p.value, 10);
  });
  return h * 60 + m;
}

function hhmm(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

export function openState(services, timeZone) {
  const now = zoneMinutes(timeZone);

  for (let i = 0; i < services.length; i++) {
    const start = services[i][0], end = services[i][1];
    if (now >= start && now < end) {
      const left = end - now;
      const label = left <= 60
        ? t('closes.in') + ' ' + left + ' ' + t('min')
        : t('closes.at') + ' ' + hhmm(end);
      return { open: true, label };
    }
  }

  for (let j = 0; j < services.length; j++) {
    if (now < services[j][0]) {
      return { open: false, label: t('opens.at') + ' ' + hhmm(services[j][0]) };
    }
  }
  return { open: false, label: t('opens.tomorrow') + ' ' + hhmm(services[0][0]) };
}

export function paintStatus(services, timeZone) {
  /* Horaires pas encore connus : pas de badge Ouvert / Fermé. */
  if (!services || !services.length) {
    document.querySelectorAll('[data-status]').forEach((node) => { node.hidden = true; });
    return;
  }
  const state = openState(services, timeZone);
  document.querySelectorAll('[data-status]').forEach((node) => {
    node.className = 'status ' + (state.open ? 'status--open' : 'status--closed');
    node.innerHTML = '<span class="status__dot"></span><span><b>' +
      escapeHtml(state.open ? t('open') : t('closed')) + '</b> · ' +
      escapeHtml(state.label) + '</span>';
  });
}
