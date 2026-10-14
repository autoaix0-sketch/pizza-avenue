/* =========================================================================
   PIZZA AVENUE — LA CARTE
   =========================================================================

   C'est le seul fichier à modifier pour changer un plat ou un prix : la
   carte ET les affiches « Les formules » le lisent toutes les deux.

   Format repris de la structure qui a fait ses preuves (Taco Naan) :

     { name: 'Tacos Simple', tiers: [8, 9.5, 11] }
       -> trois colonnes de prix (voir tierLabels par catégorie)
     { name: 'Margherita', tiers: [11, 16] }
       -> deux colonnes (une catégorie peut redéfinir ses propres tierLabels)
     { name: 'Canette 33 cl', price: 1.5 }
       -> un seul prix

   IMAGES — chaque catégorie pointe vers une clé du manifeste (`image:`),
   c'est-à-dire vers un fichier images/<clé>.png. Les listes de prix n'ont
   volontairement pas de vignette par plat : elles restent typographiques.

   NOTE PRIX — Pizza Avenue est une marque concept : pizzas, burgers et
   tacos reprennent des fourchettes de prix courantes en fast-food premium
   français, À CONFIRMER par le propriétaire avant mise en ligne. Les prix
   Tex-Mex, eux, sont recopiés tels quels du panneau comptoir fourni
   (images/raw/_unusable/all tex mex.jpg) — ce sont donc déjà des prix réels.
   ========================================================================= */

window.PIZZA_AVENUE_MENU = {
  tierLabels: {
    fr: ['Seul', '+ Frite', '+ Menu'],
    es: ['Solo', '+ Patatas', '+ Menú'],
    en: ['Only', '+ Fries', '+ Meal']
  },

  tierNote: {
    fr: 'Le menu comprend les frites maison et une boisson 33 cl.',
    es: 'El menú incluye patatas caseras y una bebida de 33 cl.',
    en: 'The meal deal includes house fries and a 33 cl drink.'
  },

  categories: [
    {
      id: 'pizza',
      num: '01',
      name: 'Pizza',
      image: 'cat_pizza',
      tagline: {
        fr: 'Pâte pétrie ici, cuite au four à sole.',
        es: 'Masa amasada aquí, cocida en horno de piedra.',
        en: 'Dough kneaded here, baked on the stone.'
      },
      tierLabels: {
        fr: ['Sénior · 30 cm', 'Familiale · 40 cm'],
        es: ['Individual · 30 cm', 'Familiar · 40 cm'],
        en: ['Personal · 30 cm', 'Family · 40 cm']
      },
      tiersOnly: [0, 1],
      items: [
        {
          name: 'Margherita', tiers: [11.0, 16.0],
          note: { fr: 'tomate, mozzarella, basilic frais', es: 'tomate, mozzarella, albahaca fresca', en: 'tomato, mozzarella, fresh basil' }
        },
        {
          name: 'Pepperoni Avenue', tiers: [13.0, 18.0],
          note: { fr: 'pepperoni, mozzarella, origan', es: 'pepperoni, mozzarella, orégano', en: 'pepperoni, mozzarella, oregano' }
        },
        {
          name: 'Reine', tiers: [13.0, 18.0],
          note: { fr: 'jambon, champignons, mozzarella', es: 'jamón, champiñones, mozzarella', en: 'ham, mushrooms, mozzarella' }
        },
        {
          name: '4 Fromages', tiers: [14.0, 19.0],
          note: { fr: 'mozzarella, chèvre, gorgonzola, emmental', es: 'mozzarella, cabra, gorgonzola, emmental', en: 'mozzarella, goat, gorgonzola, emmental' }
        },
        {
          name: 'Végétale', tiers: [13.0, 18.0],
          note: { fr: 'poivrons, oignons rouges, olives, champignons', es: 'pimientos, cebolla roja, aceitunas, champiñones', en: 'peppers, red onion, olives, mushrooms' }
        },
        {
          name: 'Poulet Avenue', tiers: [14.0, 19.0],
          note: { fr: 'poulet mariné, poivrons, champignons, olives, mozzarella', es: 'pollo marinado, pimientos, champiñones, aceitunas, mozzarella', en: 'marinated chicken, peppers, mushrooms, olives, mozzarella' }
        }
      ]
    },

    {
      id: 'burgers',
      num: '02',
      name: 'Burgers',
      image: 'cat_burger',
      tiersOnly: [0, 2],
      tagline: {
        fr: 'Steak saisi à la commande, jamais avant.',
        es: 'Carne a la plancha al momento, nunca antes.',
        en: 'Patty seared to order, never before.'
      },
      items: [
        {
          name: 'Cheese Burger', tiers: [6.5, null, 9.5],
          note: { fr: 'steak, cheddar, pickles, sauce maison', es: 'carne, cheddar, pepinillos, salsa casera', en: 'patty, cheddar, pickles, house sauce' }
        },
        {
          name: 'Double Cheese', tiers: [7.5, null, 10.5],
          note: { fr: 'deux steaks, deux cheddars', es: 'dos carnes, dos cheddar', en: 'two patties, two cheddar' }
        },
        {
          name: 'Chicken Burger', tiers: [7.5, null, 10.5],
          note: { fr: 'poulet pané, salade, sauce blanche', es: 'pollo empanado, lechuga, salsa blanca', en: 'crispy chicken, lettuce, white sauce' }
        },
        {
          name: 'Big Burger', tiers: [9.5, null, 12.5],
          note: { fr: 'double steak, cheddar, oignons, salade, tomate', es: 'doble carne, cheddar, cebolla, lechuga, tomate', en: 'double patty, cheddar, onion, lettuce, tomato' }
        },
        {
          name: 'Supreme Burger', tiers: [10.5, null, 13.5],
          note: { fr: 'double steak, cheddar, bacon, œuf', es: 'doble carne, cheddar, bacon, huevo', en: 'double patty, cheddar, bacon, egg' }
        },
        {
          name: 'Double Chicken', tiers: [10.5, null, 13.5],
          note: { fr: 'deux poulets panés, cheddar, sauce maison', es: 'dos pollos empanados, cheddar, salsa casera', en: 'two crispy chicken fillets, cheddar, house sauce' }
        }
      ]
    },

    {
      id: 'tacos',
      num: '03',
      name: 'Tacos',
      image: 'cat_tacos',
      tagline: {
        fr: 'Galette pressée au grill, sauce fromagère maison.',
        es: 'Tortilla prensada a la plancha, salsa de queso casera.',
        en: 'Griddle-pressed, house cheese sauce.'
      },
      items: [
        { name: 'Tacos Simple', tiers: [8.0, 9.5, 11.0], note: { fr: '1 viande, frites, sauce fromagère', es: '1 carne, patatas, salsa de queso', en: '1 meat, fries, cheese sauce' } },
        { name: 'Tacos Double', tiers: [10.0, 11.5, 13.0], note: { fr: '2 viandes, frites, sauce fromagère', es: '2 carnes, patatas, salsa de queso', en: '2 meats, fries, cheese sauce' } },
        { name: 'Tacos Triple', tiers: [13.0, 14.5, 16.0], note: { fr: '3 viandes, frites, sauce fromagère', es: '3 carnes, patatas, salsa de queso', en: '3 meats, fries, cheese sauce' } }
      ]
    },

    {
      id: 'texmex',
      num: '04',
      name: 'Tex-Mex',
      image: 'cat_texmex',
      tiersOnly: [0, 2],
      tagline: {
        fr: 'À picorer, à partager, ou pas.',
        es: 'Para picar, para compartir, o no.',
        en: 'To pick at, to share, or not.'
      },
      items: [
        { name: 'Nuggets', tiers: [5.0, null, 7.0] },
        { name: 'Mozza Sticks', tiers: [5.0, null, 7.0] },
        {
          name: 'Bouchées Camembert', tiers: [5.0, null, 7.0],
          note: { fr: 'panées maison, cœur coulant', es: 'empanados caseros, corazón fundido', en: 'house-breaded, molten centre' }
        },
        { name: 'Jalapeños', tiers: [5.0, null, 7.0] },
        { name: 'Tenders', tiers: [5.0, null, 7.0] },
        { name: 'Wings', tiers: [6.0, null, 8.0] }
      ]
    }
  ],

  /* LES FORMULES — les affiches de la section « Les formules ».

     theme   forest | tomato | gold | cream : le fond de l'affiche
     title   deux lignes séparées par « | » ; le mot entre *étoiles* passe en
             script (la signature de la marque), comme sur le brand board
     shots   les photos posées sur l'affiche. image = clé du manifeste ;
             x / y = centre en % de l'affiche ; w = largeur en % ; r = rotation.
             Une photo absente du manifeste est simplement sautée.

     PRIX À CONFIRMER par le propriétaire. « Menu Supreme » et « Tacos XL »
     reprennent le prix + Menu de la carte ; « Le Duo » et « La Tablée » sont
     de nouvelles formules, moins chères que la somme de leurs plats. */
  combos: [
    {
      id: 'duo',
      theme: 'forest',
      eyebrow: { fr: 'Formule Duo', es: 'Fórmula Dúo', en: 'Duo deal' },
      title: { fr: 'Deux pizzas,|*une soirée.*', es: 'Dos pizzas,|*una noche.*', en: 'Two pizzas,|*one night in.*' },
      includes: { fr: '2 pizzas Sénior au choix · 2 boissons 33 cl', es: '2 pizzas individuales a elegir · 2 bebidas 33 cl', en: '2 personal pizzas of your choice · 2 drinks 33 cl' },
      price: 25,
      shots: [
        { image: 'hero_pizza', x: 34, y: 61, w: 62, r: -14 },
        { image: 'cat_pizza', x: 72, y: 67, w: 50, r: 18 },
        { image: 'drink_cup', x: 86, y: 62, w: 12, r: 8 }
      ]
    },
    {
      id: 'burger',
      theme: 'tomato',
      eyebrow: { fr: 'Menu Supreme', es: 'Menú Supreme', en: 'Supreme meal' },
      title: { fr: 'Le burger|*qui fait tout.*', es: 'La burger|*que lo tiene todo.*', en: 'The burger|*that does it all.*' },
      includes: { fr: 'Supreme Burger · frites maison · boisson 33 cl', es: 'Supreme Burger · patatas caseras · bebida 33 cl', en: 'Supreme Burger · house fries · 33 cl drink' },
      price: 13.5,
      shots: [
        { image: 'side_fries', x: 80, y: 64, w: 34, r: 10 },
        { image: 'sig_burger', x: 42, y: 62, w: 66, r: -3 },
        { image: 'drink_cup', x: 90, y: 58, w: 11, r: 10 }
      ]
    },
    {
      id: 'tacos',
      theme: 'gold',
      eyebrow: { fr: 'Tacos XL', es: 'Tacos XL', en: 'Tacos XL' },
      title: { fr: 'Trois viandes,|*zéro compromis.*', es: 'Tres carnes,|*cero excusas.*', en: 'Three meats,|*no compromise.*' },
      includes: { fr: 'Tacos Triple · frites maison · boisson 33 cl', es: 'Tacos Triple · patatas caseras · bebida 33 cl', en: 'Tacos Triple · house fries · 33 cl drink' },
      price: 16,
      shots: [
        { image: 'side_fries', x: 80, y: 66, w: 30, r: -8 },
        { image: 'sig_tacos', x: 42, y: 62, w: 70, r: -6 },
        { image: 'drink_cup', x: 90, y: 58, w: 11, r: -8 }
      ]
    },
    {
      id: 'tablee',
      theme: 'cream',
      eyebrow: { fr: 'La Tablée', es: 'La Mesa', en: 'The Table' },
      title: { fr: 'Pour quatre,|*à partager.*', es: 'Para cuatro,|*para compartir.*', en: 'For four,|*made to share.*' },
      includes: { fr: '2 pizzas Familiales · 1 box Tex-Mex 12 pièces · 1 bouteille 1,5 L', es: '2 pizzas familiares · 1 caja Tex-Mex 12 piezas · 1 botella 1,5 L', en: '2 family pizzas · 1 Tex-Mex box (12 pieces) · 1 × 1.5 L bottle' },
      price: 45,
      shots: [
        { image: 'sig_pizza', x: 30, y: 58, w: 54, r: -10 },
        { image: 'cat_pizza', x: 72, y: 55, w: 48, r: 14 },
        { image: 'cat_texmex', x: 55, y: 74, w: 44, r: -4 }
      ]
    }
  ],

  /* Ce qui accompagne — une liste, pas une 5e catégorie, et sans photos. */
  extras: {
    title: { fr: 'À côté', es: 'Para acompañar', en: 'On the side' },
    items: [
      { name: 'Tiramisu', price: 4.0 },
      { name: 'Tarte du jour', price: 4.0 },
      { name: 'Hawaï Tropical 33 cl', price: 2.5 },
      { name: 'Coca-Cola · Zero 33 cl', price: 2.0 },
      { name: 'Pepsi 33 cl', price: 2.0 },
      { name: 'Lipton Ice Tea 33 cl', price: 2.0 }
    ]
  }
};
