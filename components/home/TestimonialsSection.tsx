'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Marie Tremblay',
    location: 'Québec',
    avatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Un séjour absolument magnifique ! Les chambres sont spacieuses et impeccables. Le personnel est aux petits soins. Le spa est un vrai havre de paix. Je recommande vivement !',
    service: 'Suite Royale + Massage'
  },
  {
    id: 2,
    name: 'Jean-François Bouchard',
    location: 'Montréal',
    avatar: '/images/avatars/avatar-2.jpg',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Excellente expérience du début à la fin. La vue sur le fleuve depuis notre chambre était à couper le souffle. Les services spa sont de qualité professionnelle.',
    service: 'Chambre Deluxe + Hammam'
  },
  {
    id: 3,
    name: 'Sophie Gagnon',
    location: 'Rimouski',
    avatar: '/images/avatars/avatar-3.jpg',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Week-end parfait en famille ! Les enfants ont adoré la piscine et nous avons profité du spa. Tout était parfait, de l\'accueil au petit-déjeuner.',
    service: 'Suite Familiale'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-primary mb-4">Témoignages</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Plus de 2000 clients satisfaits nous font confiance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-8 w-8 text-accent-gold fill-accent-gold"
              />
            ))}
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-neutral-900">
              4.9/5
            </div>
            <p className="text-neutral-600">
              Basé sur 847 avis vérifiés
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-strong transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-neutral-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-accent-gold fill-accent-gold"
                  />
                ))}
                <span className="text-xs text-neutral-500 ml-2">
                  {testimonial.date}
                </span>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                {testimonial.comment}
              </p>

              <div className="pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-500">
                  Service réservé :
                </span>
                <p className="text-sm font-medium text-primary-600 mt-1">
                  {testimonial.service}
                </p>
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
            href="/avis"
            className="btn-secondary"
          >
            Voir tous les avis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}