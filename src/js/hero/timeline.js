/* =========================================================================
   PIZZA AVENUE — la timeline du héros
   =========================================================================
   Une scène épinglée, scrubbée (gsap.timeline + ScrollTrigger) :

     1. la vraie pizza tourne avec le scroll ;
     2. elle glisse vers le centre ;
     3. la photo entière cède la place à ses 8 parts ; la moitié basse
        tombe, la moitié haute se réduit ET passe de la photo au dessin —
        la pizza devient le symbole du logo ;
     4. le script se dessine, le trait balaie, la légende apparaît ;
     5. le lockup part se ranger dans le décor de la section suivante.

   Structure reprise du gabarit Rio's Grill : matchMedia desktop/mobile,
   carte de phases normalisée (geometry.js), valeurs en fonctions pour
   survivre à invalidateOnRefresh, cleanup renvoyé.
   ========================================================================= */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOTTOM_SLICES, TOP_SLICES, SLICE_FALL, START, P } from './geometry.js';

gsap.registerPlugin(ScrollTrigger);

export function initHero({ reduced, hasPhoto }) {
  const pin = document.getElementById('heroPin');
  const stage = document.getElementById('heroStage');
  const pizza = document.getElementById('heroPizza');
  const logo = document.getElementById('heroLogo');
  const whole = document.getElementById('pizzaWhole');
  const swashPath = document.getElementById('heroSwashPath');
  const tagline = document.getElementById('heroTagline');
  const mascot = document.getElementById('heroMascot');
  const copy = document.getElementById('heroCopy');
  const scrollHint = document.getElementById('heroScrollHint');
  const badge = document.getElementById('heroBadge');
  const garnish = Array.from(document.querySelectorAll('.garnish'));
  const glow = stage ? stage.querySelector('.hero-stage__glow') : null;

  if (!pin || !stage || !pizza || !logo) return () => {};

  const sliceEls = Array.from(pizza.querySelectorAll('.pizza-slice'));
  const photoOf = (i) => sliceEls[i] && sliceEls[i].querySelector('.slice-photo');
  const illoOf = (i) => sliceEls[i] && sliceEls[i].querySelector('.slice-illo');
  const allSlicePhotos = sliceEls.map((_, i) => photoOf(i));
  const allIllos = sliceEls.map((_, i) => illoOf(i));
  const topPhotos = TOP_SLICES.map(photoOf);
  const topIllos = TOP_SLICES.map(illoOf);

  const swashLength = swashPath ? swashPath.getTotalLength() : 0;

  // Sans photo (fichier absent, réseau coupé), la pizza dessinée prend sa
  // place dès le départ : le héros reste entier, seule la transition
  // photo → dessin disparaît.
  gsap.set(whole, { autoAlpha: hasPhoto ? 1 : 0 });
  gsap.set(allSlicePhotos, { autoAlpha: 0 });
  gsap.set(allIllos, { opacity: hasPhoto ? 0 : 1 });

  if (swashPath) gsap.set(swashPath, { strokeDasharray: swashLength, strokeDashoffset: swashLength });
  if (tagline) gsap.set(tagline, { autoAlpha: 0, y: 8 });
  if (mascot) gsap.set(mascot, { autoAlpha: reduced ? 1 : 0, scale: reduced ? 1 : 0.55 });

  if (reduced) {
    gsap.set(garnish, { autoAlpha: 0 });
    // État statique : la pizza entière posée, le lockup complet sous elle
    // (avec son propre symbole, voir .hero-stage__mark).
    if (swashPath) gsap.set(swashPath, { strokeDashoffset: 0 });
    if (tagline) gsap.set(tagline, { autoAlpha: 1, y: 0 });
    gsap.set(logo, { autoAlpha: 1 });
    return () => {};
  }

  gsap.set(logo, { autoAlpha: 0 });
  // Le centrage passe par xPercent/yPercent : GSAP le garde juste quand la
  // fenêtre change de taille, là où un translate(-50%) CSS relu en pixels
  // se décalerait.
  gsap.set([pizza, logo], { xPercent: -50, yPercent: -50, x: 0, y: 0 });

  const mm = gsap.matchMedia();

  mm.add(
    { isMobile: '(max-width: 46rem)', isDesktop: '(min-width: 46.01rem)' },
    (ctx) => {
      const { isMobile } = ctx.conditions;
      const W = () => stage.clientWidth;
      const H = () => stage.clientHeight;
      const start = isMobile ? START.mobile : START.desktop;
      const markScale = isMobile ? 0.36 : 0.4;

      // Où poser le centre de la pizza : au centre de la mascotte, en haut
      // du bloc logo. Calculé sur la mise en page (offsetHeight), pas sur
      // un rect déjà transformé — juste à toutes les tailles et après un
      // refresh.
      const markY = () => -logo.offsetHeight / 2 + (mascot ? mascot.offsetHeight / 2 : 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: isMobile ? '+=250%' : '+=360%', // tighter: the long version left several screens of near-empty cream
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle(self) { stage.classList.toggle('is-active', self.isActive); }
        },
        defaults: { ease: 'none' }
      });

      // ---- Phase 1 — rotation : le scroll fait tourner la vraie pizza ---
      tl.fromTo(pizza,
        { x: () => W() * start.x, y: () => H() * start.y, rotate: 0, scale: 1 },
        { x: () => W() * start.x, y: () => H() * start.y, rotate: isMobile ? 120 : 200, scale: isMobile ? 1.04 : 1.08, duration: P.rotateEnd },
        0)
        .to(copy, { autoAlpha: 0, y: -30, duration: 10 }, 0)
        .to(scrollHint, { autoAlpha: 0, duration: 6 }, 0)
        .fromTo(badge, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.6, duration: 8, immediateRender: false }, 0);

      // Les ingrédients s'envolent au premier scroll, chacun dans sa
      // direction, en tournant — la pizza, elle, reste.
      const flights = [
        { x: -0.08, y: -0.22, r: -70 },
        { x: 0.06, y: 0.18, r: 55 },
        { x: -0.05, y: 0.24, r: 80 }
      ];
      garnish.forEach((el, i) => {
        const f = flights[i % flights.length];
        tl.fromTo(el,
          { x: 0, y: 0, rotate: 0, autoAlpha: 1 },
          { x: () => W() * f.x, y: () => H() * f.y, rotate: f.r, autoAlpha: 0, duration: P.rotateEnd + 4, ease: 'power1.in', immediateRender: false },
          0);
      });

      tl.to(glow, { scale: 1.25, opacity: 0.85, duration: P.rotateEnd }, 0);

      // ---- Phase 2 — mouvement : elle glisse vers le centre ------------
      tl.to(pizza, {
        x: () => W() * (isMobile ? 0 : 0.05),
        y: () => H() * (isMobile ? -0.1 : -0.02),
        rotate: isMobile ? 250 : 330,
        scale: isMobile ? 1.08 : 1.14,
        duration: P.liftEnd - P.rotateEnd,
        ease: 'sine.inOut'
      }, P.rotateEnd);

      // ---- Phase 3 — transformation ------------------------------------
      // La photo entière laisse la place à ses 8 parts : mêmes pixels,
      // l'échange ne se voit pas. Les parts n'existent que maintenant, donc
      // aucune couture pendant la rotation.
      if (hasPhoto) {
        tl.set(whole, { autoAlpha: 0 }, P.fallStart)
          .set(allSlicePhotos, { autoAlpha: 1 }, P.fallStart);
      }

      // La moitié basse tombe : elle s'écarte le long de sa bissectrice,
      // puis la gravité l'emporte (unités du SVG, voir geometry.js).
      BOTTOM_SLICES.forEach((i, order) => {
        const el = sliceEls[i];
        const fall = SLICE_FALL[i];
        if (!el) return;
        tl.to(el, {
          svgOrigin: '100 100',
          x: fall.dx,
          y: fall.dy,
          rotate: fall.rot,
          scale: 0.92,
          autoAlpha: 0,
          duration: P.fallEnd - P.fallStart,
          ease: 'power2.in'
        }, P.fallStart + order * 0.8);
      });

      // La moitié haute se réduit, se redresse et monte au centre de la mascotte.
      tl.to(pizza, {
        scale: markScale,
        x: 0,
        rotate: 360,
        y: markY,
        duration: P.markSettle - P.fallStart,
        ease: 'power2.inOut'
      }, P.fallStart);

      // …et pendant qu'elle rétrécit, la photo devient le dessin du logo.
      if (hasPhoto) {
        tl.to(topPhotos, { autoAlpha: 0, duration: P.crossEnd - P.crossStart, ease: 'power1.inOut' }, P.crossStart)
          .to(topIllos, { opacity: 1, duration: P.crossEnd - P.crossStart, ease: 'power1.inOut' }, P.crossStart);
      }

      tl.to(glow, { opacity: 0, duration: 8 }, P.fallStart + 4);

      // La mascotte apparaît là où la pizza se pose, et la pizza s'efface
      // en elle : les parts « deviennent » le logo.
      tl.to(logo, { autoAlpha: 1, duration: 2 }, P.crossStart);
      if (mascot) {
        tl.to(mascot, { autoAlpha: 1, scale: 1, duration: P.markSettle - P.crossStart, ease: 'back.out(1.6)' }, P.crossStart);
      }
      tl.to(pizza, { autoAlpha: 0, duration: P.markSettle - P.crossStart - 2 }, P.crossStart + 2);

      // ---- Phase 4 — le lockup se révèle -------------------------------
      if (swashPath) {
        tl.to(swashPath, { strokeDashoffset: 0, duration: P.swashEnd - P.swashStart, ease: 'power1.out' }, P.swashStart);
      }
      if (tagline) {
        tl.to(tagline, { autoAlpha: 1, y: 0, duration: P.taglineEnd - P.taglineStart }, P.taglineStart);
      }

      // ---- Phase 5 — le lockup part se ranger dans le décor ------------
      // Il recule vers le haut du cadre et pâlit jusqu'à n'être plus qu'un
      // filigrane : pendant ce temps, la section suivante (remontée sous la
      // scène, voir .brand-moment dans sections.css) arrive par le bas.
      const lift = () => H() * (isMobile ? 0.16 : 0.2);
      const park = { duration: P.parkEnd - P.parkStart, ease: 'power2.inOut' };
      tl.to(logo, { scale: 0.6, y: () => -lift(), opacity: 0.2, ...park }, P.parkStart)
        // Un temps de pause, filigrane posé, pendant que la section
        // suivante finit d'entrer.
        .to({}, { duration: 100 - P.parkEnd }, P.parkEnd);

      // Une fois l'épinglage terminé, la scène défile plus lentement que la
      // page (parallaxe) : le filigrane passe DERRIÈRE la section suivante,
      // dont le fond opaque le recouvre. C'est la scène entière qui bouge —
      // aucun conflit avec les tweens ci-dessus, qui animent ses enfants.
      const exit = gsap.to(stage, {
        y: () => H() * 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: () => tl.scrollTrigger.end,
          end: () => tl.scrollTrigger.end + H(),
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      return () => {
        tl.scrollTrigger?.kill(); tl.kill();
        exit.scrollTrigger?.kill(); exit.kill();
      };
    }
  );

  return () => mm.revert();
}
