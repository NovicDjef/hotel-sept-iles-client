'use client'

import { use, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Elements } from '@stripe/react-stripe-js'
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
  Info,
  CheckCircle2
} from 'lucide-react'
import { ServicesSelector } from '@/components/reservation/ServicesSelector'
import { RecapitulatifReservation } from '@/components/reservation/RecapitulatifReservation'
import { FormulaireClient } from '@/components/reservation/FormulaireClient'
import { StripePaymentForm } from '@/components/reservation/StripePaymentForm'
import { generateReceiptPDF } from '@/utils/generateReceipt'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms } from '@/store/slices/roomsSlice'
import { getStripe } from '@/lib/stripe'
import {
  calculateReservationPrice,
  createGuestReservation,
  confirmReservationPayment
} from '@/services/api/routeApi'

export default function ReservationPage({ params }: { params: Promise<{ chambreId: string }> }) {
  // Unwrap params avec React.use()
  const unwrappedParams = use(params)
  const chambreId = unwrappedParams.chambreId

  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { rooms, loading } = useAppSelector((state) => state.rooms)

  const [currentStep, setCurrentStep] = useState(0) // 0 = Sélection dates, 1 = Services, 2 = Info, 3 = Paiement
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)
  const [stripePromise] = useState(() => getStripe())

  // Récupérer les paramètres de l'URL
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2)

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms())
    }
  }, [dispatch, rooms.length])

  // Récupérer les données de la chambre depuis Redux
  const room = rooms.find(r => r.id === chambreId)

  if (loading || !room) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
          <p className="text-neutral-600">Chargement de la réservation...</p>
        </div>
      </div>
    )
  }

  const chambre = {
    id: chambreId,
    nom: room.nom,
    categorie: room.categorie,
    prix: room.prix,
    image: room.images[0],
    capacite: room.capacite
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Utiliser les données calculées par le backend si disponibles, sinon calculer côté client
  const nights = calculatedPrice?.numberOfNights || calculateNights()

  // Prix de la chambre du backend (avec taxes incluses)
  const chambrePrixTotal = calculatedPrice?.totalPrice || (nights * chambre.prix)

  // Pour l'affichage, on va juste ajouter les services
  const servicesPrix = selectedServices.reduce((sum, s) => sum + s.prix, 0)
  const subtotal = chambrePrixTotal + servicesPrix
  const tps = subtotal * 0.05  // TPS 5%
  const tvq = subtotal * 0.09975  // TVQ 9.975%
  const total = subtotal + tps + tvq

  const totalPriceWithServices = subtotal + tps + tvq 

  const steps = [
    { number: 0, title: 'Dates', icon: Calendar },
    { number: 1, title: 'Services', icon: Sparkles },
    { number: 2, title: 'Informations', icon: Users },
    { number: 3, title: 'Paiement', icon: CreditCard },
  ]

  const handleNext = async () => {
    if (currentStep < 3) {
      // ÉTAPE 1 : Quand on quitte l'écran de sélection de dates, calculer le prix
      if (currentStep === 0 && checkIn && checkOut) {
        // Validation : La date de départ doit être après la date d'arrivée
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        if (checkOutDate <= checkInDate) {
          alert('La date de départ doit être au moins 1 jour après la date d\'arrivée')
          return
        }

        try {
          // Convertir les dates au format ISO complet (YYYY-MM-DDTHH:mm:ss.sssZ)
          const checkInISO = checkInDate.toISOString()
          const checkOutISO = checkOutDate.toISOString()

          console.log('📊 Calcul du prix avec:', {
            roomId: chambreId,
            checkInDate: checkInISO,
            checkOutDate: checkOutISO,
            numberOfGuests: guests,
          })

          const response = await calculateReservationPrice({
            roomId: chambreId,
            checkInDate: checkInISO,
            checkOutDate: checkOutISO,
            numberOfGuests: guests,
          })

          console.log('✅ Prix calculé:', response.data.data)
          setCalculatedPrice(response.data.data)
        } catch (error: any) {
          console.error('❌ Erreur lors du calcul du prix:', error)
          console.error('📋 Détails complets de l\'erreur:', error.response?.data)
          console.error('🔍 Détails de validation:', JSON.stringify(error.response?.data?.error, null, 2))

          // Extraire le message d'erreur le plus détaillé possible
          let errorMessage = 'Erreur lors du calcul du prix'

          if (error.response?.data?.error) {
            // Si c'est un objet d'erreurs de validation (comme Zod ou class-validator)
            const validationErrors = error.response.data.error
            if (typeof validationErrors === 'object') {
              errorMessage = 'Erreurs de validation:\n' +
                Object.entries(validationErrors)
                  .map(([field, msg]) => `- ${field}: ${msg}`)
                  .join('\n')
            } else {
              errorMessage = validationErrors.toString()
            }
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message
          }

          alert(errorMessage)
          return
        }
      }

      // ÉTAPE 2 : Quand on quitte l'écran d'informations client, créer la réservation PENDING
      if (currentStep === 2 && clientInfo) {
        try {
          // Convertir les dates au format ISO complet
          const checkInISO = new Date(checkIn).toISOString()
          const checkOutISO = new Date(checkOut).toISOString()

          console.log('📝 Création réservation avec:', {
            roomId: chambreId,
            checkInDate: checkInISO,
            checkOutDate: checkOutISO,
            numberOfGuests: guests,
            firstName: clientInfo.prenom,
            lastName: clientInfo.nom,
            email: clientInfo.email,
          })

          const response = await createGuestReservation({
            roomId: chambreId,
            checkInDate: checkInISO,
            checkOutDate: checkOutISO,
            numberOfGuests: guests,
            firstName: clientInfo.prenom,
            lastName: clientInfo.nom,
            email: clientInfo.email,
            phone: clientInfo.telephone,
            address: clientInfo.adresse,
            specialRequests: clientInfo.commentaires,
          })

          console.log('✅ Réservation créée:', response.data.data)
          setReservationId(response.data.data.reservation.id)
        } catch (error: any) {
          console.error('❌ Erreur lors de la création de la réservation:', error)
          console.error('Détails de l\'erreur:', error.response?.data)

          const errorMessage = error.response?.data?.message ||
                             error.response?.data?.error ||
                             'Erreur lors de la création de la réservation'
          alert(errorMessage)
          return
        }
      }

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

  // ÉTAPE 3 : Gérer le paiement Stripe
  const handlePaymentSuccess = async (paymentMethodId: string) => {
    if (!reservationId) {
      alert('Erreur: ID de réservation manquant')
      return
    }

    setPaymentProcessing(true)
    try {
      const response = await confirmReservationPayment(reservationId, {
        paymentMethodId,
      })

      const confirmedReservation = response.data.data

      // Générer le reçu PDF
      const receiptData = {
        reservationNumber: confirmedReservation.reservationNumber,
        date: new Date().toLocaleDateString('fr-CA'),
        chambre: {
          nom: chambre.nom,
          categorie: chambre.categorie,
          prix: chambre.prix,
        },
        dateDebut: checkIn,
        dateFin: checkOut,
        nombreNuits: nights,
        nombrePersonnes: guests,
        client: {
          nom: clientInfo?.nom || '',
          prenom: clientInfo?.prenom || '',
          email: clientInfo?.email || '',
          telephone: clientInfo?.telephone || '',
          adresse: clientInfo?.adresse || '',
        },
        services: selectedServices.map(s => ({
          nom: s.nom,
          prix: s.prix,
          date: s.date,
        })),
        subtotal,
        tps,
        tvq,
        total,
      }

      generateReceiptPDF(receiptData)

      // Rediriger vers la page de confirmation
      alert('Paiement confirmé ! Votre reçu a été téléchargé.')
      router.push(`/reservation/confirmation/${confirmedReservation.id}`)
    } catch (error: any) {
      console.error('Erreur lors de la confirmation du paiement:', error)
      alert(error.response?.data?.message || 'Erreur lors du paiement')
    } finally {
      setPaymentProcessing(false)
    }
  }

  const handlePaymentError = (error: string) => {
    console.error('Erreur de paiement:', error)
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-neutral-50 to-white">
      {/* Header avec bouton retour */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-custom py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Retour</span>
          </button>
        </div>
      </section>

      {/* Stepper Centralisé */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-6">
          {/* Stepper horizontal centralisé */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      {/* Icône avec animation */}
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-600 text-white'
                            : isActive
                            ? 'bg-primary-600 text-white ring-2 ring-primary-200'
                            : 'bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}

                        {/* Numéro de l'étape */}
                        <div
                          className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                            isCompleted || isActive
                              ? 'bg-white text-primary-600'
                              : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          {step.number + 1}
                        </div>
                      </div>

                      {/* Titre de l'étape */}
                      <span
                        className={`mt-2 text-xs font-medium transition-colors ${
                          isActive
                            ? 'text-primary-700'
                            : isCompleted
                            ? 'text-green-700'
                            : 'text-neutral-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {/* Ligne de connexion entre les étapes */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block relative flex-1 mx-2" style={{ maxWidth: '80px' }}>
                        <div className="h-0.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isCompleted
                                ? 'bg-green-600 w-full'
                                : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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
                              min={checkIn ? new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                              className="input-custom pl-11"
                            />
                          </div>
                          {checkIn && (
                            <p className="text-xs text-neutral-500 mt-1">
                              La date de départ doit être au moins 1 jour après la date d'arrivée
                            </p>
                          )}
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
                          {calculatedPrice ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-semibold text-green-700">
                                  Disponibilité confirmée
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-neutral-700">Durée du séjour:</span>
                                <span className="font-bold text-primary-700">
                                  {calculatedPrice.numberOfNights} {calculatedPrice.numberOfNights > 1 ? 'nuits' : 'nuit'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-700">Prix de la chambre:</span>
                                <span className="font-display text-2xl font-bold text-primary-600">
                                  {calculatedPrice.totalPrice}$
                                </span>
                              </div>
                              <div className="text-xs text-neutral-600 mt-2">
                                Prix calculé par le système de réservation
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-neutral-700">Durée du séjour:</span>
                                <span className="font-bold text-primary-700">
                                  {calculateNights()} {calculateNights() > 1 ? 'nuits' : 'nuit'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-700">Prix estimé:</span>
                                <span className="font-display text-2xl font-bold text-primary-600">
                                  {totalPriceWithServices.toFixed(2)}$
                                </span>
                              </div>
                              <div className="text-xs text-neutral-600 mt-2">
                                {chambre.prix}$ × {calculateNights()} {calculateNights() > 1 ? 'nuits' : 'nuit'}
                              </div>
                            </>
                          )}
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
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        loading={paymentProcessing}
                      />
                    </Elements>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              {currentStep !== 3 && (
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
                    onClick={handleNext}
                    disabled={
                      (currentStep === 0 && (!checkIn || !checkOut)) ||
                      (currentStep === 2 && !clientInfo)
                    }
                    className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <RecapitulatifReservation
                  chambre={chambre}
                  nights={nights}
                  selectedServices={selectedServices}
                  total={total}
                  subtotal={0}
                  tps={0}
                  tvq={0}
                  chambrePrix={chambrePrixTotal}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}