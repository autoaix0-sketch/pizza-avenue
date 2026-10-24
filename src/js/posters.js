/* =========================================================================
   PIZZA AVENUE — les affiches « Formules & offres »
   =========================================================================
   Même idée que les affiches de Taco Naan (un titre, un plat, un prix), mais
   construites en HTML plutôt que cuites dans une image : le texte reste du
   texte — traduit, net à toutes les tailles. Les offres viennent de
   public/data/offers.js, que le propriétaire change depuis le tableau de bord :
   chaque offre est visible du jour de début au jour de fin inclus (pas de fin
   = toujours), à l'heure du restaurant. Sans offre en cours, la section et
   son lien de menu disparaissent.

   Ce module pose aussi les autres photos « de décor » : la scène de
   La maison et la pizza qui dépasse dans l'appel final.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml, picture } from './utils.js';
import { todayIso, longDate, addIsoDays } from './hours.js';

/* Les quatre fonds de la marque, en alternance. */
const THEMES = ['forest', 'tomato', 'gold', 'cream'];

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
   script. Le texte est échappé avant d'être mis en forme. Un titre simple
   (celui du tableau de bord) reste une seule ligne. */
function posterTitle(raw) {
  return raw.split('|').map((line) => {
    const safe = escapeHtml(line);
    const html = safe.replace(/\*([^*]+)\*/g, '<span class="script">$1</span>');
    return `<span class="poster__line">${html}</span>`;
  }).join('');
}

function orderHref() {
  const site = window.PIZZA_AVENUE_SITE;
  if (!site) return '#venir';
  return site.links.orderOnline || 'tel:' + site.phone.link;
}

/* Les offres en cours aujourd'hui. */
export function activeOffers() {
  const file = window.PIZZA_AVENUE_OFFERS;
  const today = todayIso();
  return ((file && file.offers) || []).filter((o) => o.start <= today && (!o.end || today <= o.end));
}

/* La photo de l'offre : celle envoyée depuis le tableau de bord, sinon la
   photo du site que l'offre nomme (image). */
function offerShot(o, altText) {
  const uploads = window.PIZZA_AVENUE_UPLOADS || {};
  const key = o.photo && uploads[o.photo] ? o.photo : o.image;
  const html = key ? picture(key, altText, '(min-width: 62rem) 30vw, 70vw') : '';
  if (!html) return '';
  return '<div class="poster__shot" style="--x:48%;--y:62%;--w:78%;--r:-4deg">' + html + '</div>';
}

export function renderPosters() {
  const host = document.querySelector('.posters');
  const section = document.getElementById('formules');
  if (host && section) {
    const lang = currentLang();
    const offers = activeOffers();
    section.hidden = !offers.length;
    document.querySelectorAll('a[href="#formules"]').forEach((a) => { a.hidden = !offers.length; });

    host.innerHTML = offers.map((o, i) => {
      const title = pick(o.title);
      const text = o.text ? pick(o.text) : '';
      /* « Jusqu'au … » seulement pour une offre qui finit bientôt : une offre
         permanente (fin dans plus de deux mois) n'a pas à afficher de date. */
      const soon = o.end && o.end <= addIsoDays(todayIso(), 60);
      const until = soon
        ? `<small class="poster__until">${escapeHtml(t('offer.until') + ' ' + longDate(o.end, true))}</small>`
        : '';
      return `<article class="poster poster--${THEMES[i % THEMES.length]}" data-reveal>` +
        `<span class="poster__ghost" aria-hidden="true">${escapeHtml(title.split(/[\s|]/)[0].replace(/\*/g, ''))}</span>` +
        '<svg class="poster__road" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><use href="#road-path"/></svg>' +
        '<header class="poster__top">' +
          `<span class="poster__eyebrow">${escapeHtml(t('poster.eyebrow'))}</span>` +
          '<svg class="poster__mark" viewBox="8 8 184 94" aria-hidden="true"><use href="#mark-dome"/></svg>' +
        '</header>' +
        `<h3 class="poster__title">${posterTitle(title)}</h3>` +
        `<div class="poster__shots">${offerShot(o, '')}</div>` +
        (o.price != null
          ? '<div class="poster__sticker">' +
              `<span>${escapeHtml(t('poster.price'))}</span>` +
              `<b>${escapeHtml(posterPrice(o.price, lang))}</b>` +
            '</div>'
          : '') +
        '<footer class="poster__foot">' +
          `<p>${escapeHtml(text)}${until}</p>` +
          `<a class="poster__cta" href="${escapeHtml(orderHref())}">${escapeHtml(t('poster.order'))}` +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#ic-arrow"/></svg></a>' +
        '</footer>' +
      '</article>';
    }).join('');
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
