/* =========================================================================
   PIZZA AVENUE — la carte
   =========================================================================
   Des lignes éditoriales plein cadre (numéro, nom, image, accroche), chacune
   dépliable au clic pour révéler les plats. Taille unique : un prix par
   plat. Les pizzas ont un sélecteur Base tomate / Base crème / Spéciales ;
   les autres catégories montrent leurs « au choix » en pastilles et leurs
   suppléments. Tout vient de src/data/menu.js.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml, money, picture } from './utils.js';

function menuLine(item, lang) {
  const note = item.note
    ? `<span class="ticket__note">${escapeHtml(pick(item.note))}</span>`
    : '';
  const num = item.num != null ? `<span class="ticket__num">${item.num}</span>` : '';
  const star = item.special
    ? `<span class="ticket__star" role="img" aria-label="${escapeHtml(t('menu.special'))}">★</span>`
    : '';
  const head = '<span class="ticket__label">' + num +
    `<span class="ticket__text"><span class="ticket__name">${escapeHtml(pick(item.name))}${star}</span>${note}</span>` +
    '</span>';
  const price = item.price != null
    ? `<span class="ticket__price">${escapeHtml(money(item.price, lang))}</span>`
    : '';
  return `<li class="ticket__row ticket__row--solo">${head}<span class="ticket__lead"></span>${price}</li>`;
}

function itemList(items, lang) {
  return `<ul class="ticket__list">${items.map((it) => menuLine(it, lang)).join('')}</ul>`;
}

function choicesBlock(cat) {
  if (!cat.choices) return '';
  return cat.choices.map((c) => (
    '<div class="menu-choices">' +
      `<span class="menu-choices__label">${escapeHtml(pick(c.label))}</span>` +
      '<ul class="chips">' +
        c.options.map((o) => `<li>${escapeHtml(pick(o))}</li>`).join('') +
      '</ul>' +
    '</div>'
  )).join('');
}

function extrasBlock(cat, lang) {
  if (!cat.extras) return '';
  return `<p class="menu-extras__title">${escapeHtml(t('menu.extras'))}</p>` +
    '<ul class="extras__list">' +
    cat.extras.map((x) => (
      `<li><span class="extras__name">${escapeHtml(pick(x.label))}</span>` +
      '<span class="extras__lead" aria-hidden="true"></span>' +
      `<span class="extras__price">+ ${escapeHtml(money(x.price, lang))}</span></li>`
    )).join('') +
    '</ul>';
}

/* Pas de photo pour la catégorie (Panizza, Desserts, Boissons) : une icône
   dessinée prend la place, pour garder le rythme des lignes. */
function categoryArt(cat) {
  return picture(cat.image, pick(cat.name), '(min-width: 62rem) 11rem, 7rem') ||
    '<svg class="menu-row__icon" viewBox="0 0 40 40" aria-hidden="true"><use href="#ic-pizza"/></svg>';
}

/* Sélecteur de groupe (pizzas). Le groupe choisi survit à un nouveau rendu. */
const activeGroup = {};

function groupsBlock(cat, lang) {
  const current = activeGroup[cat.id] || cat.groups[0].id;
  const tabs = '<div class="menu-switch" role="tablist">' +
    cat.groups.map((g) => (
      `<button type="button" role="tab" class="menu-switch__btn" data-group="${escapeHtml(g.id)}"` +
      ` aria-selected="${g.id === current}" aria-controls="menu-group-${escapeHtml(g.id)}">` +
      `${escapeHtml(pick(g.label))} <span class="menu-switch__count">${g.items.length}</span></button>`
    )).join('') +
    '</div>';
  const lists = cat.groups.map((g) => (
    `<div class="menu-group" id="menu-group-${escapeHtml(g.id)}" role="tabpanel"${g.id === current ? '' : ' hidden'}>` +
      itemList(g.items, lang) +
    '</div>'
  )).join('');
  return tabs + lists;
}

/* Les lignes ouvertes survivent à un nouveau rendu (changement de langue).
   La première est ouverte d'office : elle montre qu'il y a quelque chose à
   déplier sans obliger le premier clic à deviner. */
const openRows = new Set();
let openRowsSeeded = false;

export function renderMenu() {
  const menu = window.PIZZA_AVENUE_MENU;
  const rows = document.querySelector('.menu__rows');
  if (!menu || !rows) return;

  const lang = currentLang();
  if (!openRowsSeeded && menu.categories.length) {
    openRows.add(menu.categories[0].id);
    openRowsSeeded = true;
  }

  rows.innerHTML = menu.categories.map((cat) => {
    const panelId = `menu-panel-${cat.id}`;
    const isOpen = openRows.has(cat.id);
    const body = cat.groups ? groupsBlock(cat, lang) : itemList(cat.items, lang);

    return `<article class="menu-row" data-cat="${escapeHtml(cat.id)}" data-reveal>` +
      `<button class="menu-row__toggle" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}">` +
        `<span class="menu-row__num">${escapeHtml(cat.num)}</span>` +
        `<span class="menu-row__title">` +
          `<span class="menu-row__name">${escapeHtml(pick(cat.name))}</span>` +
          `<span class="menu-row__tagline">${escapeHtml(pick(cat.tagline))}</span>` +
        '</span>' +
        `<span class="menu-row__art">${categoryArt(cat)}</span>` +
        '<svg class="menu-row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      `<div class="menu-row__panel" id="${panelId}"${isOpen ? '' : ' hidden'}>` +
        body + choicesBlock(cat) + extrasBlock(cat, lang) +
      '</div>' +
    '</article>';
  }).join('');
}

export function wireMenuRows() {
  const rows = document.querySelector('.menu__rows');
  if (!rows) return;
  rows.addEventListener('click', (event) => {
    const tab = event.target.closest('.menu-switch__btn');
    if (tab) {
      const row = tab.closest('.menu-row');
      activeGroup[row.dataset.cat] = tab.dataset.group;
      row.querySelectorAll('.menu-switch__btn').forEach((b) => {
        b.setAttribute('aria-selected', String(b === tab));
      });
      row.querySelectorAll('.menu-group').forEach((g) => {
        g.hidden = g.id !== `menu-group-${tab.dataset.group}`;
      });
      return;
    }

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
