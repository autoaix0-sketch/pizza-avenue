# Fiche Google Business Profile — Pizza Avenue (Dax)

Pourquoi cette fiche : quand quelqu'un cherche « pizza Dax » sur son téléphone,
la carte Google s'affiche **avant** tous les sites web. Pour un restaurant, la
fiche Google amène plus de clients que le référencement du site.

À créer sur https://business.google.com (gratuit).
Compte Google à utiliser : le même que pour la Search Console.

---

## 1. À décider avant de commencer

Personne d'autre que toi ne peut répondre. Google vérifie ces infos,
et une fiche refusée est longue à débloquer.

| Question | Pourquoi c'est important |
|---|---|
| **Le nom exact écrit sur l'enseigne du magasin** : « PIZZA AVENUE » ou « AVENUE PIZZA » ? | Le nom de la fiche doit être **celui de l'enseigne**, pas un nom choisi. Les deux existent dans les fichiers du projet (voir `SITE_FACTS.md` : le logo mascotte dit « AVENUE PIZZA », les menus imprimés et l'Instagram disent « PIZZA AVENUE »). Le site utilise « Pizza Avenue ». Si l'enseigne dit autre chose, il faut corriger le site **et** la fiche. |
| Est-ce **à emporter uniquement**, ou y a-t-il des places assises ? | Google demande de cocher « Sur place » / « À emporter » / « Livraison ». Le site dit aujourd'hui « À emporter. Commande par téléphone. » |
| Y a-t-il une **livraison** (Uber Eats, Deliveroo, livreur maison) ? | Si oui, la fiche doit le dire : beaucoup de clients filtrent sur ce critère. |
| Un **email** de contact pour le restaurant ? | Optionnel sur la fiche, mais obligatoire dans les mentions légales (encore `TODO-OWNER`). |
| La **date d'ouverture** du restaurant ? | Champ facultatif. Utile si l'ouverture est récente. |

---

## 2. À copier tel quel — déjà vérifié dans le projet

| Champ Google | Valeur | D'où elle vient |
|---|---|---|
| Adresse | `75 Av. Saint-Vincent de Paul, 40100 Dax` | `src/data/site.js` |
| Téléphone | `09 66 13 03 02` | `src/data/site.js`, confirmé par le propriétaire |
| Site web | `https://pizza-avenue-dax.vercel.app/` | projet Vercel `pizza-avenue-dax` |
| Lien du menu | `https://pizza-avenue-dax.vercel.app/#menu` | la carte est sur la page d'accueil |
| Horaires | **Tous les jours** : 11:30 – 15:30 puis 18:00 – 23:30 | `public/data/hours.js`, confirmé par le propriétaire |
| Position sur la carte | 43.7161707, -1.05393 | `src/data/site.js` |
| Réservations | Non | `acceptsReservations: false` |

Dans Google, les horaires se saisissent **jour par jour**, avec deux créneaux
par jour (il faut cliquer « Ajouter des horaires » pour le deuxième service).

---

## 3. Catégories — proposition, à valider

Google demande **une** catégorie principale, puis des secondaires.

- Catégorie principale : **Pizzeria**
- Secondaires possibles : **Restaurant à emporter**, **Restaurant halal**

La catégorie principale pèse beaucoup sur les recherches où la fiche apparaît.
« Pizzeria » est le bon choix si la pizza est le produit principal — c'est le cas
(21 pizzas sur 9 catégories de la carte).

---

## 4. Attributs à cocher

Vrais d'après les fichiers du projet :

- **Halal** — confirmé (`🍕 MENU HALAL.md`, panneaux imprimés, badge du logo)
- **À emporter** — confirmé
- **Pas de réservation**

À vérifier par toi : paiement par carte, accès fauteuil roulant, wifi,
toilettes, places assises, livraison.

---

## 5. Description — brouillon à relire

750 caractères maximum. Ce brouillon n'utilise que des phrases déjà employées
par la marque (`SITE_FACTS.md`) et des faits vérifiés. **À relire avant de
l'envoyer** : c'est toi qui connais le restaurant.

> Pizza Avenue, pizzeria halal à emporter à Dax, avenue Saint-Vincent de Paul.
> Pâte fraîche préparée sur place, taille unique de 31 cm, 21 pizzas de 9 à
> 12,50 €. Également calzone, panizza, makeloub, kapsalon, tacos soufflé et
> Tex-Mex. Commande par téléphone au 09 66 13 03 02, tous les jours midi et
> soir. Des pizzas qui rassemblent toujours !

Ne pas écrire dans la description : des promotions, des prix barrés, un lien
(Google les supprime), ni le mot « meilleur ».

---

## 6. Photos

Google montre les fiches avec photos bien plus souvent. Minimum utile :

| Type | Ce qu'il faut | Disponible ?  |
|---|---|---|
| Logo | carré | oui — `public/assets/logo-compact-192.webp` |
| Photo de couverture | paysage 16:9 | oui — `public/assets/og.jpg` |
| Extérieur / enseigne | la façade, de jour | **à photographier** |
| Intérieur / comptoir | — | **à photographier** |
| Plats | 3 à 5 photos | oui — `images/` et `public/assets/food/` |

Les photos de façade sont les plus utiles : elles aident le client à trouver
la porte, et Google s'en sert pour vérifier que le commerce existe.

---

## 7. Les étapes dans Google

1. https://business.google.com → **Gérer maintenant**.
2. Chercher « Pizza Avenue Dax ». **Une fiche existe peut-être déjà** : Google
   en crée automatiquement à partir d'autres sources. Si elle existe,
   « Revendiquer cette entreprise » au lieu d'en créer une nouvelle — sinon on
   obtient deux fiches en double, et c'est pénible à corriger.
3. Catégorie, adresse, téléphone, site web, horaires (voir plus haut).
4. **Validation.** Google doit prouver que le commerce est réel : carte postale
   envoyée à l'adresse (5 à 14 jours), ou appel, SMS, ou vidéo. La carte postale
   est la plus courante en France. Il faut attendre le code : la fiche n'est
   pas visible avant.
5. Une fois validée : ajouter les photos, la description, les attributs, le
   lien du menu.

---

## 8. Après

- Demander des avis aux clients. Google donne un lien court à partager
  (« Demander des avis » dans la fiche). Les avis pèsent lourd dans le
  classement de la carte.
- Quand il y aura de vrais avis, les afficher sur le site : mettre le lien dans
  `links.googleReviews` de `src/data/site.js`. La section « Les avis » est
  masquée tant que `reviews.count` est à 0.
- Ne jamais inventer d'avis : Google supprime les fiches qui le font.
