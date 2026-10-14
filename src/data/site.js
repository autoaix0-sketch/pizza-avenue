/* =========================================================================
   PIZZA AVENUE — informations de l'établissement
   =========================================================================

   TOUT CE QUI EST MARQUÉ "TODO-OWNER" EST UN PLACEHOLDER.
   Pizza Avenue est un concept de marque : ces informations ne sont pas
   celles d'un restaurant réel. Avant toute mise en ligne, le propriétaire
   doit remplacer chaque valeur ci-dessous par les vraies coordonnées.

   Rien de cette page ne doit être publié tel quel comme fiche d'un
   établissement existant.
   ========================================================================= */

window.PIZZA_AVENUE_SITE = {
  brand: {
    name: "Pizza Avenue",
    tagline: "Fast food · Good mood"
  },

  /* TODO-OWNER — adresse réelle du restaurant */
  address: {
    street: "12 Avenue de la Cuisine",
    city: "Votre ville",
    postalCode: "00000",
    region: "France",
    country: "FR",
    mapsUrl: "https://www.google.com/maps",
    lat: 0,
    lng: 0
  },

  /* TODO-OWNER — téléphone réel, format humain + lien tel: */
  phone: {
    human: "00 00 00 00 00",
    link: "+330000000000"
  },

  /* TODO-OWNER — horaires réels. Même format que Taco Naan : minutes depuis
     minuit, converties par src/js/hours.js. */
  hours: {
    services: [
      [11 * 60 + 30, 14 * 60 + 30],
      [18 * 60 + 30, 22 * 60 + 30]
    ],
    timezone: "Europe/Paris"
  },

  /* TODO-OWNER — liens réels. Laisser vide ("") retire le bouton du footer. */
  links: {
    instagram: "",
    googleReviews: "",
    orderOnline: ""
  },

  /* TODO-OWNER — note et nombre d'avis Google réels, une fois la fiche
     établie. À zéro pour l'instant : la section avis reste masquée tant que
     ces valeurs ne sont pas renseignées (voir src/js/sections.js). */
  reviews: {
    rating: 0,
    count: 0,
    sourceDate: ""
  }
};
