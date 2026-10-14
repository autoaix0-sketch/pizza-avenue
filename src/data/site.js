/* =========================================================================
   PIZZA AVENUE — informations de l'établissement (Dax)
   =========================================================================

   Source : sites/PIZZA AVENUE_V2/AVENUE_PIZZA_LIBRARY/10_WEBSITE_BUILD_READY/
   00_content/SITE_FACTS.md. Ce qui manque encore est marqué "TODO-OWNER".
   ========================================================================= */

window.PIZZA_AVENUE_SITE = {
  brand: {
    name: "Pizza Avenue",
    tagline: "Une faim de caractère."
  },

  /* Bandeau « Ouverture prochaine » en haut de la page.
     true = affiché, false = masqué.
     TODO-OWNER — passer à false le jour de l'ouverture (date à confirmer, M43). */
  openingSoon: true,

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

  /* TODO-OWNER — horaires réels (M40). Minutes depuis minuit, par service :
       services: [[11 * 60 + 30, 14 * 60], [18 * 60, 22 * 60 + 30]]
     Tant que la liste est vide, la ligne « Horaires » et le badge
     Ouvert / Fermé restent masqués. */
  hours: {
    services: [],
    timezone: "Europe/Paris"
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
