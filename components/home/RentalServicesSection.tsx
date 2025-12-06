'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Building2,
  Users,
  Presentation,
  Store,
  Calendar,
  ArrowRight,
  Check,
  Sparkles,
  Wifi,
  Projector,
  Coffee
} from 'lucide-react'

export function RentalServicesSection() {
  const rentalSpaces = [
    {
      icon: Presentation,
      title: 'Salle de spectacle',
      description: 'Espace modulable pouvant accueillir jusqu\'à 200 personnes',
      capacity: '200 personnes',
      size: '250 m²',
      image: 'https://www.tourismecote-nord.com/fichiersUploadOpt/1200-628-0-0-1920-1228-0-0-dba41563aa09ec78457dd7fd0caaa6fc71b51ae9d50668b01/20220301100739-salle-de-congres.jpg',
      features: ['Système audio/vidéo professionnel', 'Scène équipée', 'Éclairage de spectacle', 'Loges'],
      color: 'from-purple-600 to-purple-900'
    },
    {
      icon: Building2,
      title: 'Bureaux & Salles de réunion',
      description: 'Espaces de travail équipés et confortables',
      capacity: '10-50 personnes',
      size: '30-120 m²',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      features: ['Wi-Fi haut débit', 'Équipement de visioconférence', 'Mobilier ergonomique', 'Service de restauration'],
      color: 'from-blue-600 to-blue-900'
    },
    {
      icon: Store,
      title: 'Espaces marchands',
      description: 'Emplacements stratégiques pour événements commerciaux',
      capacity: '50-150 personnes',
      size: '50-200 m²',
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop',
      features: ['Accès direct depuis le hall', 'Électricité et connectique', 'Tables et présentoirs', 'Parking à proximité'],
      color: 'from-amber-600 to-amber-900'
    }
  ]

  const commonAmenities = [
    { icon: Wifi, label: 'Wi-Fi gratuit' },
    { icon: Coffee, label: 'Service traiteur' },
    { icon: Projector, label: 'Équipement A/V' },
    { icon: Users, label: 'Support technique' }
  ]

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
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
            <Building2 className="h-4 w-4" />
            <span className="text-sm font-medium">Location d'espaces</span>
          </span>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Des espaces adaptés à <span className="text-gradient-gold">vos besoins</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Organisez vos événements professionnels, spectacles ou expositions dans nos espaces
            modulables et entièrement équipés
          </p>
        </motion.div>

        {/* Grille des espaces */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rentalSpaces.map((space, index) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="card overflow-hidden h-full hover:shadow-strong transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${space.color} opacity-40`} />

                  {/* Badge capacité */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary-600" />
                      <span className="text-xs font-semibold text-neutral-900">{space.capacity}</span>
                    </div>
                  </div>

                  {/* Icône */}
                  <div className="absolute bottom-4 left-4">
                    <div className="h-12 w-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <space.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {space.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    {space.description}
                  </p>

                  {/* Taille */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-neutral-500">
                    <Building2 className="h-4 w-4" />
                    <span>{space.size}</span>
                  </div>

                  {/* Caractéristiques */}
                  <div className="space-y-2 mb-5">
                    {space.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Voir les détails
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commodités communes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                Tous nos espaces incluent
              </h3>
              <p className="text-neutral-600">
                Des équipements et services pour la réussite de votre événement
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {commonAmenities.map((amenity, index) => (
                <motion.div
                  key={amenity.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/50"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <amenity.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-neutral-700 text-center">
                    {amenity.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/locations"
            className="btn-gold group inline-flex"
          >
            <Calendar className="h-5 w-5" />
            Voir tous nos espaces
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-neutral-500 mt-4">
            Notre équipe vous accompagne dans l'organisation de votre événement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
