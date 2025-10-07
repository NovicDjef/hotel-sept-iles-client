'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Minus, Clock, Calendar, Sparkles } from 'lucide-react'

interface ServicesSelectorProps {
  selectedServices: any[]
  onServicesChange: (services: any[]) => void
  checkIn: string
  checkOut: string
}

const servicesDisponibles = [
  {
    id: 1,
    nom: 'Massage Thérapeutique',
    description: 'Massage relaxant aux huiles essentielles',
    duree: 60,
    prix: 85,
    image: '/images/services/massage.jpg',
    categorie: 'Massage'
  },
  {
    id: 2,
    nom: 'Hammam Premium',
    description: 'Expérience orientale authentique',
    duree: 45,
    prix: 65,
    image: '/images/services/hammam.jpg',
    categorie: 'Spa'
  },
  {
    id: 3,
    nom: 'Pédicure Spa',
    description: 'Soin complet des pieds',
    duree: 60,
    prix: 55,
    image: '/images/services/pedicure.jpg',
    categorie: 'Soins'
  },
  {
    id: 4,
    nom: 'Manucure Luxe',
    description: 'Soin des mains avec vernis semi-permanent',
    duree: 45,
    prix: 45,
    image: '/images/services/manucure.jpg',
    categorie: 'Soins'
  },
  {
    id: 5,
    nom: 'Sauna Finlandais',
    description: 'Séance de détoxification',
    duree: 30,
    prix: 35,
    image: '/images/services/sauna.jpg',
    categorie: 'Spa'
  },
  {
    id: 6,
    nom: 'Soin du Visage',
    description: 'Traitement facial complet',
    duree: 60,
    prix: 75,
    image: '/images/services/facial.jpg',
    categorie: 'Soins'
  }
]

export function ServicesSelector({ 
  selectedServices, 
  onServicesChange,
  checkIn,
  checkOut 
}: ServicesSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const categories = ['Tous', 'Massage', 'Spa', 'Soins']

  const toggleService = (service: any) => {
    const exists = selectedServices.find(s => s.id === service.id)
    if (exists) {
      onServicesChange(selectedServices.filter(s => s.id !== service.id))
    } else {
      onServicesChange([...selectedServices, { ...service, date: checkIn, heure: '10:00' }])
    }
  }

  const filteredServices = selectedCategory === 'Tous'
    ? servicesDisponibles
    : servicesDisponibles.filter(s => s.categorie === selectedCategory)

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
          Ajoutez des services spa
        </h2>
        <p className="text-neutral-600">
          Profitez de nos services premium pendant votre séjour et économisez jusqu'à 15%
        </p>
      </div>

      {/* Filtres catégories */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid des services */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {filteredServices.map((service) => {
          const isSelected = selectedServices.some(s => s.id === service.id)
          
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
                    src={service.image}
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
                  
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.duree} min</span>
                    </div>
                    <span>•</span>
                    <div className="font-semibold text-primary-600">
                      {service.prix}$
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
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">
              {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} sélectionné{selectedServices.length > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-sm text-green-600">
            Économie de {Math.round(selectedServices.reduce((sum, s) => sum + s.prix, 0) * 0.15)}$ 
            avec la réduction bundle !
          </p>
        </div>
      )}
    </div>
  )
}