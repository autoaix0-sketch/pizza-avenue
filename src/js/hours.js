/* =========================================================================
   PIZZA AVENUE — horaires, badge ouvert / fermé, fermetures exceptionnelles
   =========================================================================
   Porté depuis Taco Naan (assets/js/site.js). Les horaires viennent de
   public/data/hours.js (réécrit par le tableau de bord) : un tableau par jour
   de la semaine (jusqu'à 2 services, [] = fermé) et une liste de fermetures
   exceptionnelles. Tout se calcule à l'heure du restaurant, pas à celle du
   visiteur : un client à Londres voit « fermé » quand c'est fermé à Dax.
   ========================================================================= */

import { t, pick, currentLang } from './i18n.js';
import { escapeHtml } from './utils.js';

const LOCALES = { fr: 'fr-FR', es: 'es-ES', en: 'en-GB' };
/* Index = getUTCDay() : 0 = dimanche. */
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function timezone() {
  const site = window.PIZZA_AVENUE_SITE;
  return (site && site.timezone) || 'Europe/Paris';
}

function data() {
  return window.PIZZA_AVENUE_HOURS || { week: {}, closures: [] };
}

/* ------------------------------------------------------------------ calendrier */

/* Calcul de calendrier en UTC sur des chaînes « AAAA-MM-JJ » : aucun fuseau
   ni changement d'heure ne peut décaler un jour. */
function utcDate(iso) {
  const p = iso.split('-');
  return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
}
function dayOfWeek(iso) { return utcDate(iso).getUTCDay(); }
function addDays(iso, n) {
  const d = utcDate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export const addIsoDays = addDays;

/* La date, l'heure et le jour de la semaine chez le restaurant. */
function zoneNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone(), hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).formatToParts(new Date());
  const v = {};
  parts.forEach((p) => { v[p.type] = p.value; });
  const date = `${v.year}-${v.month}-${v.day}`;
  return {
    date,
    minutes: (parseInt(v.hour, 10) % 24) * 60 + parseInt(v.minute, 10),
    day: dayOfWeek(date)
  };
}

function toMinutes(text) {
  const p = String(text).split(':');
  return (+p[0]) * 60 + (+p[1]);
}

export function hhmm(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

function capitalize(text) { return text.charAt(0).toUpperCase() + text.slice(1); }

/* « dimanche 12 octobre », dans la langue du visiteur. */
export function longDate(iso, withWeekday) {
  const opts = { timeZone: 'UTC', day: 'numeric', month: 'long' };
  if (withWeekday) opts.weekday = 'long';
  return new Intl.DateTimeFormat(LOCALES[currentLang()], opts).format(utcDate(iso));
}

/* Aujourd'hui, à l'heure du restaurant (« AAAA-MM-JJ »). */
export function todayIso() { return zoneNow().date; }

/* ----------------------------------------------------------------- les services */

/* Les services d'un jour de la semaine, en minutes. [] = fermé. */
export function servicesOfDay(dayIndex) {
  const week = data().week || {};
  return (week[DAY_KEYS[dayIndex]] || []).map((s) => [toMinutes(s[0]), toMinutes(s[1])]);
}

/* La fermeture exceptionnelle qui couvre cette date, s'il y en a une. */
function closureOn(iso) {
  const list = data().closures || [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].from <= iso && iso <= list[i].to) return list[i];
  }
  return null;
}

function servicesOn(iso) {
  return closureOn(iso) ? [] : servicesOfDay(dayOfWeek(iso));
}

/* Le prochain jour ouvert strictement après `iso`. On borne la recherche :
   une fermeture d'été dure des semaines, pas des années. */
function nextOpening(iso) {
  for (let n = 1; n <= 90; n++) {
    const date = addDays(iso, n);
    const services = servicesOn(date);
    if (services.length) return { date, start: services[0][0], inDays: n };
  }
  return null;
}

function reopenLabel(iso) {
  const next = nextOpening(iso);
  if (!next) return '';
  return (next.inDays === 1
    ? t('opens.tomorrow')
    : t('opens.on') + ' ' + longDate(next.date, true) + ' ' + t('at')) +
    ' ' + hhmm(next.start);
}

/* { open, label, title? } */
export function openState() {
  const now = zoneNow();

  if (closureOn(now.date)) {
    return { open: false, title: t('closed.exc'), label: reopenLabel(now.date) };
  }

  const services = servicesOfDay(now.day);
  for (let i = 0; i < services.length; i++) {
    const start = services[i][0], end = services[i][1];
    if (now.minutes >= start && now.minutes < end) {
      const left = end - now.minutes;
      const label = left <= 60
        ? t('closes.in') + ' ' + left + ' ' + t('min')
        : t('closes.at') + ' ' + hhmm(end);
      return { open: true, label };
    }
  }

  for (let j = 0; j < services.length; j++) {
    if (now.minutes < services[j][0]) {
      return { open: false, label: t('opens.at') + ' ' + hhmm(services[j][0]) };
    }
  }
  return { open: false, label: reopenLabel(now.date) };
}

/* Il y a des horaires dès qu'un jour a au moins un service. */
function hasHours() {
  for (let d = 0; d < 7; d++) if (servicesOfDay(d).length) return true;
  return false;
}

export function paintStatus() {
  const nodes = document.querySelectorAll('[data-status]');
  if (!hasHours()) {
    nodes.forEach((node) => { node.hidden = true; });
    return;
  }
  const state = openState();
  nodes.forEach((node) => {
    node.hidden = false;
    node.className = 'status ' + (state.open ? 'status--open' : 'status--closed');
    node.innerHTML = '<span class="status__dot"></span><span><b>' +
      escapeHtml(state.title || (state.open ? t('open') : t('closed'))) + '</b>' +
      (state.label ? ' · ' + escapeHtml(state.label) : '') + '</span>';
  });
}

/* --------------------------------------------------- le bloc « Horaires » */

function servicesText(services) {
  return services.map((s) => `<span>${hhmm(s[0])} – ${hhmm(s[1])}</span>`).join('');
}

function dayName(dayIndex) {
  /* Le 7 janvier 2024 est un dimanche : 7 + dayIndex donne le bon jour. */
  return capitalize(new Intl.DateTimeFormat(LOCALES[currentLang()], {
    timeZone: 'UTC', weekday: 'long'
  }).format(new Date(Date.UTC(2024, 0, 7 + dayIndex))));
}

/* Tous les jours identiques : « Tous les jours » et les services. Sinon des
   groupes de jours consécutifs, du lundi au dimanche. */
export function renderHours() {
  const host = document.getElementById('venirHours');
  if (!host) return;
  const row = host.closest('.info-row');
  if (!hasHours()) {
    host.innerHTML = '';
    if (row) row.hidden = true;
    return;
  }
  if (row) row.hidden = false;

  const closedText = `<span>${escapeHtml(t('closed'))}</span>`;
  const days = [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const services = servicesOfDay(d);
    return { day: d, services, sig: JSON.stringify(services) };
  });

  const groups = [];
  days.forEach((entry) => {
    const last = groups[groups.length - 1];
    if (last && last.sig === entry.sig) last.days.push(entry.day);
    else groups.push({ sig: entry.sig, services: entry.services, days: [entry.day] });
  });

  if (groups.length === 1) {
    host.innerHTML = escapeHtml(t('hours.all')) +
      (groups[0].services.length ? servicesText(groups[0].services) : closedText);
    return;
  }

  host.innerHTML = groups.map((g) => {
    const label = dayName(g.days[0]) +
      (g.days.length > 1 ? ' – ' + dayName(g.days[g.days.length - 1]) : '');
    return '<span class="hours__group"><b>' + escapeHtml(label) + '</b>' +
      (g.services.length ? servicesText(g.services) : closedText) + '</span>';
  }).join('');
}

/* ----------------------------------------------- fermeture exceptionnelle */

/* La prochaine fermeture exceptionnelle qui touche aujourd'hui ou les sept
   jours qui viennent, pour prévenir les habitués. */
export function upcomingClosure() {
  const now = zoneNow().date;
  const horizon = addDays(now, 7);
  let found = null;
  (data().closures || []).forEach((c) => {
    if (c.to >= now && c.from <= horizon && (!found || c.from < found.from)) found = c;
  });
  return found;
}

/* « Fermé le lundi 3 novembre — Congés » */
export function closureText(closure) {
  const when = closure.from === closure.to
    ? t('closure.on') + ' ' + longDate(closure.from, true)
    : t('closure.range').replace('{a}', longDate(closure.from)).replace('{b}', longDate(closure.to));
  const note = pick(closure.note);
  return { when, note };
}

/* Les horaires pour le balisage schema.org (src/js/seo.js). */
export function schemaHours() {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const specs = [];
  for (let d = 0; d < 7; d++) {
    servicesOfDay(d).forEach((s) => {
      specs.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: names[d],
        opens: hhmm(s[0]),
        closes: hhmm(s[1])
      });
    });
  }
  const closures = (data().closures || []).map((c) => ({
    '@type': 'OpeningHoursSpecification',
    opens: '00:00',
    closes: '00:00',
    validFrom: c.from,
    validThrough: c.to
  }));
  return { specs, closures };
}
