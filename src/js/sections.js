/* Révélations au scroll (post-hero) + scrim de nav + affichage conditionnel
   de la section avis. Pas de GSAP ici : IntersectionObserver suffit, et se
   dégrade proprement en CSS quand prefers-reduced-motion est actif. */

import { t } from './i18n.js';

export function initReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(el);
  });
}

export function initNavScrim() {
  const topbar = document.querySelector('.topbar');
  const callbar = document.querySelector('.callbar');
  const hero = document.querySelector('.hero');
  if (!topbar) return;

  function onScroll() {
    topbar.setAttribute('data-stuck', String(window.scrollY > 24));
    if (callbar && hero) {
      callbar.setAttribute('data-show', String(window.scrollY > hero.offsetHeight * 0.6));
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Tant que src/data/site.js contient des avis à zéro (placeholder), la
   section reste masquée plutôt que d'afficher « 0 avis » : mieux vaut
   l'absence que le mensonge. */
export function initReviewsVisibility() {
  const site = window.PIZZA_AVENUE_SITE;
  const section = document.getElementById('avis');
  if (!section) return;
  const hasReviews = site && site.reviews && site.reviews.count > 0;
  section.hidden = !hasReviews;

  const navLink = document.querySelector('a[href="#avis"]');
  if (navLink && !hasReviews) navLink.hidden = true;
}

/* Numérote les sections visibles dans l'ordre (01, 02, …). Une section
   masquée — les avis, tant qu'ils sont vides — ne laisse plus de trou dans
   la numérotation. */
export function numberSections() {
  let n = 0;
  document.querySelectorAll('main > section').forEach((section) => {
    const num = section.querySelector('.eyebrow b');
    if (!num) return;
    if (section.hidden) return;
    n += 1;
    num.textContent = String(n).padStart(2, '0');
  });
}

/* Navigation mobile : sous 60rem les liens passent dans un panneau ouvert
   par le bouton « Menu ». Fermeture au clic sur un lien, à Échap, ou en
   repassant au-dessus de 60rem. */
export function initMobileNav() {
  const toggle = document.querySelector('.navtoggle');
  const nav = document.getElementById('siteNav');
  const topbar = document.querySelector('.topbar');
  if (!toggle || !nav || !topbar) return;

  const label = toggle.querySelector('.navtoggle__label');
  const setOpen = (open, { focusToggle = false } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    topbar.classList.toggle('is-nav-open', open);
    if (label) {
      label.setAttribute('data-i18n', open ? 'nav.close' : 'nav.open');
      label.textContent = t(label.getAttribute('data-i18n'));
    }
    if (open) {
      const first = nav.querySelector('a:not([hidden])');
      if (first) first.focus();
    } else if (focusToggle) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, { focusToggle: true });
    }
  });
  window.matchMedia('(min-width: 60.01rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
