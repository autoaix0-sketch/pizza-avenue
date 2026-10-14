# Pizza Avenue — le vrai site (Dax)

Site de la pizzeria halal à emporter **Pizza Avenue**, 75 Av. Saint-Vincent de Paul,
40100 Dax. Vite + GSAP/ScrollTrigger, vanilla JS, FR/ES/EN.

C'est une copie de la démo `sites/pizza-avenue` (démo 09 du Fast Food Lab, qui reste
fictive), habillée avec la vraie marque (mascotte) et le vrai menu halal.

Sources (jamais modifiées) :
`sites/PIZZA AVENUE_V2/AVENUE_PIZZA_LIBRARY/10_WEBSITE_BUILD_READY/`
(menu : `00_content/menu-halal_structured.json`, faits : `00_content/SITE_FACTS.md`).

## Lancer en local

```bash
npm install
npm run dev       # http://localhost:4178/
npm run build     # build de production dans dist/
npm run preview   # sert ce build sur le même port
```

Ou `avenue-pizza` dans `.claude/launch.json`.

## Où changer quoi

| Quoi | Fichier |
|---|---|
| Nom, adresse, téléphone, Instagram, horaires, bandeau « Ouverture prochaine » | `src/data/site.js` |
| Plats et prix | `src/data/menu.js` |
| Textes FR/ES/EN | `src/js/i18n.js` |
| Mentions légales | `mentions-legales.html` |
| Photos | `images/` (noms fixes) puis `python scripts/optimize_assets.py` |

Tout ce qui manque encore est marqué `TODO-OWNER` (horaires, date d'ouverture,
infos légales).

## En ligne

- Code : GitHub `autoaix0-sketch/pizza-avenue` (le dépôt porte le nom de la marque ;
  le dossier s'appelle `avenue-pizza` car `sites/pizza-avenue` est la démo du Lab).
- Version de présentation pour le client : **https://autoaix0-sketch.github.io/pizza-avenue/**
  (GitHub Pages). Chaque push sur `main` reconstruit et republie le site
  (`.github/workflows/pages.yml`, avec `BASE_PATH=/pizza-avenue/`).
- `vercel.json` est prêt si le site passe un jour sur Vercel (`vercel deploy --prod --yes`).

**Avant le vrai lancement** :
- retirer `<meta name="robots" content="noindex, nofollow">` de `index.html` et l'en-tête
  `X-Robots-Tag` de `vercel.json` (ils cachent le site à Google tant que les infos ne
  sont pas confirmées) ;
- ajouter `<link rel="canonical">` dans `index.html` avec le nom de domaine final ;
- compléter les `TODO-OWNER` (horaires, date d'ouverture, mentions légales).
