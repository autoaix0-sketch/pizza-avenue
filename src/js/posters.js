/* =========================================================================
   PIZZA AVENUE — les affiches « Les formules »
   =========================================================================
   Même idée que les affiches de Taco Naan (un titre, un plat, un prix), mais
   construites en HTML plutôt que cuites dans une image : le texte reste du
   texte — traduit, net à toutes les tailles, et le prix vient de
   src/data/menu.js (combos), jamais recopié.

   Ce module pose aussi les deux autres photos « de décor » : la scène de
   La maison et la pizza qui dépasse dans l'appel final.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml, picture } from './utils.js';

/* « 25 € » plutôt que « 25,00 € » sur une affiche ; les centimes restent
   quand il y en a (13,50 €). */
function posterPrice(value, lang) {
  const locales = { fr: 'fr-FR', es: 'es-ES', en: 'en-GB' };
  const whole = Number.isInteger(value);
  try {
    return new Intl.NumberFormat(locales[lang] || 'fr-FR', {
      style: 'currency', currency: 'EUR',
      minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2
    }).format(value);
  } catch (e) {
    return value + ' €';
  }
}

/* « Deux pizzas,|*une soirée.* » → deux lignes, le mot entre étoiles en
   script. Le texte est échappé avant d'être mis en forme. */
function posterTitle(raw) {
  return raw.split('|').map((line) => {
    const safe = escapeHtml(line);
    const html = safe.replace(/\*([^*]+)\*/g, '<span class="script">$1</span>');
    return `<span class="poster__line">${html}</span>`;
  }).join('');
}

function shot(s, altText) {
  const images = window.PIZZA_AVENUE_IMAGES || {};
  if (!images[s.image]) return '';
  const style = `--x:${s.x}%;--y:${s.y}%;--w:${s.w}%;--r:${s.r || 0}deg`;
  return `<div class="poster__shot" style="${style}">` +
    picture(s.image, altText, `(min-width: 62rem) ${Math.round(s.w * 0.4)}vw, ${Math.round(s.w * 0.85)}vw`) +
    '</div>';
}

export function renderPosters() {
  const menu = window.PIZZA_AVENUE_MENU;
  const host = document.querySelector('.posters');
  if (menu && host) {
    const lang = currentLang();
    host.innerHTML = (menu.combos || []).map((c) => (
      `<article class="poster poster--${escapeHtml(c.theme)}" data-reveal>` +
        `<span class="poster__ghost" aria-hidden="true">${escapeHtml(pick(c.eyebrow).split(' ').pop())}</span>` +
        '<svg class="poster__road" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><use href="#road-path"/></svg>' +
        '<header class="poster__top">' +
          `<span class="poster__eyebrow">${escapeHtml(pick(c.eyebrow))}</span>` +
          '<svg class="poster__mark" viewBox="8 8 184 94" aria-hidden="true"><use href="#mark-dome"/></svg>' +
        '</header>' +
        `<h3 class="poster__title">${posterTitle(pick(c.title))}</h3>` +
        `<div class="poster__shots">${(c.shots || []).map((s) => shot(s, '')).join('')}</div>` +
        '<div class="poster__sticker">' +
          `<span>${escapeHtml(t(c.plus ? 'poster.plus' : 'poster.price'))}</span>` +
          `<b>${c.plus ? '+' : ''}${escapeHtml(posterPrice(c.price, lang))}</b>` +
        '</div>' +
        '<footer class="poster__foot">' +
          `<p>${escapeHtml(pick(c.includes))}</p>` +
          `<a class="poster__cta" href="#venir">${escapeHtml(t('poster.order'))}` +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#ic-arrow"/></svg></a>' +
        '</footer>' +
      '</article>'
    )).join('');
  }

  const maison = document.getElementById('maisonPhoto');
  if (maison && !maison.firstChild) {
    maison.innerHTML = picture('maison_scene', '', '(min-width: 56rem) 40vw, 100vw');
  }

  document.querySelectorAll('.garnish[data-garnish]').forEach((el) => {
    if (!el.firstChild) el.innerHTML = `<div class="garnish__float">${picture(el.dataset.garnish, '', '14vw')}</div>`;
  });

  const ctaPizza = document.getElementById('ctaPizza');
  if (ctaPizza && !ctaPizza.firstChild) {
    ctaPizza.innerHTML = picture('hero_pizza', '', '40vw');
  }
}
