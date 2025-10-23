'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Maximize2,
  Eye,
  ArrowRight,
  Calendar,
  Star,
  Award,
  Sparkles,
  Wifi,
  Coffee,
  Bath,
  Wind
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms } from '@/store/slices/roomsSlice'
import { MaintenanceMessage } from '@/components/common/MaintenanceMessage'

export function FeaturedRooms() {
  const dispatch = useAppDispatch()
  const { rooms, loading, error } = useAppSelector((state) => state.rooms)

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  // Sélectionner les 3 premières chambres pour la page d'accueil
  const featuredRooms = rooms.slice(0, 3)
  console.log('Chambres en vedette:', featuredRooms)
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-sm border border-primary-100"
          >
            <Award className="h-4 w-4" />
            Excellence & Confort
          </motion.span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold bg-gradient-to-r from-neutral-900 via-primary-900 to-neutral-900 bg-clip-text text-transparent mb-5 leading-tight">
            Découvrez nos suites d'exception
          </h2>
          <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Chaque chambre est conçue pour votre confort absolu, alliant design moderne et équipements premium
          </p>
        </motion.div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-neutral-600">Chargement des chambres...</p>
          </div>
        )}

        {/* Error state - Maintenance */}
        {error && error === 'MAINTENANCE' && (
          <div className="py-8">
            <MaintenanceMessage
              onRetry={() => dispatch(fetchRooms())}
              submessage="Nos chambres seront de nouveau disponibles très bientôt."
              email="reservations@hotel-sept-iles.com"
            />
          </div>
        )}

        {/* Error state - Autre erreur */}
        {error && error !== 'MAINTENANCE' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto">
            <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-red-600 text-sm mb-6">{error}</p>
            <button
              onClick={() => dispatch(fetchRooms())}
              className="btn-primary"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              {/* Card principale */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
                {/* Images carousel */}
                <div className="relative aspect-chambre overflow-hidden bg-neutral-100">
                  <Image
                    src={room.images[0]}
                    alt={room.nom}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Badge disponibilité */}
                  <div className="absolute top-3 left-3 z-20">
                    {room.disponible ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Disponible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-sm">
                        Complet
                      </span>
                    )}
                  </div>

                  {/* Badge catégorie */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-neutral-900 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg">
                      <Award className="h-3 w-3" />
                      {room.categorie}
                    </span>
                  </div>

                  {/* Prix */}
                  <div className="absolute bottom-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl">
                    <div className="text-[9px] font-bold uppercase tracking-wide text-neutral-500 mb-0.5">À partir de</div>
                    <div className="font-display text-2xl font-bold text-primary-600 flex items-baseline gap-1">
                      {room.prix}
                      <span className="text-xs font-medium text-neutral-500">$/nuit</span>
                    </div>
                  </div>

                  {/* Indicateur images */}
                  <div className="absolute bottom-3 left-3 z-20 flex gap-1.5">
                    {room.images.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i === 0 ? 'w-6 bg-white' : 'w-1 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Contenu avec meilleur espacement */}
                <div className="p-6">
                  {/* Header avec note */}
                  <div className="mb-4">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300 mb-3 leading-tight">
                      {room.nom}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg border border-yellow-200/50">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-xs text-neutral-900">{room.note}</span>
                      </div>
                      <span className="text-xs text-neutral-500">•</span>
                      <span className="text-xs text-neutral-600 font-medium">
                        {room.avis} avis
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm mb-5 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  {/* Infos rapides */}
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-200">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-neutral-900">{room.capacite} pers.</div>
                        <div className="text-[10px] text-neutral-500 font-medium">Capacité</div>
                      </div>
                    </div>
                    <div className="w-px h-10 bg-neutral-200" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Maximize2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-neutral-900">{room.superficie} m²</div>
                        <div className="text-[10px] text-neutral-500 font-medium">Surface</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/chambres/${room.id}`}
                      className="flex items-center justify-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2.5 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50 active:scale-95"
                    >
                      <Eye className="h-4 w-4" />
                      Détails
                    </Link>
                    <Link
                      href={`/reservation/${room.id}`}
                      className={`flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg active:scale-95 ${
                        !room.disponible ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={(e) => !room.disponible && e.preventDefault()}
                    >
                      <Calendar className="h-4 w-4" />
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {!loading && !error && (
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
        )}
      </div>
    </section>
  )
}