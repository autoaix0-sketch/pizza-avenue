# Pizza Avenue — le vrai site (Dax)

Site de la pizzeria halal à emporter **Pizza Avenue**, 75 Av. Saint-Vincent de Paul,
40100 Dax. Vite + GSAP/ScrollTrigger, vanilla JS, FR/ES/EN.

C'est une copie de la démo `sites/pizza-avenue` (démo 09 du Fast Food Lab, qui reste
fictive), habillée avec la vraie marque (mascotte) et le vrai menu halal.

Sources (jamais modifiées) :
`sites/PIZZA AVENUE_best/AVENUE_PIZZA_LIBRARY/10_WEBSITE_BUILD_READY/`
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
| Nom, adresse, téléphone, Instagram, bandeau « Ouverture prochaine » (`openingSoon`, éteint : le restaurant est ouvert) | `src/data/site.js` |
| Mesure d'audience Cloudflare Web Analytics (`analytics.cloudflareToken`, vide = rien n'est chargé) et lien des avis Google (`links.googleReviews`) | `src/data/site.js` |
| **La carte et les prix** (carte du 23 octobre 2026) | `public/data/menu.js` |
| **Les horaires** (7j/7, 11:30–15:30 et 18:00–23:30) et les fermetures exceptionnelles | `public/data/hours.js` |
| **Les offres** de la section « Formules & offres » (vide = la section disparaît) | `public/data/offers.js` |
| Les photos envoyées depuis le tableau de bord | `public/data/uploads.js` + `public/assets/img/uploads/` |
| Textes FR/ES/EN | `src/js/i18n.js` |
| Mentions légales | `mentions-legales.html` |
| Photos d'origine | `images/` (noms fixes) puis `python scripts/optimize_assets.py` |

Les quatre fichiers de `public/data/` sont du **JSON pur** (un commentaire d'en-tête,
puis `window.PIZZA_AVENUE_X = {…};`), chargés par `index.html` avant le code. Ils sont
**écrits par le tableau de bord** (`sites/avenue-pizza-admin`) : le propriétaire change
un prix depuis son téléphone, le dépôt reçoit un commit, GitHub Pages republie.
**Fais `git pull` avant de modifier ces fichiers à la main**, et garde-les en JSON
valide (guillemets doubles, pas de virgule finale), sinon le tableau de bord refuse
de publier. Le JSON-LD pour Google (carte, prix, horaires, fermetures) est construit
dans le navigateur par `src/js/seo.js` à partir de ces fichiers.

Ce qui manque encore est marqué `TODO-OWNER` (infos légales).

## En ligne

- Code : GitHub `autoaix0-sketch/pizza-avenue` (le dépôt porte le nom de la marque ;
  le dossier s'appelle `avenue-pizza` car `sites/pizza-avenue` est la démo du Lab).
- **Site principal : https://pizza-avenue-dax.vercel.app** (projet Vercel
  `pizza-avenue-dax`, relié au dépôt GitHub depuis le 26 oct. 2026). Chaque push sur
  `main` (le tien ou celui du tableau de bord) le republie en moins d'une minute.
  Réglage Vercel : `SITE_URL=https://pizza-avenue-dax.vercel.app/` (image de partage
  absolue). Le nom `pizza-avenue.vercel.app` appartient à quelqu'un d'autre.
- Copie de secours : https://autoaix0-sketch.github.io/pizza-avenue/ (GitHub Pages,
  `.github/workflows/pages.yml` avec `BASE_PATH=/pizza-avenue/`). À couper quand le
  nom de domaine sera en ligne.
- Mesure d'audience : Cloudflare Web Analytics ne compte qu'un seul nom d'hôte (celui
  du site Cloudflare, aujourd'hui `pizza-avenue-dax.vercel.app`). À changer dans
  Cloudflare > Web Analytics > Manage site quand le domaine arrive.

## Référencement (SEO)

Le site est ouvert à Google depuis le 3 nov. 2026.

- `index.html` : plus de `noindex`, et un `<link rel="canonical">` vers l'adresse du
  site. `mentions-legales.html` garde son `noindex, follow` : Google lit la page et
  suit ses liens, mais ne la montre pas dans les résultats.
- `vercel.json` : l'en-tête `X-Robots-Tag: noindex, nofollow` a été retirée. Elle
  cachait le site à Google même sans la balise dans la page.
- `public/robots.txt` et `public/sitemap.xml` : Vite les copie à la racine du site
  (`/robots.txt`, `/sitemap.xml`). Le sitemap ne liste que la page d'accueil.
- Fiche Restaurant (JSON-LD) : `src/js/seo.js` y ajoute la carte, les prix, les
  horaires et les coordonnées. `priceRange` (« 7,50–12,50 € ») est **calculé**
  depuis `public/data/menu.js` : il suit le tableau de bord tout seul. Les
  accompagnements, desserts et boissons sont exclus du calcul — sinon la
  fourchette partirait de 1 € (une bouteille d'eau). Voir `NOT_A_MEAL`.
- Adresse, téléphone et horaires sont écrits en clair dans `index.html` **et** remis
  par `src/js/venir.js`. Le même texte des deux côtés : la page reste lisible si le
  JavaScript ne part pas.

**La fiche Google** (carte, avis, horaires) compte plus qu'un site pour un
restaurant : voir `FICHE-GOOGLE.md` — les infos prêtes à copier, les choix qui
restent à faire et les étapes de validation.

**Quand le nom de domaine arrivera**, changer l'adresse à trois endroits :
`<link rel="canonical">` dans `index.html`, la ligne `Sitemap:` dans
`public/robots.txt` et `<loc>` dans `public/sitemap.xml` — en plus de `SITE_URL`
côté Vercel.

**Avant le vrai lancement** :
- brancher le nom de domaine dans le projet Vercel, puis mettre ce domaine dans
  `SITE_URL` (site et tableau de bord) et dans Cloudflare Web Analytics ;
- compléter les `TODO-OWNER` : **mentions légales** (nom de l'exploitant, forme
  juridique, SIRET, e-mail, directeur de la publication, hébergeur).
