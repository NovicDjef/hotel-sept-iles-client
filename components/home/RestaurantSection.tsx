'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  UtensilsCrossed,
  Wine,
  Clock,
  MapPin,
  ArrowRight,
  Star,
  ChefHat,
  Sparkles
} from 'lucide-react'

export function RestaurantSection() {
  const restaurantFeatures = [
    {
      icon: ChefHat,
      title: 'Cuisine régionale',
      description: 'Des plats préparés avec des produits locaux de la Côte-Nord'
    },
    {
      icon: Wine,
      title: 'Bar à vin',
      description: 'Une sélection raffinée de vins québécois et internationaux'
    },
    {
      icon: Clock,
      title: 'Service continu',
      description: 'Petit-déjeuner, déjeuner et dîner tous les jours'
    },
    {
      icon: Star,
      title: 'Ambiance chaleureuse',
      description: 'Un cadre élégant avec vue sur la ville'
    }
  ]
  const imageRestourants1 = '/images/restaurant/a.jpg'
  const imageRestourants2 = '/images/restaurant/b.jpg'  
   
  const hours = [
    { day: 'Petit-déjeuner', time: '6h30 - 11h00' },
    { day: 'Déjeuner', time: '11h30 - 14h00' },
    { day: 'Dîner', time: '17h30 - 22h00' },
    { day: 'Bar', time: '11h30 - 23h00' }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-2 mb-4 text-primary-700">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="text-sm font-medium">Restaurant & Bar</span>
          </span>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Une expérience culinaire <span className="text-gradient-gold">exceptionnelle</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Savourez des plats inspirés par les saveurs de la Côte-Nord dans une ambiance
            raffinée et conviviale
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Image principale */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-strong">
              <Image
                src={imageRestourants1}
                alt="Restaurant de l'Hôtel Sept-Îles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Badge flottant */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="card-premium p-4 backdrop-blur-md bg-white/95">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
                        <ChefHat className="h-6 w-6 text-neutral-900" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-neutral-900">Chef régional</h4>
                      <p className="text-sm text-neutral-600">Cuisine authentique de la Côte-Nord</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image secondaire (Bar) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -right-6 w-2/5 aspect-square rounded-2xl overflow-hidden shadow-strong border-4 border-white"
            >
              <Image
                src={imageRestourants2}
                alt="Bar de l'hôtel"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Caractéristiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {restaurantFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-5 hover:shadow-medium transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Horaires */}
            <div className="card p-6 mb-6">
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-600" />
                Heures d'ouverture
              </h3>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
                  >
                    <span className="font-medium text-neutral-700">{schedule.day}</span>
                    <span className="text-neutral-600">{schedule.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/restaurant/reservation"
                className="btn-gold group"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Réserver une table
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/restaurant/menu"
                className="btn-secondary group"
              >
                Voir le menu
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Highlights en bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium p-8 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
                <Sparkles className="h-7 w-7 text-neutral-900" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-neutral-900">Menu du jour</div>
                <div className="text-neutral-600">Spécialités changeantes</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
                <Wine className="h-7 w-7 text-neutral-900" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-neutral-900">50+ vins</div>
                <div className="text-neutral-600">Carte des vins sélectionnés</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
                <MapPin className="h-7 w-7 text-neutral-900" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-neutral-900">Produits locaux</div>
                <div className="text-neutral-600">Ingrédients de la région</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
