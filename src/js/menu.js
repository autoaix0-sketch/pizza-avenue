/* =========================================================================
   PIZZA AVENUE — la carte
   =========================================================================
   Système visuel plutôt qu'une grille de cartes : quatre lignes éditoriales
   plein cadre (numéro, nom, image, accroche), chacune dépliable au clic pour
   révéler les prix. La logique de prix (tiers / colonnes / notes) reprend
   fidèlement celle de Taco Naan (assets/js/site.js: menuLine / renderMenu),
   seule la présentation change.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml, money, picture } from './utils.js';

function menuLine(item, columns, lang) {
  const note = item.note
    ? `<span class="ticket__note">${escapeHtml(pick(item.note))}</span>`
    : '';
  const head = '<span class="ticket__label">' +
    `<span class="ticket__text"><span class="ticket__name">${escapeHtml(item.name)}</span>${note}</span>` +
    '</span>';

  if (item.tiers) {
    const cells = columns.map((i) => {
      const value = item.tiers[i];
      return `<span class="ticket__cell">${value == null ? '<i>—</i>' : escapeHtml(money(value, lang))}</span>`;
    }).join('');
    return `<li class="ticket__row">${head}<span class="ticket__cells">${cells}</span></li>`;
  }

  const solo = item.free
    ? `<span class="ticket__price ticket__price--free">${escapeHtml(t('free') || 'offert')}</span>`
    : (item.price != null
        ? `<span class="ticket__price">${escapeHtml(money(item.price, lang))}</span>`
        : '');
  return `<li class="ticket__row ticket__row--solo">${head}<span class="ticket__lead"></span>${solo}</li>`;
}

function categoryArt(cat) {
  return picture(cat.image, cat.name, '(min-width: 62rem) 11rem, 7rem');
}

/* Les lignes ouvertes survivent à un nouveau rendu (changement de langue).
   La première est ouverte d'office : elle montre qu'il y a quelque chose à
   déplier sans obliger le premier clic à deviner. */
const openRows = new Set();
let openRowsSeeded = false;

export function renderMenu() {
  const menu = window.PIZZA_AVENUE_MENU;
  const rows = document.querySelector('.menu__rows');
  const extrasEl = document.querySelector('.menu__extras');
  if (!menu || !rows) return;

  const lang = currentLang();
  const labels = (menu.tierLabels && menu.tierLabels[lang]) || (menu.tierLabels && menu.tierLabels.fr) || [];
  if (!openRowsSeeded && menu.categories.length) {
    openRows.add(menu.categories[0].id);
    openRowsSeeded = true;
  }

  rows.innerHTML = menu.categories.map((cat) => {
    const columns = cat.tiersOnly || [0, 1, 2];
    const catLabels = (cat.tierLabels && (cat.tierLabels[lang] || cat.tierLabels.fr)) || labels;

    const header = `<li class="ticket__head"><span></span><span class="ticket__cells">` +
      columns.map((i) => `<span class="ticket__cell">${escapeHtml(catLabels[i] || '')}</span>`).join('') +
      '</span></li>';

    const lines = cat.items.map((it) => menuLine(it, columns, lang)).join('');
    const panelId = `menu-panel-${cat.id}`;
    const isOpen = openRows.has(cat.id);

    return `<article class="menu-row" data-cat="${escapeHtml(cat.id)}" data-reveal>` +
      `<button class="menu-row__toggle" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}">` +
        `<span class="menu-row__num">${escapeHtml(cat.num)}</span>` +
        `<span class="menu-row__title">` +
          `<span class="menu-row__name">${escapeHtml(cat.name)}</span>` +
          `<span class="menu-row__tagline">${escapeHtml(pick(cat.tagline))}</span>` +
        '</span>' +
        `<span class="menu-row__art">${categoryArt(cat)}</span>` +
        '<svg class="menu-row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      /* La note « le menu comprend… » ne vaut que pour les catégories qui
         suivent la formule Seul / + Frite / + Menu. Pizza a ses propres
         intitulés (Sénior / Familiale) : la note ne s'applique pas. */
      `<div class="menu-row__panel" id="${panelId}"${isOpen ? '' : ' hidden'}>` +
        (cat.tierLabels ? '' : `<p class="menu-row__note">${escapeHtml(pick(menu.tierNote))}</p>`) +
        `<ul class="ticket__list">${header}${lines}</ul>` +
      '</div>' +
    '</article>';
  }).join('');

  if (extrasEl && menu.extras) {
    extrasEl.innerHTML = `<h3>${escapeHtml(pick(menu.extras.title))}</h3>` +
      '<ul class="extras__list">' +
      menu.extras.items.map((it) => (
        `<li><span class="extras__name">${escapeHtml(it.name)}</span>` +
        '<span class="extras__lead" aria-hidden="true"></span>' +
        `<span class="extras__price">${escapeHtml(money(it.price, lang))}</span></li>`
      )).join('') +
      '</ul>';
  }
}

export function wireMenuRows() {
  const rows = document.querySelector('.menu__rows');
  if (!rows) return;
  rows.addEventListener('click', (event) => {
    const btn = event.target.closest('.menu-row__toggle');
    if (!btn) return;
    const row = btn.closest('.menu-row');
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    if (panel) panel.hidden = open;
    if (row) {
      if (open) openRows.delete(row.dataset.cat);
      else openRows.add(row.dataset.cat);
    }
  });
}
