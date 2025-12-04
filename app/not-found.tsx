'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Construction, Home, ArrowLeft, Hammer, HardHat, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-gold/10 flex items-center justify-center px-4 py-16">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icônes de construction animées */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="inline-block"
            >
              <div className="relative">
                <Construction className="h-32 w-32 text-primary-600 mx-auto" strokeWidth={1.5} />

                {/* Icônes flottantes */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4"
                >
                  <Hammer className="h-12 w-12 text-accent-gold" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-4 -left-4"
                >
                  <HardHat className="h-12 w-12 text-primary-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Badge 404 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/20 border border-accent-gold rounded-full mb-6"
          >
            <AlertTriangle className="h-5 w-5 text-accent-gold" />
            <span className="font-semibold text-accent-gold">Erreur 404</span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6"
          >
            Page en construction
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <p className="text-xl md:text-2xl text-neutral-700 mb-4">
              Nous travaillons activement sur cette fonctionnalité
            </p>
            <p className="text-base md:text-lg text-neutral-600">
              Notre équipe met tout en œuvre pour vous offrir la meilleure expérience possible.
              Cette section sera bientôt disponible avec de nouvelles fonctionnalités extraordinaires !
            </p>
          </motion.div>

          {/* Barre de progression animée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-neutral-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-600 to-accent-gold rounded-full"
              />
            </div>
            <p className="text-sm text-neutral-500 mt-2">
              Progression : 75% complété
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="btn-primary group"
            >
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </Link>

            <Link
              href="/contact"
              className="btn-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
              Nous contacter
            </Link>
          </motion.div>

          {/* Informations supplémentaires */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="font-semibold text-neutral-900 mb-3">
              Que puis-je faire en attendant ?
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <Link
                href="/chambres"
                className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <p className="font-medium text-primary-600 group-hover:text-primary-700">
                  Découvrir nos chambres
                </p>
              </Link>
              <Link
                href="/services"
                className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <p className="font-medium text-primary-600 group-hover:text-primary-700">
                  Explorer nos services
                </p>
              </Link>
              <Link
                href="/reservation"
                className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <p className="font-medium text-primary-600 group-hover:text-primary-700">
                  Réserver un séjour
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Message de patience */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-neutral-500 text-sm"
          >
            Merci de votre patience et de votre compréhension 🙏
          </motion.p>
        </motion.div>
      </div>

      {/* Effets de fond */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold/30 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
