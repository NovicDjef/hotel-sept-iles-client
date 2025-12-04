'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { memo } from 'react'

export const CTASection = memo(function CTASection() {
  return (
    <section className="py-16 lg:py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-accent-gold" />
              </motion.div>
              <span className="text-white text-sm font-medium">
                Offre spéciale - Réservez maintenant
              </span>
            </motion.div>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6">
              Prêt pour une expérience{' '}
              <span className="text-gradient-gold">inoubliable</span> ?
            </h2>
            
            <p className="text-white/90 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
              Réservez dès maintenant et profitez de nos chambres premium 
              avec accès privilégié à nos services spa de luxe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/chambres"
                className="btn-gold group text-base px-8 py-4"
              >
                <Calendar className="h-5 w-5" />
                Réserver maintenant
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="tel:+14185551234"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-95"
              >
                <Phone className="h-5 w-5" />
                +1 418 962-2581
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12 border-t border-white/20">
              {[
                { number: '2000+', label: 'Clients satisfaits' },
                { number: '4.9/5', label: 'Note moyenne' },
                { number: '24/7', label: 'Service client' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="font-display text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10"
          >
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                Besoin d'aide pour réserver ?
              </h3>
              <p className="text-neutral-600">
                Notre équipe est disponible 24h/24 pour vous assister
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="tel:+14185551234"
                className="group flex items-center gap-4 p-4 rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Appelez-nous</div>
                  <div className="font-semibold text-neutral-900">+1 418 962-2581</div>
                </div>
              </a>

              <a
                href="mailto:info@hotel-sept-iles.com"
                className="group flex items-center gap-4 p-4 rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Écrivez-nous</div>
                  <div className="font-semibold text-neutral-900">info@hotel-sept-iles.com</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
