/* Mesure d'audience Cloudflare Web Analytics, chargée seulement si un jeton
   est renseigné dans src/data/site.js (analytics.cloudflareToken). Le script
   part après le héros : il ne retarde jamais le premier affichage. */

export function loadAnalytics() {
  const site = window.PIZZA_AVENUE_SITE;
  const token = site && site.analytics && site.analytics.cloudflareToken;
  if (!token || !/^[A-Za-z0-9]{16,64}$/.test(token)) return;

  const script = document.createElement('script');
  script.type = 'module'; // comme l'extrait donné par Cloudflare
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(script);
}
