'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar, 
  Sparkles, 
  Award, 
  MapPin,
  ArrowRight,
  Star,
  Heart,
  Wifi,
  Coffee,
  Car
} from 'lucide-react'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedRooms } from '@/components/home/FeaturedRooms'
import { ServicesShowcase } from '@/components/home/ServicesShowcase'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Chambres en vedette */}
      <FeaturedRooms />

      {/* Services Spa */}
      <ServicesShowcase />

      {/* Section Commodités */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-primary mb-4">Commodités</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Tout pour votre confort
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Wifi, label: 'Wi-Fi Gratuit' },
              { icon: Coffee, label: 'Petit-déjeuner' },
              { icon: Car, label: 'Stationnement' },
              { icon: Sparkles, label: 'Service étage' },
              { icon: Award, label: 'Conciergerie' },
              { icon: Heart, label: 'Spa & Bien-être' }
            ].map((amenity, index) => (
              <motion.div
                key={amenity.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-6 text-center hover:shadow-medium transition-all"
              >
                <amenity.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-700">
                  {amenity.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialsSection />

      {/* Section localisation */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-primary mb-4">Notre emplacement</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Au cœur de la Côte-Nord
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Idéalement situé à Sept-Îles, notre hôtel vous offre un accès privilégié 
                aux attractions locales, restaurants et activités de la région.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Centre-ville à 5 minutes',
                  'Vue sur le fleuve Saint-Laurent',
                  'Proche des sentiers de randonnée',
                  'Accès facile aux transports'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                      <Star className="h-4 w-4 text-primary-600 fill-primary-600" />
                    </div>
                    <span className="text-neutral-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact" className="btn-secondary">
                <MapPin className="h-4 w-4" />
                Voir l'itinéraire
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-strong"
            >
              <Image
                src="/images/location-map.svg"
                alt="Localisation Hôtel Sept-Îles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">
                  123 rue Principale
                </h3>
                <p className="text-white/90">
                  Sept-Îles, Québec G4R 1A1
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CTASection />
    </div>
  )
}