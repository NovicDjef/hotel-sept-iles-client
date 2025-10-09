'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, ArrowRight, Sparkles, Shield, Tag } from 'lucide-react'

interface BookingCardProps {
  chambre: {
    id: string | number
    nom: string
    prix: number
    disponible: boolean
  }
}

export function BookingCard({ chambre }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = nights * chambre.prix
  const tps = subtotal * 0.05      // TPS : 5%
  const tvq = subtotal * 0.09975   // TVQ : 9,975%
  const taxes = tps + tvq
  const total = subtotal + taxes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-premium p-6"
    >
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-display text-4xl font-bold text-primary-600">
          {chambre.prix}$
        </span>
        <span className="text-neutral-600">/ nuit</span>
      </div>

      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-6">
        <Tag className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">
          Économisez 20% sur 3+ nuits
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-2">
              Arrivée
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="input-custom pl-9 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-2">
              Départ
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="input-custom pl-9 text-sm"
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-2">
            Voyageurs
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="input-custom pl-9 text-sm"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num > 1 ? 'personnes' : 'personne'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {nights > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 mb-6 p-4 bg-neutral-50 rounded-xl"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">
              {chambre.prix}$ × {nights} {nights > 1 ? 'nuits' : 'nuit'}
            </span>
            <span className="font-semibold text-neutral-900">{subtotal.toFixed(2)}$</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">T.P.S (5%)</span>
            <span className="font-semibold text-neutral-900">{tps.toFixed(2)}$</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">T.V.Q (9,975%)</span>
            <span className="font-semibold text-neutral-900">{tvq.toFixed(2)}$</span>
          </div>

          <div className="h-px bg-neutral-200" />

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900">Total</span>
            <span className="font-display text-2xl font-bold text-primary-600">
              {total.toFixed(2)}$
            </span>
          </div>
        </motion.div>
      )}

      <Link
        href={`/reservation/${chambre.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
        className={`btn-gold w-full justify-center group mb-4 ${
          !chambre.disponible || !checkIn || !checkOut ? 'opacity-50 pointer-events-none' : ''
        }`}
        onClick={(e) => (!chambre.disponible || !checkIn || !checkOut) && e.preventDefault()}
      >
        <Sparkles className="h-5 w-5" />
        Réserver maintenant
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      {!chambre.disponible && (
        <div className="text-center text-sm text-red-600 mb-4">
          Cette chambre n'est pas disponible pour le moment
        </div>
      )}

      <div className="space-y-3 pt-4 border-t border-neutral-200">
        <div className="flex items-start gap-3 text-sm">
          <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-neutral-900">Annulation gratuite</div>
            <div className="text-neutral-600 text-xs">Jusqu'à 48h avant l'arrivée</div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <Sparkles className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-neutral-900">Meilleur prix garanti</div>
            <div className="text-neutral-600 text-xs">Prix direct sans intermédiaire</div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <Calendar className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-neutral-900">Confirmation immédiate</div>
            <div className="text-neutral-600 text-xs">Par email et SMS</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-xl">
        <p className="text-xs text-blue-700 text-center">
          💡 Ajoutez des services spa lors de la réservation et économisez jusqu'à 15%
        </p>
      </div>
    </motion.div>
  )
}
