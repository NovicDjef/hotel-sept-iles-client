'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Users,
  Clock,
  ChevronLeft,
  User,
  Mail,
  Phone,
  Check,
  UtensilsCrossed,
  MessageSquare,
  AlertCircle,
  CreditCard,
  Lock,
  DollarSign
} from 'lucide-react'

export default function RestaurantReservationPage() {
  const [step, setStep] = useState(1) // 1: Date/Heure, 2: Informations, 3: Paiement, 4: Confirmation
  const DEPOSIT_AMOUNT = 50 // Montant de la garantie en $

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    demandes: '',
    // Informations de paiement
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  // Créneaux horaires disponibles
  const timeSlots = {
    lunch: ['11:30', '12:00', '12:30', '13:00', '13:30'],
    dinner: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
  }

  const occasions = [
    'Repas d\'affaires',
    'Anniversaire',
    'Rendez-vous romantique',
    'Célébration familiale',
    'Autre'
  ]

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-luxury text-white py-12">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Réservation de table
              </h1>
              <h2 className="text-2xl text-white/90 mb-2">Restaurant de l'Hôtel Sept-Îles</h2>
              <p className="text-white/80">
                Savourez une expérience culinaire exceptionnelle dans un cadre élégant
              </p>
            </div>

            <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                alt="Restaurant de l'Hôtel Sept-Îles"
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
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {[
              { num: 1, label: 'Date & Heure' },
              { num: 2, label: 'Informations' },
              { num: 3, label: 'Paiement' },
              { num: 4, label: 'Confirmation' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${step >= s.num ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm flex-shrink-0 ${
                    step > s.num
                      ? 'bg-green-500 text-white'
                      : step === s.num
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className="hidden md:block font-medium text-sm whitespace-nowrap">{s.label}</span>
                </div>
                {index < 3 && (
                  <div className={`hidden sm:block h-0.5 w-8 flex-shrink-0 ${step > s.num ? 'bg-green-500' : 'bg-neutral-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            {/* Step 1: Date & Heure */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900">
                      Choisissez votre date et heure
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Sélectionnez la date et l'heure de votre réservation
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Date de réservation *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-custom pl-11"
                      />
                    </div>
                  </div>

                  {/* Heure */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Heure de réservation *
                    </label>

                    <div className="space-y-4">
                      {/* Déjeuner */}
                      <div>
                        <p className="text-sm text-neutral-600 mb-2 font-medium">Déjeuner (11h30 - 14h00)</p>
                        <div className="grid grid-cols-5 gap-2">
                          {timeSlots.lunch.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, time })}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                                formData.time === time
                                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dîner */}
                      <div>
                        <p className="text-sm text-neutral-600 mb-2 font-medium">Dîner (17h30 - 22h00)</p>
                        <div className="grid grid-cols-5 gap-2">
                          {timeSlots.dinner.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, time })}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                                formData.time === time
                                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nombre de personnes */}
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
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num > 1 ? 'personnes' : 'personne'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Pour les groupes de plus de 20 personnes, veuillez nous contacter directement
                    </p>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Occasion (optionnel)
                    </label>
                    <div className="relative">
                      <UtensilsCrossed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="input-custom pl-11"
                      >
                        <option value="">Sélectionnez une occasion</option>
                        {occasions.map((occasion) => (
                          <option key={occasion} value={occasion}>
                            {occasion}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Note importante */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">À noter</p>
                      <p>Les réservations sont maintenues pendant 15 minutes. En cas de retard, veuillez nous contacter.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => formData.date && formData.time && setStep(2)}
                    disabled={!formData.date || !formData.time}
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900">
                      Vos informations
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Pour confirmer votre réservation
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Nom et Prénom */}
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

                  {/* Email */}
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
                    <p className="text-xs text-neutral-500 mt-1">
                      Nous vous enverrons une confirmation par email
                    </p>
                  </div>

                  {/* Téléphone */}
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
                    <p className="text-xs text-neutral-500 mt-1">
                      En cas de besoin, nous pourrons vous contacter
                    </p>
                  </div>

                  {/* Demandes spéciales */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Demandes spéciales ou allergies alimentaires
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <textarea
                        value={formData.demandes}
                        onChange={(e) => setFormData({ ...formData, demandes: e.target.value })}
                        className="input-custom pl-11 min-h-[100px] resize-none"
                        placeholder="Ex: Allergie aux arachides, végétarien, chaise haute pour bébé, décoration spéciale..."
                      />
                    </div>
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
                      Continuer vers le paiement
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Paiement */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900">
                      Garantie de réservation
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Paiement sécurisé de {DEPOSIT_AMOUNT}$ pour confirmer votre réservation
                    </p>
                  </div>
                </div>

                {/* Explication du système */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Comment fonctionne la garantie ?</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p className="flex items-start gap-2">
                          <span className="font-bold">1.</span>
                          <span>Vous payez <strong>{DEPOSIT_AMOUNT}$</strong> maintenant pour garantir votre réservation</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="font-bold">2.</span>
                          <span>Ce montant sera <strong>automatiquement déduit</strong> de votre facture au restaurant</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="font-bold">3.</span>
                          <span>Exemple : Si votre repas coûte 150$, vous ne paierez que <strong>100$</strong> sur place</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-900">
                      <strong>💡 Politique d'annulation :</strong> Annulation gratuite jusqu'à 24h avant votre réservation.
                      Après ce délai, les {DEPOSIT_AMOUNT}$ ne seront pas remboursés.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Nom sur la carte */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Nom sur la carte *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="input-custom pl-11"
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>

                  {/* Numéro de carte */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Numéro de carte *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => {
                          // Format: XXXX XXXX XXXX XXXX
                          const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
                          if (value.replace(/\s/g, '').length <= 16) {
                            setFormData({ ...formData, cardNumber: value })
                          }
                        }}
                        className="input-custom pl-11"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Lock className="h-3 w-3 text-green-600" />
                      <p className="text-xs text-green-600">
                        Paiement sécurisé avec cryptage SSL
                      </p>
                    </div>
                  </div>

                  {/* Date d'expiration et CVV */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Date d'expiration *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => {
                          // Format: MM/YY
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4)
                          }
                          if (value.length <= 5) {
                            setFormData({ ...formData, expiryDate: value })
                          }
                        }}
                        className="input-custom"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 3) {
                            setFormData({ ...formData, cvv: value })
                          }
                        }}
                        className="input-custom"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  {/* Montant à payer */}
                  <div className="bg-gradient-luxury text-white rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm mb-1">Montant à payer maintenant</p>
                        <p className="font-display text-4xl font-bold">{DEPOSIT_AMOUNT}$</p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                        <DollarSign className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mt-3">
                      Ce montant sera déduit de votre addition au restaurant
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1 justify-center py-4"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => {
                        if (formData.cardNumber.replace(/\s/g, '').length === 16 &&
                            formData.cardName &&
                            formData.expiryDate.length === 5 &&
                            formData.cvv.length === 3) {
                          setStep(4)
                        }
                      }}
                      disabled={
                        formData.cardNumber.replace(/\s/g, '').length !== 16 ||
                        !formData.cardName ||
                        formData.expiryDate.length !== 5 ||
                        formData.cvv.length !== 3
                      }
                      className="btn-gold flex-1 justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Lock className="h-4 w-4" />
                      Payer {DEPOSIT_AMOUNT}$ et confirmer
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
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
                  <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-primary-600" />
                    Récapitulatif de votre réservation
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-600">Restaurant:</span>
                      <span className="font-medium text-right">Restaurant de l'Hôtel Sept-Îles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Date:</span>
                      <span className="font-medium">{new Date(formData.date).toLocaleDateString('fr-CA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Heure:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Nombre de personnes:</span>
                      <span className="font-medium">{formData.guests} {formData.guests > 1 ? 'personnes' : 'personne'}</span>
                    </div>
                    {formData.occasion && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Occasion:</span>
                        <span className="font-medium">{formData.occasion}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-neutral-200">
                      <span className="text-neutral-600">Client:</span>
                      <span className="font-medium">{formData.prenom} {formData.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Téléphone:</span>
                      <span className="font-medium">{formData.telephone}</span>
                    </div>
                    {formData.demandes && (
                      <div className="pt-3 border-t border-neutral-200">
                        <span className="text-neutral-600 block mb-1">Demandes spéciales:</span>
                        <span className="font-medium text-neutral-800">{formData.demandes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations de paiement */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Paiement confirmé
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-800">Garantie payée:</span>
                      <span className="font-bold text-green-900">{DEPOSIT_AMOUNT}$</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-100">
                      <p className="text-green-800 text-xs">
                        <strong>💳 Mode de paiement:</strong> Carte se terminant par {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-green-200">
                      <p className="text-green-800 text-sm">
                        <strong className="font-semibold">Rappel :</strong> Ce montant de {DEPOSIT_AMOUNT}$ sera automatiquement déduit
                        de votre addition au restaurant. Si votre repas coûte 150$, vous ne paierez que 100$ sur place.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-900">
                    <strong className="font-semibold">Important :</strong> Votre table sera maintenue pendant 15 minutes après l'heure de réservation.
                    En cas de retard, veuillez nous contacter au <strong>(418) 962-2581</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="btn-secondary flex-1 justify-center py-4"
                  >
                    Retour à l'accueil
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-primary flex-1 justify-center py-4"
                  >
                    Nous contacter
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Informations supplémentaires */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <Clock className="h-8 w-8 text-primary-600 mb-3" />
                <h4 className="font-bold text-neutral-900 mb-2">Horaires</h4>
                <p className="text-sm text-neutral-600">
                  Déjeuner: 11h30 - 14h00<br />
                  Dîner: 17h30 - 22h00
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <Phone className="h-8 w-8 text-primary-600 mb-3" />
                <h4 className="font-bold text-neutral-900 mb-2">Contact</h4>
                <p className="text-sm text-neutral-600">
                  (418) 962-2581<br />
                  restaurant@septiles.com
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <UtensilsCrossed className="h-8 w-8 text-primary-600 mb-3" />
                <h4 className="font-bold text-neutral-900 mb-2">Politique</h4>
                <p className="text-sm text-neutral-600">
                  Annulation gratuite<br />
                  jusqu'à 24h avant
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
