/* =========================================================================
   PIZZA AVENUE — informations de l'établissement (Dax)
   =========================================================================

   Ici : ce qui ne change presque jamais (nom, adresse, téléphone, liens).
   Ce que le propriétaire change depuis le tableau de bord vit dans
   public/data/ : la carte (menu.js), les horaires (hours.js), les offres
   (offers.js) et les photos envoyées (uploads.js).

   Source : sites/PIZZA AVENUE_best/AVENUE_PIZZA_LIBRARY/10_WEBSITE_BUILD_READY/
   00_content/SITE_FACTS.md. Ce qui manque encore est marqué "TODO-OWNER".
   ========================================================================= */

window.PIZZA_AVENUE_SITE = {
  brand: {
    name: "Pizza Avenue",
    tagline: "Une faim de caractère."
  },

  /* Bandeau « Ouverture prochaine » en haut de la page.
     true = affiché, false = masqué. Le restaurant est ouvert : false. */
  openingSoon: false,

  /* Les horaires sont dans public/data/hours.js, lus à l'heure de ce fuseau. */
  timezone: "Europe/Paris",

  address: {
    street: "75 Av. Saint-Vincent de Paul",
    city: "Dax",
    postalCode: "40100",
    region: "Landes",
    country: "FR",
    mapsUrl: "https://maps.app.goo.gl/1YcMSX9xrhdtXAe47",
    /* TODO-OWNER — coordonnées GPS exactes (facultatif). Vides : le bouton
       « Itinéraire » ouvre simplement le lien Google Maps ci-dessus. */
    lat: 0,
    lng: 0
  },

  phone: {
    human: "09 66 13 03 02",
    link: "+33966130302"
  },

  /* Commande : par téléphone uniquement. Laisser vide ("") = pas de bouton. */
  links: {
    instagram: "https://www.instagram.com/pizzavenue40100/",
    googleReviews: "",
    orderOnline: ""
  },

  /* Pas d'avis pour l'instant : à zéro, la section « Les avis » reste
     masquée (voir src/js/sections.js: initReviewsVisibility). */
  reviews: {
    rating: 0,
    count: 0,
    sourceDate: ""
  }
};
