'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Users,
  Maximize2,
  Star,
  ChevronLeft,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Check
} from 'lucide-react'
import { getRoomById } from '@/data/rooms'
import { Room } from '@/types/room'

function ReservationContent() {
  const searchParams = useSearchParams()
  const chambreId = searchParams.get('chambreId')
  const [room, setRoom] = useState<Room | null>(null)
  const [step, setStep] = useState(1) // 1: Dates, 2: Informations, 3: Paiement

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    demandes: '',
  })

  useEffect(() => {
    if (chambreId) {
      const foundRoom = getRoomById(Number(chambreId))
      if (foundRoom) {
        setRoom(foundRoom)
      }
    }
  }, [chambreId])

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const start = new Date(formData.checkIn)
    const end = new Date(formData.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculateTotal = () => {
    if (!room) return 0
    const nights = calculateNights()
    return nights * room.prix
  }

  if (!room) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
            Chambre non trouvée
          </h2>
          <Link href="/chambres" className="btn-primary">
            Voir toutes les chambres
          </Link>
        </div>
      </div>
    )
  }

  const nights = calculateNights()
  const total = calculateTotal()

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-luxury text-white py-12">
        <div className="container-custom">
          <Link
            href="/chambres"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux chambres
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Réservation
              </h1>
              <h2 className="text-2xl text-white/90 mb-2">{room.nom}</h2>
              <div className="flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {room.capacite} personnes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="h-4 w-4" />
                  {room.superficie} m²
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
                  {room.note}
                </span>
              </div>
            </div>

            <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
              <Image
                src={room.images[0]}
                alt={room.nom}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps indicator */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Dates' },
              { num: 2, label: 'Informations' },
              { num: 3, label: 'Confirmation' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center gap-3 ${step >= s.num ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                    step > s.num
                      ? 'bg-green-500 text-white'
                      : step === s.num
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className="hidden sm:block font-medium text-sm">{s.label}</span>
                </div>
                {index < 2 && (
                  <div className={`hidden sm:block h-0.5 w-12 ${step > s.num ? 'bg-green-500' : 'bg-neutral-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                {/* Step 1: Dates */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                      Choisissez vos dates
                    </h3>

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
                              value={formData.checkIn}
                              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
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
                              value={formData.checkOut}
                              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                              min={formData.checkIn || new Date().toISOString().split('T')[0]}
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
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                            className="input-custom pl-11"
                          >
                            {Array.from({ length: room.capacite }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num}>
                                {num} {num > 1 ? 'personnes' : 'personne'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => formData.checkIn && formData.checkOut && setStep(2)}
                        disabled={!formData.checkIn || !formData.checkOut}
                        className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuer
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Informations */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                      Vos informations
                    </h3>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Prénom *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                              type="text"
                              required
                              value={formData.prenom}
                              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                              className="input-custom pl-11"
                              placeholder="Jean"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Nom *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                              type="text"
                              required
                              value={formData.nom}
                              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                              className="input-custom pl-11"
                              placeholder="Dupont"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-custom pl-11"
                            placeholder="jean.dupont@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="tel"
                            required
                            value={formData.telephone}
                            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                            className="input-custom pl-11"
                            placeholder="(418) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Adresse
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                          <textarea
                            value={formData.adresse}
                            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                            className="input-custom pl-11 min-h-[80px] resize-none"
                            placeholder="123 Rue Principale, Ville, Province"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Demandes spéciales
                        </label>
                        <textarea
                          value={formData.demandes}
                          onChange={(e) => setFormData({ ...formData, demandes: e.target.value })}
                          className="input-custom min-h-[100px] resize-none"
                          placeholder="Arrivée tardive, préférences alimentaires, etc."
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className="btn-secondary flex-1 justify-center py-4"
                        >
                          Retour
                        </button>
                        <button
                          onClick={() => formData.nom && formData.prenom && formData.email && formData.telephone && setStep(3)}
                          disabled={!formData.nom || !formData.prenom || !formData.email || !formData.telephone}
                          className="btn-primary flex-1 justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continuer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="text-center mb-8">
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
                        <Check className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="font-display text-3xl font-bold text-neutral-900 mb-2">
                        Réservation confirmée !
                      </h3>
                      <p className="text-neutral-600">
                        Un email de confirmation vous a été envoyé
                      </p>
                    </div>

                    <div className="bg-neutral-50 rounded-2xl p-6 mb-6">
                      <h4 className="font-bold text-neutral-900 mb-4">Récapitulatif</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Chambre:</span>
                          <span className="font-medium">{room.nom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Arrivée:</span>
                          <span className="font-medium">{new Date(formData.checkIn).toLocaleDateString('fr-CA')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Départ:</span>
                          <span className="font-medium">{new Date(formData.checkOut).toLocaleDateString('fr-CA')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Client:</span>
                          <span className="font-medium">{formData.prenom} {formData.nom}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-neutral-200">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold text-primary-600 text-lg">{total}$</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/"
                      className="btn-primary w-full justify-center py-4"
                    >
                      Retour à l'accueil
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Résumé */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-32">
                <h3 className="font-bold text-lg text-neutral-900 mb-4">
                  Résumé de la réservation
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  <div>
                    <p className="text-sm text-neutral-600">Chambre</p>
                    <p className="font-medium">{room.nom}</p>
                  </div>

                  {formData.checkIn && formData.checkOut && (
                    <>
                      <div>
                        <p className="text-sm text-neutral-600">Dates</p>
                        <p className="font-medium text-sm">
                          {new Date(formData.checkIn).toLocaleDateString('fr-CA')} - {new Date(formData.checkOut).toLocaleDateString('fr-CA')}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-600">Nombre de nuits</p>
                        <p className="font-medium">{nights} {nights > 1 ? 'nuits' : 'nuit'}</p>
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-sm text-neutral-600">Personnes</p>
                    <p className="font-medium">{formData.guests} {formData.guests > 1 ? 'personnes' : 'personne'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">{room.prix}$ × {nights || 0} nuit{nights > 1 ? 's' : ''}</span>
                    <span className="font-medium">{total}$</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Frais de service</span>
                    <span className="font-medium">0$</span>
                  </div>
                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="font-display text-2xl font-bold text-primary-600">{total}$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReservationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-neutral-600">Chargement...</p>
        </div>
      </div>
    }>
      <ReservationContent />
    </Suspense>
  )
}
