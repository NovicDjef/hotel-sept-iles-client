'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Maximize2, Eye, ArrowRight } from 'lucide-react'

const featuredRooms = [
  {
    id: 1,
    name: 'Suite Royale',
    category: 'Premium',
    description: 'Notre suite la plus luxueuse avec vue panoramique sur le fleuve',
    price: 299,
    capacity: 2,
    size: 45,
    image: '/images/rooms/suite-royale.jpg',
    features: ['Vue fleuve', 'Jacuzzi', 'Balcon privé']
  },
  {
    id: 2,
    name: 'Chambre Deluxe',
    category: 'Standard',
    description: 'Confort moderne avec tout l\'équipement nécessaire',
    price: 189,
    capacity: 2,
    size: 32,
    image: '/images/rooms/deluxe.jpg',
    features: ['King size', 'Bureau', 'Mini-bar']
  },
  {
    id: 3,
    name: 'Suite Familiale',
    category: 'Famille',
    description: 'Espace généreux pour toute la famille',
    price: 249,
    capacity: 4,
    size: 55,
    image: '/images/rooms/family-suite.jpg',
    features: ['2 chambres', 'Cuisine', 'Salon']
  }
]

export function FeaturedRooms() {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-primary mb-4">Nos chambres</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Découvrez nos suites d'exception
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Chaque chambre est conçue pour offrir confort, élégance et une expérience inoubliable
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group card overflow-hidden hover:shadow-strong transition-all duration-500"
            >
              <div className="relative aspect-chambre overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Link
                      href={`/chambres/${room.id}`}
                      className="btn-primary w-full justify-center group/btn"
                    >
                      <Eye className="h-4 w-4" />
                      Voir les détails
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="badge-gold backdrop-blur-md">
                    {room.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
                  <div className="text-xs text-neutral-600">À partir de</div>
                  <div className="font-display text-xl font-bold text-primary-600">
                    {room.price}$
                    <span className="text-sm font-normal text-neutral-500">/nuit</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {room.name}
                </h3>
                
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} pers.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="h-4 w-4" />
                    <span>{room.size} m²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/chambres"
            className="btn-secondary group"
          >
            Voir toutes nos chambres
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}