'use client'

import React, { useState } from 'react'
import { useCreateReservation, useRoomAvailability } from '@/hooks/useRoomAvailability'
import { AvailabilityDisplay } from './AvailabilityDisplay'
import { Calendar, Users, Mail, Phone, User, MessageSquare, Check } from 'lucide-react'

export const EnhancedReservationForm: React.FC = () => {
  // État du formulaire
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [selectedRoomType, setSelectedRoomType] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // État de l'interface
  const [step, setStep] = useState<'dates' | 'room' | 'details' | 'confirmation'>(
    'dates'
  )

  // Hooks
  const { hasAvailableRooms, getTypeAvailability, loading: checkingAvailability } =
    useRoomAvailability(checkInDate, checkOutDate)

  const { createReservation, reservation, loading, error } = useCreateReservation()

  /**
   * Passer à l'étape suivante
   */
  const handleNext = () => {
    if (step === 'dates' && checkInDate && checkOutDate) {
      setStep('room')
    } else if (step === 'room' && selectedRoomType) {
      setStep('details')
    }
  }

  /**
   * Soumettre la réservation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!selectedRoomType || !checkInDate || !checkOutDate) {
      alert('Veuillez remplir tous les champs requis')
      return
    }

    if (!hasAvailableRooms(selectedRoomType)) {
      alert('Ce type de chambre n\'est plus disponible')
      return
    }

    try {
      await createReservation(
        selectedRoomType,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        {
          firstName,
          lastName,
          email,
          phone,
        },
        specialRequests || undefined
      )

      setStep('confirmation')
    } catch (err) {
      console.error('Erreur lors de la réservation:', err)
    }
  }

  /**
   * Recommencer
   */
  const handleReset = () => {
    setCheckInDate('')
    setCheckOutDate('')
    setSelectedRoomType('')
    setNumberOfGuests(1)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setSpecialRequests('')
    setStep('dates')
  }

  // Afficher la confirmation
  if (step === 'confirmation' && reservation) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Réservation Confirmée !
            </h2>
            <p className="text-green-700 mb-6">
              Votre réservation a été enregistrée avec succès
            </p>

            <div className="bg-white rounded-lg p-6 text-left mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">N° de réservation</p>
                  <p className="font-semibold text-gray-800">
                    {reservation.reservationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Chambre assignée</p>
                  <p className="font-semibold text-gray-800">
                    N° {reservation.roomNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Type de chambre</p>
                  <p className="font-semibold text-gray-800">{reservation.roomType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Montant total</p>
                  <p className="font-semibold text-gray-800">
                    {reservation.totalPrice.toFixed(2)} $
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Arrivée</p>
                  <p className="font-semibold text-gray-800">{reservation.checkInDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Départ</p>
                  <p className="font-semibold text-gray-800">
                    {reservation.checkOutDate}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Un email de confirmation a été envoyé à <strong>{email}</strong>
            </p>

            <button
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Nouvelle réservation
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Réserver une chambre
        </h1>

        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-between mb-8">
          {['Dates', 'Chambre', 'Informations'].map((label, index) => {
            const stepNames = ['dates', 'room', 'details']
            const currentStepIndex = stepNames.indexOf(step)
            const isActive = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={label} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div
                    className={`w-20 h-1 mx-4 ${
                      index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Étape 1: Sélection des dates */}
        {step === 'dates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date d'arrivée
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 md:h-auto"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date de départ
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 md:h-auto"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Nombre de personnes
              </label>
              <select
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                className="w-full px-3 md:px-4 py-2.5 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-11 md:h-auto"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} personne{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNext}
              disabled={!checkInDate || !checkOutDate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vérifier la disponibilité
            </button>
          </div>
        )}

        {/* Étape 2: Sélection de la chambre */}
        {step === 'room' && (
          <div className="space-y-6">
            <AvailabilityDisplay
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onRoomTypeSelect={setSelectedRoomType}
              selectedRoomType={selectedRoomType}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setStep('dates')}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Retour
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedRoomType || !hasAvailableRooms(selectedRoomType)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 3: Informations du client */}
        {step === 'details' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Prénom *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Nom *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-1" />
                Demandes spéciales (optionnel)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Allergies, préférences, etc."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('room')}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={loading || checkingAvailability}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Réservation en cours...' : 'Confirmer la réservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
