'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'massage',
    name: 'Massage Thérapeutique',
    description: 'Détente profonde avec nos massothérapeutes certifiés',
    duration: '60-90 min',
    price: 'À partir de 85$',
    image: '/images/spa/massage.jpg',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'hammam',
    name: 'Hammam Premium',
    description: 'Expérience orientale authentique dans notre hammam',
    duration: '45 min',
    price: 'À partir de 65$',
    image: './images/spa/Hammam.jpg',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pedicure',
    name: 'Pédicure Spa',
    description: 'Soin complet pour des pieds parfaits',
    duration: '60 min',
    price: 'À partir de 55$',
    image: '/images/spa/pedicure.jpg',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'facial',
    name: 'Soin du Visage',
    description: 'Rayonnez avec nos soins faciaux sur mesure',
    duration: '60 min',
    price: 'À partir de 75$',
    image: '/images/spa/soin-visage.png',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'sauna',
    name: 'Sauna & Détente',
    description: 'Purifiez votre corps dans notre sauna finlandais',
    duration: '30 min',
    price: 'À partir de 35$',
    image: '/images/spa/sona.jpg',
    color: 'from-red-500 to-orange-500'
  }
]

export function ServicesShowcase() {
  return (
    <section className="py-16 lg:py-24 section-gradient relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-4 text-white">
            <Sparkles className="h-4 w-4 text-accent-gold" />
            <span className="text-sm font-medium">Services Spa Premium</span>
          </span>
          
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Prenez soin de vous
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Découvrez notre gamme complète de services spa pour une expérience de détente absolue
          </p>
        </motion.div>

        {/* Grid des services - Bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              {/* Card */}
              <div className="relative h-full min-h-[280px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-glow-blue">
                {/* Image de fond */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    //className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

                {/* Contenu */}
                <div className="relative h-full p-6 flex flex-col justify-end">
                  {/* Badge prix */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md">
                      {/* <div className="text-xs font-semibold text-neutral-900">
                        {service.price}
                      </div> */}
                    </div>
                  </div>

                  {/* Icône */}
                  <div className="mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Titre et description */}
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
                    {service.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {service.description}
                  </p>

                  {/* Durée */}
                  <div className="flex items-center gap-2 text-white/70 text-xs mb-4">
                    <div className="h-1 w-1 rounded-full bg-white/50" />
                    <span>{service.duration}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-white font-medium text-sm group/link"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section offre combinée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium p-8 lg:p-10 text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold mb-6 shadow-glow-gold">
            <Sparkles className="h-8 w-8 text-neutral-900" />
          </div>
          
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
            Forfait Détente Complète
          </h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Combinez plusieurs services et économisez jusqu'à 25%. 
            Le forfait idéal pour une journée de bien-être absolue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-primary-600">
                199$
              </span>
              <span className="text-neutral-500 line-through text-lg">
                265$
              </span>
              <span className="badge-success">-25%</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-gold">
              <Sparkles className="h-4 w-4" />
              Découvrir les forfaits
            </Link>
            <Link href="/chambres" className="btn-secondary">
              Réserver avec une chambre
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}