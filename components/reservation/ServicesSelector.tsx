'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Minus, Clock, Calendar, Sparkles, Tag, Check } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAllSpaData } from '@/store/slices/servicesSlice'

interface ServicesSelectorProps {
  selectedServices: any[]
  onServicesChange: (services: any[]) => void
  checkIn: string
  checkOut: string
}

export function ServicesSelector({
  selectedServices,
  onServicesChange,
  checkIn,
  checkOut
}: ServicesSelectorProps) {
  const dispatch = useAppDispatch()
  const { services, categories, loading, error } = useAppSelector((state) => state.services)
  const [selectedCategory, setSelectedCategory] = useState('tous')

  // Charger les services spa au montage
  useEffect(() => {
    const initSpaData = async () => {
      // S'assurer qu'on a un token guest pour accéder aux APIs
      const { ensureGuestAuth } = await import('@/services/auth/guestAuth')
      await ensureGuestAuth()

      // Charger les services spa
      if (services.length === 0) {
        dispatch(fetchAllSpaData())
      }
    }

    initSpaData()
  }, [dispatch, services.length])

  const toggleService = (service: any) => {
    const exists = selectedServices.find(s => s.id === service.id)
    if (exists) {
      onServicesChange(selectedServices.filter(s => s.id !== service.id))
    } else {
      // Prendre le premier prix disponible (pour la durée la plus courte)
      const premiereduree = service.duree[0]
      const prix = service.prix[premiereduree]

      onServicesChange([...selectedServices, {
        ...service,
        dureeSelectionnee: premiereduree,
        prixSelectionne: prix,
        date: checkIn,
        heure: '10:00'
      }])
    }
  }

  // Filtrer les services par catégorie
  const filteredServices = selectedCategory === 'tous'
    ? services
    : services.filter(s => s.categorie.toLowerCase() === selectedCategory)

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
          Ajoutez des services spa
        </h2>
        <p className="text-neutral-600 mb-4">
          Profitez de nos services premium pendant votre séjour
        </p>

        {/* Bandeau offre spéciale */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Tag className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">🎁 Offre exclusive réservation</p>
              <p className="text-xs text-white/90">
                <strong>-10% automatique</strong> sur tous les services spa ajoutés à votre réservation de chambre !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* État de chargement */}
      {loading && services.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
          <p className="text-neutral-600">Chargement des services spa...</p>
        </div>
      )}

      {/* État d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchAllSpaData())}
            className="btn-secondary"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Contenu principal */}
      {!loading && !error && services.length > 0 && (
        <>
          {/* Filtres catégories */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid des services */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {filteredServices.map((service) => {
              const isSelected = selectedServices.some(s => s.id === service.id)
              // Prendre la première durée et son prix comme valeur par défaut
              const premiereduree = service.duree[0]
              const premierPrix = service.prix[premiereduree]

              return (
                <motion.div
                  key={service.id}
                  layout
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                  onClick={() => toggleService(service)}
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={service.image || '/images/spa/default.jpg'}
                        alt={service.nom}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {service.nom}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-neutral-500">
                          <Clock className="h-3 w-3" />
                          <span>{premiereduree} min</span>
                        </div>
                        <span className="text-neutral-400">•</span>
                        <div className="flex items-center gap-2">
                          {/* Prix original barré */}
                          <span className="text-neutral-400 line-through text-xs">
                            {premierPrix}$
                          </span>
                          {/* Prix avec réduction */}
                          <span className="font-bold text-green-600">
                            {Math.round(premierPrix * 0.9)}$
                          </span>
                          {/* Badge réduction */}
                          <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            -10%
                          </span>
                        </div>
                      </div>
                    </div>

                {/* Checkbox */}
                <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-neutral-300'
                }`}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Plus className="h-4 w-4 text-white rotate-45" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sélection date/heure si sélectionné */}
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-primary-200 bg-primary-50/50 p-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        min={checkIn}
                        max={checkOut}
                        className="input-custom text-sm"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const updated = selectedServices.map(s =>
                            s.id === service.id ? { ...s, date: e.target.value } : s
                          )
                          onServicesChange(updated)
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Heure
                      </label>
                      <select
                        className="input-custom text-sm"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const updated = selectedServices.map(s =>
                            s.id === service.id ? { ...s, heure: e.target.value } : s
                          )
                          onServicesChange(updated)
                        }}
                      >
                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Résumé */}
      {selectedServices.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 rounded-full p-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-green-900">
                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} sélectionné{selectedServices.length > 1 ? 's' : ''}
              </span>
            </div>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              -10% RÉDUCTION
            </span>
          </div>

          {/* Calcul détaillé */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-700">
              <span>Prix original :</span>
              <span className="line-through">
                {selectedServices.reduce((sum, s) => sum + (s.prixSelectionne || 0), 0).toFixed(2)}$
              </span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>Réduction (-10%) :</span>
              <span>
                -{(selectedServices.reduce((sum, s) => sum + (s.prixSelectionne || 0), 0) * 0.10).toFixed(2)}$
              </span>
            </div>
            <div className="border-t border-green-300 pt-2 flex justify-between text-green-900 font-bold text-base">
              <span>Total avec réduction :</span>
              <span>
                {(selectedServices.reduce((sum, s) => sum + (s.prixSelectionne || 0), 0) * 0.90).toFixed(2)}$
              </span>
            </div>
          </div>

          <p className="text-xs text-green-700 mt-3 flex items-center gap-1">
            <Check className="h-3 w-3" />
            Économisez automatiquement 10% sur tous les services spa avec votre réservation !
          </p>
        </div>
      )}
        </>
      )}
    </div>
  )
}