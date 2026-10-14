/* =========================================================================
   PIZZA AVENUE — LA CARTE (menu halal, Dax)
   =========================================================================

   Le seul fichier à modifier pour changer un plat ou un prix : la carte ET
   les affiches « Les formules » le lisent toutes les deux.

   Source : sites/PIZZA AVENUE_V2/AVENUE_PIZZA_LIBRARY/10_WEBSITE_BUILD_READY/
   00_content/menu-halal_structured.json (vérifié contre le panneau imprimé).
   Taille unique : un seul prix par plat. Aucun prix inventé.

   Format :
     { num: 1, name: 'Margherita', price: 8, note: {fr, es, en}, special: true }
       num      numéro du plat en boutique (les clients commandent par numéro)
       special  ajoute l'étoile ★ des « spéciales »
     groups     (pizzas) : sous-listes avec un sélecteur Base tomate / crème…
     choices    « viande au choix » / « base au choix », affichées en pastilles
     extras     suppléments de la catégorie, affichés « + 2,00 € »

   IMAGES — `image:` est une clé du manifeste (images/<clé>.png). Pas de
   photo correcte pour Panizza, Desserts, Boissons (M21, M23, M24) : la
   ligne affiche alors une icône à la place.
   ========================================================================= */

const T = (fr, es, en) => ({ fr, es, en });

window.PIZZA_AVENUE_MENU = {
  categories: [
    {
      id: 'pizza',
      num: '01',
      name: 'Pizzas',
      image: 'cat_pizza',
      tagline: T('Pâte fraîche, taille unique.', 'Masa fresca, tamaño único.', 'Fresh dough, one size.'),
      groups: [
        {
          id: 'base-tomate',
          label: T('Base tomate', 'Base tomate', 'Tomato base'),
          items: [
            { num: 1, name: 'Margherita', price: 8.0, note: T('tomate, mozzarella, origan', 'tomate, mozzarella, orégano', 'tomato, mozzarella, oregano') },
            { num: 2, name: 'Reine', price: 9.0, note: T('tomate, mozzarella, jambon, champignons', 'tomate, mozzarella, jamón, champiñones', 'tomato, mozzarella, ham, mushrooms') },
            { num: 3, name: '3 Jambons', price: 10.0, note: T('tomate, mozzarella, jambon, chorizo, bacon', 'tomate, mozzarella, jamón, chorizo, bacon', 'tomato, mozzarella, ham, chorizo, bacon') },
            { num: 4, name: 'Américaine', price: 10.0, note: T('tomate, mozzarella, viande hachée, poivrons, oignons', 'tomate, mozzarella, carne picada, pimientos, cebolla', 'tomato, mozzarella, minced beef, peppers, onions') },
            { num: 5, name: 'Texane', price: 11.0, note: T('tomate, mozzarella, poulet, poivrons, oignons, sauce barbecue', 'tomate, mozzarella, pollo, pimientos, cebolla, salsa barbacoa', 'tomato, mozzarella, chicken, peppers, onions, barbecue sauce') },
            { num: 6, name: 'Kebab', price: 11.0, note: T('tomate, mozzarella, viande kebab, oignons, poivrons, sauce blanche', 'tomate, mozzarella, carne kebab, cebolla, pimientos, salsa blanca', 'tomato, mozzarella, kebab meat, onions, peppers, white sauce') },
            { num: 7, name: 'Orientale', price: 11.0, note: T('tomate, mozzarella, merguez, poivrons, oignons, olives', 'tomate, mozzarella, merguez, pimientos, cebolla, aceitunas', 'tomato, mozzarella, merguez, peppers, onions, olives') },
            { num: 8, name: 'Végétarienne', price: 9.0, note: T('tomate, mozzarella, champignons, poivrons, oignons, olives', 'tomate, mozzarella, champiñones, pimientos, cebolla, aceitunas', 'tomato, mozzarella, mushrooms, peppers, onions, olives') },
            { num: 9, name: 'Fruits de mer', price: 12.0, note: T('tomate, mozzarella, fruits de mer, persillade', 'tomate, mozzarella, marisco, ajo y perejil', 'tomato, mozzarella, seafood, garlic and parsley') },
            { num: 10, name: 'Mexicaine', price: 11.0, note: T('tomate, mozzarella, viande hachée, poivrons, oignons, sauce piquante', 'tomate, mozzarella, carne picada, pimientos, cebolla, salsa picante', 'tomato, mozzarella, minced beef, peppers, onions, hot sauce') },
            { num: 11, name: 'Barbecue', price: 11.0, note: T('tomate, mozzarella, poulet, viande hachée, poivrons, sauce barbecue', 'tomate, mozzarella, pollo, carne picada, pimientos, salsa barbacoa', 'tomato, mozzarella, chicken, minced beef, peppers, barbecue sauce') },
            { num: 12, name: 'Neptune', price: 11.0, note: T('tomate, mozzarella, thon, œuf, oignons, olives', 'tomate, mozzarella, atún, huevo, cebolla, aceitunas', 'tomato, mozzarella, tuna, egg, onions, olives') }
          ]
        },
        {
          id: 'base-creme',
          label: T('Base crème', 'Base nata', 'Cream base'),
          items: [
            { num: 13, name: '4 Fromages', price: 10.0, note: T('crème fraîche, mozzarella, emmental, chèvre, bleu', 'nata, mozzarella, emmental, queso de cabra, queso azul', 'crème fraîche, mozzarella, emmental, goat cheese, blue cheese') },
            { num: 14, name: 'Boursin', price: 10.0, note: T('crème fraîche, mozzarella, poulet, Boursin', 'nata, mozzarella, pollo, Boursin', 'crème fraîche, mozzarella, chicken, Boursin') },
            { num: 15, name: 'Raclette', price: 11.0, note: T('crème fraîche, mozzarella, pommes de terre, jambon, raclette', 'nata, mozzarella, patatas, jamón, raclette', 'crème fraîche, mozzarella, potatoes, ham, raclette') },
            { num: 16, name: 'Fermière', price: 10.0, note: T('crème fraîche, mozzarella, poulet, pommes de terre, oignons', 'nata, mozzarella, pollo, patatas, cebolla', 'crème fraîche, mozzarella, chicken, potatoes, onions') },
            { num: 17, name: 'Chèvre miel', price: 10.0, note: T('crème fraîche, mozzarella, chèvre, miel', 'nata, mozzarella, queso de cabra, miel', 'crème fraîche, mozzarella, goat cheese, honey') },
            { num: 18, name: 'Indienne', price: 10.0, note: T('crème fraîche, mozzarella, poulet curry, poivrons, oignons', 'nata, mozzarella, pollo al curry, pimientos, cebolla', 'crème fraîche, mozzarella, curry chicken, peppers, onions') }
          ]
        },
        {
          id: 'speciales',
          label: T('Nos spéciales ★', 'Especiales ★', 'Our specials ★'),
          items: [
            { num: 19, name: 'Dax-oise', price: 12.0, special: true, note: T('tomate, mozzarella, viande hachée, merguez, poivrons, oignons, œuf', 'tomate, mozzarella, carne picada, merguez, pimientos, cebolla, huevo', 'tomato, mozzarella, minced beef, merguez, peppers, onions, egg') },
            { num: 20, name: 'Campagnarde', price: 12.0, special: true, note: T('crème fraîche, mozzarella, viande hachée, pommes de terre, oignons', 'nata, mozzarella, carne picada, patatas, cebolla', 'crème fraîche, mozzarella, minced beef, potatoes, onions') }
          ]
        }
      ]
    },

    {
      id: 'calzone',
      num: '02',
      name: 'Calzone',
      image: 'cat_calzone',
      tagline: T('La pizza pliée, bien garnie.', 'La pizza cerrada, bien rellena.', 'The folded pizza, well filled.'),
      items: [
        { name: 'Calzone', price: 11.0, note: T('tomate, mozzarella, jambon, champignons, œuf', 'tomate, mozzarella, jamón, champiñones, huevo', 'tomato, mozzarella, ham, mushrooms, egg') }
      ]
    },

    {
      id: 'panizza',
      num: '03',
      name: 'Panizza',
      image: 'cat_panizza',
      tagline: T('Base au choix, viande au choix.', 'Base a elegir, carne a elegir.', 'Your base, your meat.'),
      items: [
        { name: 'Panizza', price: 9.5 }
      ],
      choices: [
        { label: T('Base au choix', 'Base a elegir', 'Choice of base'), options: [T('sauce tomate', 'salsa de tomate', 'tomato sauce'), T('crème fraîche', 'nata', 'crème fraîche')] },
        { label: T('Viande au choix', 'Carne a elegir', 'Choice of meat'), options: [T('Poulet curry', 'Pollo al curry', 'Curry chicken'), 'Tenders', 'Cordon bleu', 'Steak'] }
      ],
      extras: [
        { label: T('Formule frites + boisson', 'Menú patatas + bebida', 'Fries + drink meal'), price: 2.0 }
      ]
    },

    {
      id: 'makloub',
      num: '04',
      name: 'Makloub',
      image: 'cat_makloub',
      tagline: T('Mozzarella et poivrons grillés.', 'Mozzarella y pimientos asados.', 'Mozzarella and grilled peppers.'),
      items: [
        { name: 'Makloub', price: 9.0, note: T('mozzarella, poivrons grillés', 'mozzarella, pimientos asados', 'mozzarella, grilled peppers') }
      ],
      choices: [
        { label: T('Viande au choix', 'Carne a elegir', 'Choice of meat'), options: [T('Poulet curry', 'Pollo al curry', 'Curry chicken'), 'Kebab', 'Tenders', 'Cordon bleu', 'Steak'] }
      ],
      extras: [
        { label: T('Formule frites + boisson', 'Menú patatas + bebida', 'Fries + drink meal'), price: 2.0 },
        { label: T('Boisson 33 cl', 'Bebida 33 cl', 'Drink 33 cl'), price: 1.5 },
        { label: T('Frites', 'Patatas fritas', 'Fries'), price: 1.0 }
      ]
    },

    {
      id: 'kapsalon',
      num: '05',
      name: 'Kapsalon',
      image: 'cat_kapsalon',
      tagline: T('Gratiné au four façon pizza.', 'Gratinado al horno como una pizza.', 'Baked in the oven, pizza style.'),
      items: [
        { name: 'Kapsalon', price: 8.5 },
        { name: T('Kapsalon + boisson', 'Kapsalon + bebida', 'Kapsalon + drink'), price: 10.0 }
      ],
      choices: [
        { label: T('Viande au choix', 'Carne a elegir', 'Choice of meat'), options: ['Kebab', 'Tenders', 'Cordon bleu', 'Steak'] }
      ]
    },

    {
      id: 'texmex',
      num: '06',
      name: 'Tex-Mex',
      image: 'cat_texmex',
      tagline: T('5 € la portion.', '5 € la ración.', '€5 a portion.'),
      items: [
        { name: 'Tenders', price: 5.0, note: T('4 pièces', '4 piezas', '4 pieces') },
        { name: 'Jalapeños', price: 5.0, note: T('6 pièces', '6 piezas', '6 pieces') },
        { name: 'Nuggets', price: 5.0, note: T('6 pièces', '6 piezas', '6 pieces') },
        { name: 'Mozzasticks', price: 5.0, note: T('6 pièces', '6 piezas', '6 pieces') },
        { name: 'Bouchées au camembert', price: 5.0, note: T('6 pièces', '6 piezas', '6 pieces') }
      ]
    },

    {
      id: 'desserts',
      num: '07',
      name: 'Desserts',
      image: 'cat_desserts',
      tagline: T('Pour finir en douceur.', 'Para terminar con algo dulce.', 'A sweet finish.'),
      items: [
        { name: 'Tiramisu', price: 3.0 },
        { name: 'Tarte au Daim', price: 3.0 }
      ]
    },

    {
      id: 'boissons',
      num: '08',
      name: T('Boissons', 'Bebidas', 'Drinks'),
      image: 'cat_boissons',
      tagline: T('Bien fraîches.', 'Bien frías.', 'Nice and cold.'),
      items: [
        { name: T('Canette', 'Lata', 'Can'), price: 1.5 },
        { name: T('Bouteille', 'Botella', 'Bottle'), price: 3.0 }
      ]
    }
  ],

  /* LES FORMULES — les affiches de la section « Les formules ».
     Seulement les offres réelles du menu (aucune formule inventée).

     theme   forest | tomato | gold | cream : le fond de l'affiche
     title   deux lignes séparées par « | » ; le mot entre *étoiles* passe en script
     price   le prix affiché dans la pastille ; plus: true l'écrit « +2 € »
     shots   photos posées : image = clé du manifeste ; x / y = centre en % ;
             w = largeur en % ; r = rotation. Une photo absente est sautée. */
  combos: [
    {
      id: 'formule',
      theme: 'forest',
      eyebrow: T('Formule', 'Menú', 'Meal deal'),
      title: T('Frites + boisson,|*pour 2 € de plus.*', 'Patatas + bebida,|*por 2 € más.*', 'Fries + drink,|*for €2 more.*'),
      includes: T('Avec une Panizza ou un Makloub : frites + boisson pour 2 € de plus.', 'Con una Panizza o un Makloub: patatas + bebida por 2 € más.', 'With a Panizza or a Makloub: fries + drink for €2 more.'),
      price: 2,
      plus: true,
      shots: [
        { image: 'cat_makloub', x: 44, y: 62, w: 70, r: -6 },
        { image: 'side_fries', x: 82, y: 66, w: 32, r: 10 }
      ]
    },
    {
      id: 'kapsalon',
      theme: 'tomato',
      eyebrow: T('Kapsalon + boisson', 'Kapsalon + bebida', 'Kapsalon + drink'),
      title: T('Le kapsalon,|*gratiné au four.*', 'El kapsalon,|*gratinado al horno.*', 'The kapsalon,|*oven-baked.*'),
      includes: T('Kapsalon, viande au choix, + une boisson.', 'Kapsalon, carne a elegir, + una bebida.', 'Kapsalon, meat of your choice, + a drink.'),
      price: 10,
      shots: [
        { image: 'cat_kapsalon', x: 48, y: 62, w: 78, r: -4 }
      ]
    }
  ]
};
