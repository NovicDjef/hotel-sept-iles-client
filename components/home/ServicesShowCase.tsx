'use client'

import { useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAllSpaData } from '@/store/slices/servicesSlice'
import {
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react'


export const ServicesShowcase = memo(function ServicesShowcase() {
   const dispatch = useAppDispatch()

   // Récupérer les données depuis Redux
   const {
     filteredServices,
     loading,
     error
   } = useAppSelector((state) => state.services)

   // Afficher les 5 premiers services en vedette
   const featuredServices = filteredServices.slice(0, 5)
   // Charger les données au montage du composant
   useEffect(() => {
     const initAndFetchData = async () => {
       // S'assurer qu'on a un token guest pour accéder aux APIs
       const { ensureGuestAuth } = await import('@/services/auth/guestAuth')
       await ensureGuestAuth()
 
       // Charger les données spa (y compris les catégories)
       dispatch(fetchAllSpaData())
     }
 
     initAndFetchData()
   }, [dispatch])

  // Afficher un état de chargement
  if (loading) {
    return (
      <section className="py-16 lg:py-24 section-gradient relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4">Chargement des services spa...</p>
          </div>
        </div>
      </section>
    )
  }

  // Afficher une erreur si nécessaire
  if (error) {
    return (
      <section className="py-16 lg:py-24 section-gradient relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center text-white">
            <p className="text-red-400">Erreur lors du chargement des services: {error}</p>
          </div>
        </div>
      </section>
    )
  }

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
          {featuredServices.map((service, index) => (
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
                    alt={service.nom}
                    fill
                    //className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 to-primary-900/50 opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                {/* Contenu */}
                <div className="relative h-full p-6 flex flex-col justify-end">
                  {/* Badge prix */}
                  <div className="absolute top-6 right-6">
                    <div className=" rounded-xl px-3 py-1.5 shadow-md space-y-1">
                      {service.duree && service.duree.map((duree) => (
                        <motion.span
                          key={duree}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 px-3 py-2 rounded-full flex items-center gap-1.5 font-medium border border-primary-100 shadow-sm"
                        >
                          <Clock className="h-3.5 w-3.5 text-primary-600" />
                          {duree} min - {service.prix[duree as keyof typeof service.prix]}$
                        </motion.span>
                      ))}
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
                    {service.nom}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {service.description}
                  </p>

                  {/* Durée */}
                  <div className="flex items-center gap-2 text-white/70 text-xs mb-4">
                    <div className="h-1 w-1 rounded-full bg-white/50" />
                    <span>{service.duree && service.duree.length > 0 ? `${service.duree[0]} min` : ''}</span>
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
        {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                href="/services"
                className="btn-primary group"
              >
                Voir tous nos services spa
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}

      </div>
    </section>
  )
})