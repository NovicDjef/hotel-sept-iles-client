'use client'

import { useState } from 'react'
import { Calendar, Users, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  onSearch?: (filters: { checkIn: string; checkOut: string; guests: number }) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ checkIn, checkOut, guests })
    }
  }

  // Déclencher la recherche automatiquement quand les valeurs changent
  const handleGuestsChange = (value: number) => {
    setGuests(value)
    if (onSearch) {
      onSearch({ checkIn, checkOut: checkOut, guests: value })
    }
  }

  const handleCheckInChange = (value: string) => {
    setCheckIn(value)
    if (onSearch && value && checkOut) {
      onSearch({ checkIn: value, checkOut, guests })
    }
  }

  const handleCheckOutChange = (value: string) => {
    setCheckOut(value)
    if (onSearch && checkIn && value) {
      onSearch({ checkIn, checkOut: value, guests })
    }
  }

  const hasActiveFilters = checkIn || checkOut || guests > 2

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-medium p-4 transition-all duration-300 ${
        hasActiveFilters ? 'ring-2 ring-primary-500/20' : ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-2">
            Arrivée
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="input-custom pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-2">
            Départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="input-custom pl-10"
              min={checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-2">
            Personnes
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <select
              value={guests}
              onChange={(e) => handleGuestsChange(Number(e.target.value))}
              className="input-custom pl-10"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num > 1 ? 'personnes' : 'personne'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative btn-primary w-full justify-center transition-all duration-300 ${
              hasActiveFilters ? 'bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg' : ''
            }`}
          >
            <Search className="h-5 w-5" />
            Rechercher
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-neutral-900 shadow-md">
                {[checkIn, checkOut, guests > 2].filter(Boolean).length}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}