'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Users, Clock, Tag, Sparkles } from 'lucide-react'

interface RecapitulatifReservationProps {
  chambre: any
  nights: number
  selectedServices: any[]
  total: number
  subtotal: number
  tps: number
  tvq: number
}

export function RecapitulatifReservation({
  chambre,
  nights,
  selectedServices,
  total,
  subtotal,
  tps,
  tvq
}: RecapitulatifReservationProps) {
  const chambrePrix = nights * chambre.prix
  const servicesPrix = selectedServices.reduce((sum, s) => sum + s.prix, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium p-6"
    >
      <h3 className="font-display text-xl font-bold text-neutral-900 mb-6">
        Récapitulatif
      </h3>

      {/* Chambre */}
      <div className="flex gap-3 mb-6 pb-6 border-b border-neutral-200">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={chambre.image}
            alt={chambre.nom}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-neutral-900">{chambre.nom}</div>
          <div className="text-sm text-neutral-600">{nights} nuit{nights > 1 ? 's' : ''}</div>
          <div className="text-sm font-semibold text-primary-600 mt-1">
            {chambrePrix}$
          </div>
        </div>
      </div>

      {/* Services */}
      {selectedServices.length > 0 && (
        <div className="mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="font-semibold text-neutral-900">Services spa</span>
          </div>
          <div className="space-y-2">
            {selectedServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-neutral-700">{service.nom}</span>
                <span className="font-semibold text-neutral-900">{service.prix}$</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Détails prix */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Sous-total</span>
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
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-primary-100">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-900">Total</span>
          <div className="text-right">
            <div className="font-display text-3xl font-bold text-primary-600">
              {total.toFixed(2)}$
            </div>
            <div className="text-xs text-neutral-600">CAD</div>
          </div>
        </div>
      </div>

      {/* Promotions */}
      {selectedServices.length > 0 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <Tag className="h-4 w-4" />
            <span className="font-semibold">
              Économie de {Math.round(servicesPrix * 0.15)}$ sur les services
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}