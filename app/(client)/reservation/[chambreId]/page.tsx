'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  Calendar,
  Users,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Clock,
  Tag,
  CreditCard,
  ShieldCheck,
  Info
} from 'lucide-react'
import { ServicesSelector } from '@/components/reservation/ServicesSelector'
import { RecapitulatifReservation } from '@/components/reservation/RecapitulatifReservation'
import { FormulaireClient } from '@/components/reservation/FormulaireClient'
import { getRoomById } from '@/data/rooms'

export default function ReservationPage({ params }: { params: { chambreId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0) // 0 = Sélection dates, 1 = Services, 2 = Info, 3 = Paiement
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [clientInfo, setClientInfo] = useState<any>(null)

  // Récupérer les paramètres de l'URL
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2)

  // Récupérer les données de la chambre
  const room = getRoomById(Number(params.chambreId))
  const chambre = room ? {
    id: params.chambreId,
    nom: room.nom,
    categorie: room.categorie,
    prix: room.prix,
    image: room.images[0],
    capacite: room.capacite
  } : {
    id: params.chambreId,
    nom: 'Suite Royale',
    categorie: 'Premium',
    prix: 299,
    image: '/images/rooms/suite-royale-1.svg',
    capacite: 2
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const chambrePrix = nights * chambre.prix
  const servicesPrix = selectedServices.reduce((sum, s) => sum + s.prix, 0)
  const subtotal = chambrePrix + servicesPrix
  const tps = subtotal * 0.05      // TPS : 5%
  const tvq = subtotal * 0.09975   // TVQ : 9,975%
  const taxes = tps + tvq
  const total = subtotal + taxes

  const steps = [
    { number: 0, title: 'Dates', icon: Calendar },
    { number: 1, title: 'Services', icon: Sparkles },
    { number: 2, title: 'Informations', icon: Users },
    { number: 3, title: 'Paiement', icon: CreditCard },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Retour</span>
            </button>

            {/* Stepper */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isActive ? 'text-primary-600' : 'text-neutral-600'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-px w-12 ${
                          isCompleted ? 'bg-green-500' : 'bg-neutral-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile step indicator */}
            <div className="md:hidden text-sm font-medium text-neutral-600">
              Étape {currentStep + 1}/4
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              {/* Récapitulatif réservation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 mb-6"
              >
                <div className="flex items-start gap-4">
                  {/* Image chambre */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={chambre.image}
                      alt={chambre.nom}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <span className="badge-gold mb-2">{chambre.categorie}</span>
                    <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      {chambre.nom}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                      {checkIn && checkOut ? (
                        <>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(checkIn).toLocaleDateString('fr-CA')} -{' '}
                              {new Date(checkOut).toLocaleDateString('fr-CA')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{guests} personne{guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <Info className="h-4 w-4" />
                          <span className="font-medium">Veuillez sélectionner vos dates de séjour</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-primary-600">
                      {chambre.prix}$
                    </div>
                    <div className="text-sm text-neutral-600">par nuit</div>
                  </div>
                </div>
              </motion.div>

              {/* Contenu selon l'étape */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Sélection des dates */}
                {currentStep === 0 && (
                  <div className="card p-6">
                    <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                      Sélectionnez vos dates de séjour
                    </h2>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Date d'arrivée *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                              type="date"
                              required
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="input-custom pl-11"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Date de départ *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                              type="date"
                              required
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              min={checkIn || new Date().toISOString().split('T')[0]}
                              className="input-custom pl-11"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Nombre de personnes *
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="input-custom pl-11"
                          >
                            {Array.from({ length: chambre.capacite }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num}>
                                {num} {num > 1 ? 'personnes' : 'personne'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Afficher le nombre de nuits et le prix */}
                      {checkIn && checkOut && (
                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-700">Durée du séjour:</span>
                            <span className="font-bold text-primary-700">
                              {calculateNights()} {calculateNights() > 1 ? 'nuits' : 'nuit'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-700">Prix estimé:</span>
                            <span className="font-display text-2xl font-bold text-primary-600">
                              {chambre.prix * calculateNights()}$
                            </span>
                          </div>
                          <div className="text-xs text-neutral-600 mt-2">
                            {chambre.prix}$ × {calculateNights()} {calculateNights() > 1 ? 'nuits' : 'nuit'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <ServicesSelector
                    selectedServices={selectedServices}
                    onServicesChange={setSelectedServices}
                    checkIn={checkIn}
                    checkOut={checkOut}
                  />
                )}

                {currentStep === 2 && (
                  <FormulaireClient
                    onClientInfoChange={setClientInfo}
                    initialData={clientInfo}
                  />
                )}

                {currentStep === 3 && (
                  <div className="card p-6">
                    <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                      Paiement sécurisé
                    </h2>
                    <div className="space-y-6">
                      {/* Informations de paiement */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-blue-900 mb-1">
                            Paiement 100% sécurisé
                          </div>
                          <div className="text-sm text-blue-700">
                            Vos informations sont cryptées et protégées par Stripe
                          </div>
                        </div>
                      </div>

                      {/* Formulaire de paiement (Stripe) */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Numéro de carte
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="input-custom"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Date d'expiration
                            </label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="input-custom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="input-custom"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Conditions */}
                      <label className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          J'accepte les{' '}
                          <a href="/conditions" className="text-primary-600 hover:underline">
                            conditions générales
                          </a>{' '}
                          et la{' '}
                          <a href="/confidentialite" className="text-primary-600 hover:underline">
                            politique de confidentialité
                          </a>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                <button
                  onClick={currentStep === 3 ? () => alert('Paiement en cours...') : handleNext}
                  disabled={currentStep === 0 && (!checkIn || !checkOut)}
                  className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 3 ? (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Confirmer et payer {total.toFixed(2)}$
                    </>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar - Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <RecapitulatifReservation
                  chambre={chambre}
                  nights={nights}
                  selectedServices={selectedServices}
                  total={total}
                  subtotal={subtotal}
                  tps={tps}
                  tvq={tvq}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}