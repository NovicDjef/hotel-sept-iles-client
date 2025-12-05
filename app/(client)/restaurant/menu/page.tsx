'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  UtensilsCrossed,
  Leaf,
  Flame,
  Coffee,
  Wine,
  IceCream,
  Fish,
  ChefHat
} from 'lucide-react'

export default function RestaurantMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('entrees')

  const categories = [
    { id: 'entrees', name: 'Entrées', icon: UtensilsCrossed },
    { id: 'plats', name: 'Plats principaux', icon: ChefHat },
    { id: 'poissons', name: 'Poissons & Fruits de mer', icon: Fish },
    { id: 'desserts', name: 'Desserts', icon: IceCream },
    { id: 'boissons', name: 'Boissons', icon: Coffee },
    { id: 'vins', name: 'Carte des vins', icon: Wine }
  ]

  const menuItems = {
    entrees: [
      {
        name: 'Tartare de saumon de la Côte-Nord',
        description: 'Saumon frais coupé au couteau, avocat, câpres, échalotes et citron',
        price: 18,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Soupe de homard',
        description: 'Bisque crémeuse au homard local, croûtons maison et crème fraîche',
        price: 15,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Salade du chef',
        description: 'Mesclun de laitues, fromage de chèvre, noix de Grenoble, vinaigrette à l\'érable',
        price: 12,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Foie gras poêlé',
        description: 'Accompagné de chutney aux fruits, pain brioché grillé',
        price: 22,
        vegetarian: false,
        spicy: false,
        signature: false
      }
    ],
    plats: [
      {
        name: 'Filet mignon de bœuf AAA',
        description: 'Sauce au poivre vert, légumes de saison et pommes de terre rôties',
        price: 42,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Magret de canard',
        description: 'Sauce aux bleuets sauvages, purée de patates douces et asperges',
        price: 38,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Côtelettes d\'agneau',
        description: 'Croûte aux herbes, jus à l\'ail rôti, légumes grillés',
        price: 45,
        vegetarian: false,
        spicy: false,
        signature: false
      },
      {
        name: 'Risotto aux champignons sauvages',
        description: 'Champignons forestiers, parmesan, truffe et roquette',
        price: 28,
        vegetarian: true,
        spicy: false,
        signature: false
      }
    ],
    poissons: [
      {
        name: 'Pavé de flétan de l\'Atlantique',
        description: 'Beurre blanc citronné, légumes verts croquants et riz basmati',
        price: 40,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Pétoncles poêlés',
        description: 'Purée de céleri-rave, réduction de vin blanc et pesto',
        price: 44,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Homard entier',
        description: 'Grillé au beurre à l\'ail, accompagné de légumes et pommes de terre',
        price: 58,
        vegetarian: false,
        spicy: false,
        signature: true
      },
      {
        name: 'Saumon grillé à l\'érable',
        description: 'Glaçage à l\'érable et soja, légumes sautés et quinoa',
        price: 36,
        vegetarian: false,
        spicy: false,
        signature: false
      }
    ],
    desserts: [
      {
        name: 'Tarte au sucre',
        description: 'Recette traditionnelle québécoise, crème glacée à la vanille',
        price: 10,
        vegetarian: true,
        spicy: false,
        signature: true
      },
      {
        name: 'Crème brûlée',
        description: 'Vanille de Madagascar, croûte caramélisée, fruits frais',
        price: 11,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Fondant au chocolat',
        description: 'Cœur coulant, glace à la vanille et coulis de fruits rouges',
        price: 12,
        vegetarian: true,
        spicy: false,
        signature: true
      },
      {
        name: 'Tarte aux bleuets sauvages',
        description: 'Bleuets de la Côte-Nord, crème chantilly maison',
        price: 11,
        vegetarian: true,
        spicy: false,
        signature: true
      }
    ],
    boissons: [
      {
        name: 'Café espresso',
        description: 'Simple ou double',
        price: 4,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Cappuccino / Latte',
        description: 'Lait mousseux, café espresso',
        price: 5,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Thé premium',
        description: 'Sélection de thés fins (noir, vert, tisane)',
        price: 4,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Jus fraîchement pressés',
        description: 'Orange, pomme, canneberge',
        price: 6,
        vegetarian: true,
        spicy: false,
        signature: false
      }
    ],
    vins: [
      {
        name: 'Vin rouge - Bordeaux AOC',
        description: 'France - Corps moyen, tanins souples',
        price: 52,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Vin blanc - Chablis',
        description: 'France - Sec, minéral, notes d\'agrumes',
        price: 48,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Vin rosé - Provence',
        description: 'France - Frais, fruité, parfait pour l\'été',
        price: 42,
        vegetarian: true,
        spicy: false,
        signature: false
      },
      {
        name: 'Cidre de glace québécois',
        description: 'Québec - Doux, arômes de pomme concentrés',
        price: 38,
        vegetarian: true,
        spicy: false,
        signature: true
      }
    ]
  }

  const currentItems = menuItems[selectedCategory as keyof typeof menuItems]

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-luxury text-white py-12">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Notre Menu
              </h1>
              <h2 className="text-2xl text-white/90 mb-2">Restaurant de l'Hôtel Sept-Îles</h2>
              <p className="text-white/80">
                Une cuisine raffinée mettant en valeur les produits locaux de la Côte-Nord
              </p>
            </div>

            <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                alt="Menu du restaurant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="container-custom max-w-5xl">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display text-xl font-bold text-neutral-900">
                        {item.name}
                      </h3>
                      {item.signature && (
                        <span className="inline-flex items-center gap-1 bg-gradient-gold text-neutral-900 text-xs font-bold px-2 py-1 rounded-full">
                          <ChefHat className="h-3 w-3" />
                          Signature
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3">
                      {item.vegetarian && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                          <Leaf className="h-3 w-3" />
                          Végétarien
                        </span>
                      )}
                      {item.spicy && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                          <Flame className="h-3 w-3" />
                          Épicé
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-primary-600">
                        {item.price}$
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gradient-luxury text-white rounded-3xl p-8 text-center"
          >
            <h3 className="font-display text-2xl font-bold mb-3">
              Réservez votre table dès maintenant
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Vivez une expérience culinaire exceptionnelle dans notre restaurant
            </p>
            <Link
              href="/restaurant/reservation"
              className="btn-gold inline-flex"
            >
              <UtensilsCrossed className="h-5 w-5" />
              Réserver une table
            </Link>
          </motion.div>

          {/* Informations supplémentaires */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <ChefHat className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-bold text-neutral-900 mb-2">Chef régional</h4>
              <p className="text-sm text-neutral-600">
                Notre chef met en valeur les produits locaux de la Côte-Nord
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-bold text-neutral-900 mb-2">Options végétariennes</h4>
              <p className="text-sm text-neutral-600">
                Plusieurs plats végétariens et adaptés aux régimes spéciaux
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <UtensilsCrossed className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-bold text-neutral-900 mb-2">Menu du jour</h4>
              <p className="text-sm text-neutral-600">
                Demandez nos suggestions du jour à votre serveur
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-900 text-center">
              <strong>Note :</strong> Les prix sont sujets à changement. Des allergies alimentaires ?
              Informez notre équipe lors de votre réservation. Les plats signature sont les spécialités de notre chef.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
