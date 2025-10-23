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
  chambrePrix?: number // Prix calculé par le backend
}

export function RecapitulatifReservation({
  chambre,
  nights,
  selectedServices,
  total,
  subtotal,
  tps,
  tvq,
  chambrePrix: backendChambrePrixTotal
}: RecapitulatifReservationProps) {
  // Le prix du backend inclut les taxes
  const chambrePrixTotal = backendChambrePrixTotal || (nights * chambre.prix)

  // Calculer le prix de base (sans taxes) pour la simulation
  const prixParNuit = chambre.prix
  const totalBase = prixParNuit * nights

  // Services spa avec réduction de 10%
  const servicesPrixOriginal = selectedServices.reduce((sum, s) => sum + (s.prixSelectionne || s.prix || 0), 0)
  const servicesReduction = servicesPrixOriginal * 0.10  // 10% de réduction
  const totalBaseSpa = servicesPrixOriginal * 0.9  // Prix après réduction

  const taxesTPS = totalBase * 0.05
  const taxesTVQ = totalBase * 0.09975
  const taxesTPSspa = totalBaseSpa * 0.05
  const taxesTVQspa = totalBaseSpa * 0.09975

  const totalTaxes = taxesTPS + taxesTVQ + chambrePrixTotal

  const servicesPrix = totalBaseSpa

  const prixTotal = taxesTPSspa + taxesTVQspa + servicesPrix

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
      <div className="mb-6 pb-6 border-b border-neutral-200">
        <div className="flex gap-3 mb-3">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={chambre.image}
              alt={chambre.nom}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-neutral-900">{chambre.nom}</div>
            <div className="text-sm text-neutral-600">{nights} nuit{nights > 1 ? 's' : ''}</div>
          </div>
        </div>
        {/* Détail du calcul avec simulation des taxes */}
        <div className="bg-neutral-50 rounded-lg p-3 space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Prix par nuit</span>
            <span className="font-medium text-neutral-900">{prixParNuit.toFixed(2)}$</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Nombre de nuits</span>
            <span className="font-medium text-neutral-900">× {nights}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">T.P.S (5%)</span>
            <span className="font-medium text-neutral-900">{taxesTPS.toFixed(2)}$</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">T.V.Q (9,975%)</span>
            <span className="font-medium text-neutral-900">{taxesTVQ.toFixed(2)}$</span>
          </div>
          <div className="h-px bg-neutral-200 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-700">Total chambre</span>
            <span className="font-semibold text-primary-600">{totalTaxes.toFixed(2)}$</span>
          </div>
        </div>
      </div>

      {/* Services */}
      {selectedServices.length > 0 && (
        <div className="mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="font-semibold text-neutral-900">Services spa</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
              -10%
            </span>
          </div>
          <div className="space-y-2">
            {selectedServices.map((service, index) => {
              const prixOriginal = service.prixSelectionne || service.prix || 0
              const prixReduit = prixOriginal * 0.9
              return (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{service.nom}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 line-through text-xs">{prixOriginal.toFixed(2)}$</span>
                    <span className="font-semibold text-green-600">{prixReduit.toFixed(2)}$</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Services ajoutés au total chambre */}
      {servicesPrix > 0 && (
        <div className="space-y-2 mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Total services</span>
            <span className="font-semibold text-neutral-900">{prixTotal.toFixed(2)}$</span>
          </div>
        </div>
      )}

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
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-600 rounded-full p-1.5">
              <Tag className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold text-green-900 text-sm">
              Réduction réservation de chambre
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-green-700">
              <span>Prix original services :</span>
              <span className="line-through">{servicesPrixOriginal.toFixed(2)}$</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>Réduction (-10%) :</span>
              <span>-{servicesReduction.toFixed(2)}$</span>
            </div>
            <div className="flex justify-between text-green-900 font-bold text-sm pt-1">
              <span>Économisez :</span>
              <span>{servicesReduction.toFixed(2)}$</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}