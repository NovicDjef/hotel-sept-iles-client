'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wifi, Coffee, Bath, Tv, Wind, Star, Sparkles } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPriceRange, resetFilters } from '@/store/slices/roomsSlice'

interface FilterSidebarProps {
  onClose?: () => void
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.rooms.filters)

  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice)
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice)
  const [selectedEquipements, setSelectedEquipements] = useState<string[]>([])

  // Sync local state with Redux store
  useEffect(() => {
    setLocalMinPrice(filters.minPrice)
    setLocalMaxPrice(filters.maxPrice)
  }, [filters.minPrice, filters.maxPrice])

  const equipements = [
    { id: 'wifi', label: 'Wi-Fi gratuit', icon: Wifi },
    { id: 'breakfast', label: 'Petit-déjeuner', icon: Coffee },
    { id: 'bath', label: 'Baignoire', icon: Bath },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'ac', label: 'Climatisation', icon: Wind },
    { id: 'minibar', label: 'Mini-bar', icon: Star },
  ]

  const toggleEquipement = (id: string) => {
    setSelectedEquipements(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    )
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
    setSelectedEquipements([])
  }

  const handleApplyFilters = () => {
    dispatch(setPriceRange({ min: localMinPrice, max: localMaxPrice }))
    if (onClose) {
      onClose()
    }
  }

  const handleMinPriceChange = (value: number) => {
    setLocalMinPrice(value)
  }

  const handleMaxPriceChange = (value: number) => {
    setLocalMaxPrice(value)
  }

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h3 className="font-semibold text-lg text-neutral-900">Filtres</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div>
        <h4 className="font-medium text-neutral-900 mb-4">Gamme de prix</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Min</span>
            <span className="font-semibold text-neutral-900">{localMinPrice}$</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={localMinPrice}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            className="w-full accent-primary-600"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Max</span>
            <span className="font-semibold text-neutral-900">{localMaxPrice}$</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={localMaxPrice}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            className="w-full accent-primary-600"
          />

          <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
            <span className="text-sm text-neutral-700">Par nuit</span>
            <span className="font-semibold text-primary-600">
              {localMinPrice}$ - {localMaxPrice}$
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-neutral-900 mb-4">Équipements</h4>
        <div className="space-y-2">
          {equipements.map((equipement) => {
            const Icon = equipement.icon
            const isSelected = selectedEquipements.includes(equipement.id)
            
            return (
              <button
                key={equipement.id}
                onClick={() => toggleEquipement(equipement.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary-50 border-2 border-primary-500'
                    : 'bg-neutral-50 border-2 border-transparent hover:border-neutral-200'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                  isSelected ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-primary-600' : 'text-neutral-700'
                }`}>
                  {equipement.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-neutral-900 mb-4">Note minimale</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 hover:border-primary-200 border-2 border-transparent transition-all"
            >
              <div className="flex items-center gap-2">
                {[...Array(Math.floor(rating))].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent-gold fill-accent-gold" />
                ))}
                {rating % 1 !== 0 && (
                  <div className="relative">
                    <Star className="h-4 w-4 text-neutral-300" />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                      <Star className="h-4 w-4 text-accent-gold fill-accent-gold" />
                    </div>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {rating}+ et plus
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-neutral-900 mb-4">Services spa disponibles</h4>
        <div className="space-y-2">
          {['Massage', 'Hammam', 'Pédicure', 'Manucure'].map((service) => (
            <label
              key={service}
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <Sparkles className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-neutral-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4 space-y-3 border-t border-neutral-200">
        <button onClick={handleResetFilters} className="btn-secondary w-full justify-center">
          Réinitialiser
        </button>
        <button onClick={handleApplyFilters} className="btn-primary w-full justify-center">
          Appliquer les filtres
        </button>
      </div>
    </div>
  )

  if (onClose) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto safe-top safe-bottom"
          >
            <div className="p-6">
              {content}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  return (
    <div className="card p-6">
      {content}
    </div>
  )
}