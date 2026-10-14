/* Petits utilitaires partagés — pas de dépendance, rien à charger. */

export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

export function money(value, lang) {
  if (value == null) return '';
  const locales = { fr: 'fr-FR', es: 'es-ES', en: 'en-GB' };
  try {
    return new Intl.NumberFormat(locales[lang] || 'fr-FR', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 2
    }).format(value);
  } catch (e) {
    return value.toFixed(2) + ' €';
  }
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* Construit un <picture> complet depuis le manifeste d'images optimisées
   (window.PIZZA_AVENUE_IMAGES) : AVIF pour les navigateurs récents, WebP
   pour tous les autres, width/height posés pour qu'aucune image ne fasse
   sauter la page pendant son chargement. */
export function picture(key, alt, sizes, eager) {
  const images = window.PIZZA_AVENUE_IMAGES || {};
  const entry = images[key];
  if (!entry) return '';

  const stem = escapeHtml(entry.stem);
  const srcset = (ext) => entry.sizes.map((s) => (
    `assets/food/${stem}-${s[0]}.${ext} ${s[0]}w`
  )).join(', ');
  const last = entry.sizes[entry.sizes.length - 1];

  return '<picture>' +
    `<source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}">` +
    `<img src="assets/food/${stem}-${last[0]}.webp"` +
    ` srcset="${srcset('webp')}" sizes="${sizes}"` +
    ` width="${last[0]}" height="${last[1]}"` +
    ` alt="${escapeHtml(alt || '')}"` +
    (eager ? ' fetchpriority="high"' : ' loading="lazy"') +
    ' decoding="async">' +
    '</picture>';
}
