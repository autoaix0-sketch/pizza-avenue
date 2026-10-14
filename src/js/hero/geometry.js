/* =========================================================================
   PIZZA AVENUE — géométrie du héros
   =========================================================================
   La pizza est coupée en 8 parts de 45°, numérotées 0→7 à partir de l'est,
   dans le sens horaire (voir index.html #pizzaSlices) :

     0: 0–45°    (est → sud-est)        1: 45–90°   (sud-est → sud)
     2: 90–135°  (sud → sud-ouest)      3: 135–180° (sud-ouest → ouest)
     4: 180–225° (ouest → nord-ouest)   5: 225–270° (nord-ouest → nord)
     6: 270–315° (nord → nord-est)      7: 315–360° (nord-est → est)

   Les parts 0-3 (moitié basse) se détachent et tombent hors cadre : c'est
   « ce qu'on retire ». Les parts 4-7 (moitié haute) restent groupées et se
   réduisent jusqu'à devenir le symbole du logo. Chaque part porte deux
   rendus de la même géométrie — la photo découpée et la part dessinée —
   et la moitié haute passe de l'un à l'autre en rétrécissant : la vraie
   pizza devient le logo dessiné (image 3 du brand board, « Morphing »).
   ========================================================================= */

/* Où se trouve la pizza au départ, en fraction du cadre. Sur grand écran
   elle est à droite du texte d'accroche ; sur téléphone, au-dessus. La
   phase 2 la ramène au centre, où le logo l'attend. */
export const START = {
  desktop: { x: 0.2, y: 0.02 },
  mobile: { x: 0, y: -0.22 }
};

export const BOTTOM_SLICES = [0, 1, 2, 3];
export const TOP_SLICES = [4, 5, 6, 7];

/* La chute de chaque part basse, en unités du SVG de la pizza (repère
   200×200, donc elle suit la taille de la pizza à l'écran). Chaque part
   s'écarte d'abord le long de sa bissectrice (22,5°, 67,5°, 112,5°,
   157,5°), puis la gravité l'emporte : dy grand, un peu de rotation. */
export const SLICE_FALL = {
  0: { dx: 37, dy: 175, rot: 28 },
  1: { dx: 15, dy: 205, rot: -14 },
  2: { dx: -15, dy: 205, rot: 14 },
  3: { dx: -37, dy: 175, rot: -28 }
};

/* Carte des phases, en unités normalisées de 0 à 100 (repris du gabarit
   Rio's Grill : une timeline scrub, un seul repère de progression). */
export const P = {
  rotateEnd: 16,     // phase 1 — rotation physique
  liftEnd: 32,       // phase 2 — la pizza glisse vers le centre
  fallStart: 34,     // la photo entière cède la place aux 8 parts découpées
  fallEnd: 50,       // phase 3 — les parts basses tombent
  crossStart: 46,    // la moitié haute passe de la photo au dessin…
  crossEnd: 57,      // …pendant qu'elle se réduit : elle DEVIENT le symbole
  markSettle: 58,    // la moitié haute finit de se réduire en symbole
  wordmarkStart: 58,
  wordmarkEnd: 70,   // phase 4 — le script se dessine
  swashStart: 66,
  swashEnd: 76,
  taglineStart: 72,
  taglineEnd: 80,
  parkStart: 80,
  parkEnd: 94        // phase 5 — le lockup part en fond de page
};
