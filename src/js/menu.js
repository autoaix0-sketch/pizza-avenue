/* =========================================================================
   PIZZA AVENUE — la carte
   =========================================================================
   Des lignes éditoriales plein cadre (numéro, nom, image, accroche), chacune
   dépliable au clic pour révéler les plats. Les pizzas ont un sélecteur
   Base tomate / Base crème / Spéciales ; les autres catégories montrent leurs
   « au choix » en pastilles et leurs suppléments. Un plat a un prix, ou des
   prix par colonne (Seul / Menu). Un plat masqué depuis le tableau de bord
   (épuisé) disparaît. Tout vient de public/data/menu.js.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml, money, picture } from './utils.js';

const isShown = (item) => !item.hidden;

/* Les colonnes d'une catégorie : « Seul » / « Menu », dans la langue du
   visiteur. Une catégorie peut avoir les siennes (tierLabels), sinon celles
   de la carte. */
function tierLabels(menu, cat, lang) {
  const source = cat.tierLabels || menu.tierLabels || {};
  return source[lang] || source.fr || [];
}

function columnsOf(items) {
  let n = 0;
  items.forEach((it) => { if (it.tiers) n = Math.max(n, it.tiers.length); });
  return n;
}

function menuLine(item, columns, lang) {
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

  if (item.tiers) {
    const cells = [];
    for (let i = 0; i < columns; i++) {
      const value = item.tiers[i];
      cells.push('<span class="ticket__cell">' +
        (value == null ? '<i>—</i>' : escapeHtml(money(value, lang))) + '</span>');
    }
    return `<li class="ticket__row">${head}<span class="ticket__cells">${cells.join('')}</span></li>`;
  }

  const price = item.price != null
    ? `<span class="ticket__price">${escapeHtml(money(item.price, lang))}</span>`
    : '';
  return `<li class="ticket__row ticket__row--solo">${head}<span class="ticket__lead"></span>${price}</li>`;
}

function itemList(items, labels, lang) {
  const columns = columnsOf(items);
  const header = columns
    ? '<div class="ticket__head"><span></span><span class="ticket__cells">' +
      Array.from({ length: columns }, (_, i) => `<span class="ticket__cell">${escapeHtml(labels[i] || '')}</span>`).join('') +
      '</span></div>'
    : '';
  return header + `<ul class="ticket__list">${items.map((it) => menuLine(it, columns, lang)).join('')}</ul>`;
}

function choicesBlock(cat) {
  if (!cat.choices || !cat.choices.length) return '';
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
  if (!cat.extras || !cat.extras.length) return '';
  return `<p class="menu-extras__title">${escapeHtml(t('menu.extras'))}</p>` +
    '<ul class="extras__list">' +
    cat.extras.map((x) => (
      `<li><span class="extras__name">${escapeHtml(pick(x.label))}</span>` +
      '<span class="extras__lead" aria-hidden="true"></span>' +
      `<span class="extras__price">+ ${escapeHtml(money(x.price, lang))}</span></li>`
    )).join('') +
    '</ul>';
}

/* Photo de la catégorie : celle envoyée depuis le tableau de bord (cat.photo)
   remplace celle du site (cat.image). Pas de photo (Panizza, Desserts,
   Boissons…) : une icône dessinée prend la place, pour garder le rythme. */
function categoryArt(cat) {
  const uploads = window.PIZZA_AVENUE_UPLOADS || {};
  const key = cat.photo && uploads[cat.photo] ? cat.photo : cat.image;
  return (key && picture(key, pick(cat.name), '(min-width: 62rem) 11rem, 7rem')) ||
    '<svg class="menu-row__icon" viewBox="0 0 40 40" aria-hidden="true"><use href="#ic-pizza"/></svg>';
}

/* Sélecteur de groupe (pizzas). Le groupe choisi survit à un nouveau rendu. */
const activeGroup = {};

function groupsBlock(cat, groups, labels, lang) {
  const current = groups.some((g) => g.id === activeGroup[cat.id]) ? activeGroup[cat.id] : groups[0].id;
  const tabs = '<div class="menu-switch" role="tablist">' +
    groups.map((g) => (
      `<button type="button" role="tab" class="menu-switch__btn" data-group="${escapeHtml(g.id)}"` +
      ` aria-selected="${g.id === current}" aria-controls="menu-group-${escapeHtml(g.id)}">` +
      `${escapeHtml(pick(g.label))} <span class="menu-switch__count">${g.items.length}</span></button>`
    )).join('') +
    '</div>';
  const lists = groups.map((g) => (
    `<div class="menu-group" id="menu-group-${escapeHtml(g.id)}" role="tabpanel"${g.id === current ? '' : ' hidden'}>` +
      itemList(g.items, labels, lang) +
    '</div>'
  )).join('');
  return tabs + lists;
}

/* Ce que le visiteur voit : sans les plats masqués, sans les groupes ni les
   catégories qui se retrouvent vides. */
function visibleCategories(menu) {
  return (menu.categories || []).map((cat) => {
    if (cat.groups) {
      const groups = cat.groups
        .map((g) => ({ ...g, items: (g.items || []).filter(isShown) }))
        .filter((g) => g.items.length);
      return { ...cat, groups };
    }
    return { ...cat, items: (cat.items || []).filter(isShown) };
  }).filter((cat) => (cat.groups ? cat.groups.length : cat.items.length) > 0);
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
  const categories = visibleCategories(menu);
  if (!openRowsSeeded && categories.length) {
    openRows.add(categories[0].id);
    openRowsSeeded = true;
  }

  const tierNote = menu.tierNote ? pick(menu.tierNote) : '';

  rows.innerHTML = categories.map((cat) => {
    const panelId = `menu-panel-${cat.id}`;
    const isOpen = openRows.has(cat.id);
    const labels = tierLabels(menu, cat, lang);
    const body = cat.groups ? groupsBlock(cat, cat.groups, labels, lang) : itemList(cat.items, labels, lang);
    const hasTiers = cat.groups
      ? cat.groups.some((g) => columnsOf(g.items))
      : columnsOf(cat.items) > 0;
    const note = hasTiers && tierNote ? `<p class="menu-row__note">${escapeHtml(tierNote)}</p>` : '';

    return `<article class="menu-row" data-cat="${escapeHtml(cat.id)}" data-reveal>` +
      `<button class="menu-row__toggle" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}">` +
        `<span class="menu-row__num">${escapeHtml(cat.num || '')}</span>` +
        `<span class="menu-row__title">` +
          `<span class="menu-row__name">${escapeHtml(pick(cat.name))}</span>` +
          `<span class="menu-row__tagline">${escapeHtml(pick(cat.tagline))}</span>` +
        '</span>' +
        `<span class="menu-row__art">${categoryArt(cat)}</span>` +
        '<svg class="menu-row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      `<div class="menu-row__panel" id="${panelId}"${isOpen ? '' : ' hidden'}>` +
        body + note + choicesBlock(cat) + extrasBlock(cat, lang) +
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
