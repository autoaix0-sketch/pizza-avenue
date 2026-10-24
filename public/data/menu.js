/* Pizza Avenue — la carte.
   Fichier écrit par le tableau de bord (avenue-pizza-admin). Le contenu est du
   JSON pur : le tableau de bord le relit tel quel. Si tu le modifies à la
   main, garde-le en JSON valide (guillemets doubles, pas de virgule finale).
   Le format de chaque champ est décrit dans README.md, « La carte ». */
window.PIZZA_AVENUE_MENU = {
  "pricesConfirmed": true,
  "tierLabels": { "fr": ["Seul", "Menu"], "es": ["Solo", "Menú"], "en": ["Only", "Meal deal"] },
  "categories": [
    {
      "id": "pizza",
      "num": "01",
      "name": "Pizzas",
      "image": "cat_pizza",
      "tagline": {
        "fr": "Pâte fraîche, taille unique 31 cm.",
        "es": "Masa fresca, tamaño único 31 cm.",
        "en": "Fresh dough, one size, 31 cm."
      },
      "groups": [
        {
          "id": "base-tomate",
          "label": { "fr": "Base tomate", "es": "Base tomate", "en": "Tomato base" },
          "items": [
            {
              "num": 1,
              "name": "Margherita",
              "price": 9,
              "note": {
                "fr": "sauce tomate, mozzarella, origan, olives",
                "es": "salsa de tomate, mozzarella, orégano, aceitunas",
                "en": "tomato sauce, mozzarella, oregano, olives"
              }
            },
            {
              "num": 2,
              "name": "Reine",
              "price": 9.5,
              "note": {
                "fr": "sauce tomate, mozzarella, jambon, champignons, olives",
                "es": "salsa de tomate, mozzarella, jamón, champiñones, aceitunas",
                "en": "tomato sauce, mozzarella, ham, mushrooms, olives"
              }
            },
            {
              "num": 3,
              "name": "3 Jambons",
              "price": 11.5,
              "note": {
                "fr": "sauce tomate, mozzarella, jambon, chorizo, bacon, olives",
                "es": "salsa de tomate, mozzarella, jamón, chorizo, bacon, aceitunas",
                "en": "tomato sauce, mozzarella, ham, chorizo, bacon, olives"
              }
            },
            {
              "num": 4,
              "name": "Américaine",
              "price": 10,
              "note": {
                "fr": "sauce tomate, mozzarella, viande hachée, poivrons, oignons, olives",
                "es": "salsa de tomate, mozzarella, carne picada, pimientos, cebolla, aceitunas",
                "en": "tomato sauce, mozzarella, minced meat, peppers, onions, olives"
              }
            },
            {
              "num": 5,
              "name": "Texane",
              "price": 11,
              "note": {
                "fr": "sauce tomate, mozzarella, poulet, poivrons, oignons, olives, sauce barbecue",
                "es": "salsa de tomate, mozzarella, pollo, pimientos, cebolla, aceitunas, salsa barbacoa",
                "en": "tomato sauce, mozzarella, chicken, peppers, onions, olives, barbecue sauce"
              }
            },
            {
              "num": 6,
              "name": "Kebab",
              "price": 11,
              "note": {
                "fr": "sauce tomate, mozzarella, viande kebab, poivrons, oignons, olives, sauce blanche",
                "es": "salsa de tomate, mozzarella, carne kebab, pimientos, cebolla, aceitunas, salsa blanca",
                "en": "tomato sauce, mozzarella, kebab meat, peppers, onions, olives, white sauce"
              }
            },
            {
              "num": 7,
              "name": "Orientale",
              "price": 11,
              "note": {
                "fr": "sauce tomate, mozzarella, merguez, œuf, poivrons, oignons, olives",
                "es": "salsa de tomate, mozzarella, merguez, huevo, pimientos, cebolla, aceitunas",
                "en": "tomato sauce, mozzarella, merguez, egg, peppers, onions, olives"
              }
            },
            {
              "num": 8,
              "name": "Végétarienne",
              "price": 9,
              "note": {
                "fr": "sauce tomate, mozzarella, champignons, poivrons, oignons, olives",
                "es": "salsa de tomate, mozzarella, champiñones, pimientos, cebolla, aceitunas",
                "en": "tomato sauce, mozzarella, mushrooms, peppers, onions, olives"
              }
            },
            {
              "num": 9,
              "name": "Fruits de mer",
              "price": 12.5,
              "note": {
                "fr": "sauce tomate, mozzarella, fruits de mer, citron",
                "es": "salsa de tomate, mozzarella, marisco, limón",
                "en": "tomato sauce, mozzarella, seafood, lemon"
              }
            },
            {
              "num": 10,
              "name": "Mexicaine",
              "price": 11,
              "note": {
                "fr": "sauce tomate, mozzarella, viande hachée, poivrons, oignons, olives",
                "es": "salsa de tomate, mozzarella, carne picada, pimientos, cebolla, aceitunas",
                "en": "tomato sauce, mozzarella, minced meat, peppers, onions, olives"
              }
            },
            {
              "num": 11,
              "name": "Barbecue",
              "price": 12,
              "note": {
                "fr": "sauce tomate, mozzarella, poulet, viande hachée, poivrons, oignons, sauce barbecue",
                "es": "salsa de tomate, mozzarella, pollo, carne picada, pimientos, cebolla, salsa barbacoa",
                "en": "tomato sauce, mozzarella, chicken, minced meat, peppers, onions, barbecue sauce"
              }
            },
            {
              "num": 12,
              "name": "Neptune",
              "price": 11,
              "note": {
                "fr": "sauce tomate, mozzarella, thon, œuf, oignons, olives",
                "es": "salsa de tomate, mozzarella, atún, huevo, cebolla, aceitunas",
                "en": "tomato sauce, mozzarella, tuna, egg, onions, olives"
              }
            }
          ]
        },
        {
          "id": "base-creme",
          "label": { "fr": "Base crème", "es": "Base nata", "en": "Cream base" },
          "items": [
            {
              "num": 13,
              "name": "4 Fromages",
              "price": 10,
              "note": {
                "fr": "crème fraîche, mozzarella, emmental, chèvre, bleu",
                "es": "nata, mozzarella, emmental, queso de cabra, queso azul",
                "en": "crème fraîche, mozzarella, emmental, goat cheese, blue cheese"
              }
            },
            {
              "num": 14,
              "name": "Boursin",
              "price": 10.5,
              "note": {
                "fr": "crème fraîche, mozzarella, poulet, Boursin",
                "es": "nata, mozzarella, pollo, Boursin",
                "en": "crème fraîche, mozzarella, chicken, Boursin"
              }
            },
            {
              "num": 15,
              "name": "Raclette",
              "price": 11,
              "note": {
                "fr": "crème fraîche, mozzarella, pommes de terre, jambon, raclette",
                "es": "nata, mozzarella, patatas, jamón, raclette",
                "en": "crème fraîche, mozzarella, potatoes, ham, raclette"
              }
            },
            {
              "num": 16,
              "name": "Fermière",
              "price": 10,
              "note": {
                "fr": "crème fraîche, mozzarella, poulet, pommes de terre, oignons",
                "es": "nata, mozzarella, pollo, patatas, cebolla",
                "en": "crème fraîche, mozzarella, chicken, potatoes, onions"
              }
            },
            {
              "num": 17,
              "name": "Chèvre miel",
              "price": 10,
              "note": {
                "fr": "crème fraîche, mozzarella, chèvre, miel",
                "es": "nata, mozzarella, queso de cabra, miel",
                "en": "crème fraîche, mozzarella, goat cheese, honey"
              }
            },
            {
              "num": 18,
              "name": "Indienne",
              "price": 10,
              "note": {
                "fr": "crème fraîche, mozzarella, poulet, curry",
                "es": "nata, mozzarella, pollo, curry",
                "en": "crème fraîche, mozzarella, chicken, curry"
              }
            },
            {
              "num": 19,
              "name": "Hawaïenne",
              "price": 10,
              "note": {
                "fr": "crème fraîche, fromage, jambon de dinde, ananas",
                "es": "nata, queso, jamón de pavo, piña",
                "en": "crème fraîche, cheese, turkey ham, pineapple"
              }
            }
          ]
        },
        {
          "id": "speciales",
          "label": { "fr": "Nos spéciales ★", "es": "Especiales ★", "en": "Our specials ★" },
          "items": [
            {
              "num": 20,
              "name": "Dacquoise",
              "price": 12.5,
              "note": {
                "fr": "sauce tomate, mozzarella, viande hachée, merguez, poivrons, oignons, œuf, olives",
                "es": "salsa de tomate, mozzarella, carne picada, merguez, pimientos, cebolla, huevo, aceitunas",
                "en": "tomato sauce, mozzarella, minced meat, merguez, peppers, onions, egg, olives"
              },
              "special": true
            },
            {
              "num": 21,
              "name": "Campagnarde",
              "price": 12.5,
              "note": {
                "fr": "crème fraîche, mozzarella, viande hachée, jambon, pommes de terre, oignons",
                "es": "nata, mozzarella, carne picada, jamón, patatas, cebolla",
                "en": "crème fraîche, mozzarella, minced meat, ham, potatoes, onions"
              },
              "special": true
            }
          ]
        }
      ],
      "extras": [
        {
          "label": { "fr": "Viande", "es": "Carne", "en": "Meat" },
          "price": 1.5
        },
        {
          "label": { "fr": "Fromage", "es": "Queso", "en": "Cheese" },
          "price": 1
        }
      ]
    },
    {
      "id": "calzone",
      "num": "02",
      "name": "Calzone",
      "image": "cat_calzone",
      "tagline": {
        "fr": "La pizza pliée, bien garnie.",
        "es": "La pizza cerrada, bien rellena.",
        "en": "The folded pizza, well filled."
      },
      "items": [
        {
          "name": "Calzone",
          "price": 11,
          "note": {
            "fr": "tomate, mozzarella, œuf, champignons + 1 viande au choix",
            "es": "tomate, mozzarella, huevo, champiñones + 1 carne a elegir",
            "en": "tomato, mozzarella, egg, mushrooms + 1 meat of your choice"
          }
        }
      ]
    },
    {
      "id": "panizza",
      "num": "03",
      "name": "Panizza",
      "tagline": {
        "fr": "Servie avec des frites.",
        "es": "Servida con patatas fritas.",
        "en": "Served with fries."
      },
      "items": [
        {
          "name": "Panizza",
          "price": 9.5,
          "note": {
            "fr": "pâte à pizza, mozzarella, avec frites",
            "es": "masa de pizza, mozzarella, con patatas",
            "en": "pizza dough, mozzarella, with fries"
          }
        }
      ],
      "choices": [
        {
          "label": { "fr": "Viande au choix", "es": "Carne a elegir", "en": "Choice of meat" },
          "options": [
            "Tenders",
            "Cordon bleu",
            { "fr": "Poulet", "es": "Pollo", "en": "Chicken" },
            "Kebab",
            "Steak",
            "Merguez"
          ]
        }
      ],
      "extras": [
        {
          "label": { "fr": "Viande", "es": "Carne", "en": "Meat" },
          "price": 2
        },
        {
          "label": { "fr": "Fromage", "es": "Queso", "en": "Cheese" },
          "price": 1
        }
      ]
    },
    {
      "id": "makeloub",
      "num": "04",
      "name": "Makeloub",
      "image": "cat_makloub",
      "tagline": {
        "fr": "Mozzarella et poivrons grillés.",
        "es": "Mozzarella y pimientos asados.",
        "en": "Mozzarella and grilled peppers."
      },
      "tierNote": {
        "fr": "Menu : avec frites et boisson.",
        "es": "Menú: con patatas y bebida.",
        "en": "Meal deal: with fries and a drink."
      },
      "items": [
        {
          "name": "Makeloub",
          "tiers": [9, 10],
          "note": {
            "fr": "mozzarella, poivrons grillés",
            "es": "mozzarella, pimientos asados",
            "en": "mozzarella, grilled peppers"
          }
        }
      ],
      "choices": [
        {
          "label": { "fr": "Viande au choix", "es": "Carne a elegir", "en": "Choice of meat" },
          "options": [
            { "fr": "Poulet", "es": "Pollo", "en": "Chicken" },
            "Kebab",
            { "fr": "Crispy (tenders)", "es": "Crispy (tenders)", "en": "Crispy (tenders)" },
            "Cordon bleu"
          ]
        }
      ]
    },
    {
      "id": "kapsalon",
      "num": "05",
      "name": "Kapsalon",
      "image": "cat_kapsalon",
      "tagline": {
        "fr": "Gratiné au four façon pizza.",
        "es": "Gratinado al horno como una pizza.",
        "en": "Baked in the oven, pizza style."
      },
      "tierNote": {
        "fr": "Menu : avec une boisson.",
        "es": "Menú: con una bebida.",
        "en": "Meal deal: with a drink."
      },
      "items": [
        {
          "name": "Classic",
          "tiers": [8.5, 10],
          "note": {
            "fr": "frites, mozzarella, salade, tomates, sauce au choix",
            "es": "patatas, mozzarella, ensalada, tomates, salsa a elegir",
            "en": "fries, mozzarella, salad, tomatoes, sauce of your choice"
          }
        },
        {
          "name": { "fr": "Géant", "es": "Gigante", "en": "Giant" },
          "tiers": [10, 12],
          "note": {
            "fr": "frites, mozzarella, salade, tomates, sauce au choix",
            "es": "patatas, mozzarella, ensalada, tomates, salsa a elegir",
            "en": "fries, mozzarella, salad, tomatoes, sauce of your choice"
          }
        }
      ],
      "choices": [
        {
          "label": { "fr": "Viande au choix", "es": "Carne a elegir", "en": "Choice of meat" },
          "options": [
            "Kebab",
            { "fr": "Poulet", "es": "Pollo", "en": "Chicken" },
            "Tenders",
            "Cordon bleu",
            "Steak"
          ]
        }
      ]
    },
    {
      "id": "tacos-souffle",
      "num": "06",
      "name": "Tacos soufflé",
      "tagline": {
        "fr": "Pâte à pizza soufflée, bien fourrée.",
        "es": "Masa de pizza inflada, bien rellena.",
        "en": "Puffed pizza dough, generously filled."
      },
      "tierNote": {
        "fr": "Menu : avec une boisson.",
        "es": "Menú: con una bebida.",
        "en": "Meal deal: with a drink."
      },
      "items": [
        {
          "name": "Tacos soufflé",
          "tiers": [7.5, 10],
          "note": {
            "fr": "pâte à pizza, frites, sauce fromagère, mozzarella, sauce au choix",
            "es": "masa de pizza, patatas, salsa de queso, mozzarella, salsa a elegir",
            "en": "pizza dough, fries, cheese sauce, mozzarella, sauce of your choice"
          }
        }
      ],
      "choices": [
        {
          "label": { "fr": "Viande au choix", "es": "Carne a elegir", "en": "Choice of meat" },
          "options": [
            "Kebab",
            { "fr": "Poulet", "es": "Pollo", "en": "Chicken" },
            "Tenders",
            "Cordon bleu",
            "Steak"
          ]
        }
      ]
    },
    {
      "id": "texmex",
      "num": "07",
      "name": "Tex-Mex",
      "image": "cat_texmex",
      "tagline": { "fr": "5 € la portion.", "es": "5 € la ración.", "en": "€5 a portion." },
      "items": [
        {
          "name": "Tenders",
          "price": 5,
          "note": { "fr": "4 pièces", "es": "4 piezas", "en": "4 pieces" }
        },
        {
          "name": "Jalapeños",
          "price": 5,
          "note": { "fr": "6 pièces", "es": "6 piezas", "en": "6 pieces" }
        },
        {
          "name": "Nuggets",
          "price": 5,
          "note": { "fr": "6 pièces", "es": "6 piezas", "en": "6 pieces" }
        },
        {
          "name": "Mozzasticks",
          "price": 5,
          "note": { "fr": "6 pièces", "es": "6 piezas", "en": "6 pieces" }
        },
        {
          "name": {
            "fr": "Bouchées au camembert",
            "es": "Bocaditos de camembert",
            "en": "Camembert bites"
          },
          "price": 5,
          "note": { "fr": "6 pièces", "es": "6 piezas", "en": "6 pieces" }
        }
      ]
    },
    {
      "id": "desserts",
      "num": "08",
      "name": "Desserts",
      "tagline": { "fr": "La note sucrée.", "es": "La nota dulce.", "en": "The sweet note." },
      "items": [
        {
          "name": "Tiramisu",
          "price": 3,
          "note": {
            "fr": "Oreo · Spéculoos · Cookies",
            "es": "Oreo · Speculoos · Cookies",
            "en": "Oreo · Speculoos · Cookies"
          }
        },
        { "name": "Tarte au Daim", "price": 3 }
      ]
    },
    {
      "id": "boissons",
      "num": "09",
      "name": { "fr": "Boissons", "es": "Bebidas", "en": "Drinks" },
      "tagline": { "fr": "Bien fraîches.", "es": "Bien frías.", "en": "Nice and cold." },
      "items": [
        {
          "name": { "fr": "Canette 33 cl", "es": "Lata 33 cl", "en": "Can 33 cl" },
          "price": 1.5
        },
        {
          "name": { "fr": "Bouteille gazeuse", "es": "Botella con gas", "en": "Fizzy bottle" },
          "price": 3
        },
        {
          "name": {
            "fr": "Petite bouteille d’eau",
            "es": "Botella de agua pequeña",
            "en": "Small bottle of water"
          },
          "price": 1
        },
        {
          "name": {
            "fr": "Grande bouteille d’eau",
            "es": "Botella de agua grande",
            "en": "Large bottle of water"
          },
          "price": 2
        }
      ]
    }
  ]
};
