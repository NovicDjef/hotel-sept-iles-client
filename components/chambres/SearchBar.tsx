'use client'

import { useState } from 'react'
import { Calendar, Users, Search } from 'lucide-react'
import { motion } from 'framer-motion'

export function SearchBar() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const handleSearch = () => {
    console.log('Recherche:', { checkIn, checkOut, guests })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-medium p-4"
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
              onChange={(e) => setCheckIn(e.target.value)}
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
              onChange={(e) => setCheckOut(e.target.value)}
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
              onChange={(e) => setGuests(Number(e.target.value))}
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
          <button
            onClick={handleSearch}
            className="btn-primary w-full justify-center"
          >
            <Search className="h-5 w-5" />
            Rechercher
          </button>
        </div>
      </div>
    </motion.div>
  )
}