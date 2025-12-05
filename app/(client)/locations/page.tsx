'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  Building2,
  Users,
  Calendar,
  Presentation,
  Briefcase,
  Heart,
  Music,
  Gamepad2,
  Trophy,
  Check,
  Wifi,
  Coffee,
  Car,
  Projector,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  ArrowRight
} from 'lucide-react'

export default function LocationsPage() {
  const [activeTab, setActiveTab] = useState('salles')
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const [quoteForm, setQuoteForm] = useState({
    type: '',
    salle: '',
    date: '',
    duree: '',
    guests: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    message: ''
  })

  const tabs = [
    { id: 'salles', name: 'Salles de réception', icon: Heart },
    { id: 'bureaux', name: 'Bureaux & Réunions', icon: Briefcase },
    { id: 'jeux', name: 'Espaces jeux & Loto', icon: Gamepad2 }
  ]

  const sallesReception = [
    {
      name: 'Salle Multi-Main',
      capacity: '200-300 personnes',
      size: '400 m²',
      description: 'Notre plus grande salle, idéale pour les mariages, galas et grandes célébrations',
      features: [
        'Espace modulable selon vos besoins',
        'Système audio et éclairage professionnel',
        'Scène équipée pour spectacles',
        'Cuisine adjacente pour traiteur',
        'Décoration personnalisable',
        'Piste de danse spacieuse'
      ],
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c6f1?q=80&w=2098&auto=format&fit=crop',
      idealFor: ['Mariages', 'Galas', 'Conférences', 'Grandes réceptions']
    },
    {
      name: 'Salle Basques',
      capacity: '80-120 personnes',
      size: '150 m²',
      description: 'Salle élégante et chaleureuse, parfaite pour les événements intimes',
      features: [
        'Ambiance conviviale',
        'Système audio-visuel inclus',
        'Espace cocktail séparé',
        'Décoration raffinée',
        'Accès terrasse (saison estivale)',
        'Parking privé'
      ],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
      idealFor: ['Anniversaires', 'Réceptions familiales', 'Cocktails', 'Fêtes d\'entreprise']
    },
    {
      name: 'Salle Côte-Nord',
      capacity: '50-80 personnes',
      size: '100 m²',
      description: 'Salle intime avec vue panoramique, idéale pour les célébrations privées',
      features: [
        'Vue sur la ville',
        'Éclairage d\'ambiance',
        'Bar intégré',
        'Mobilier élégant',
        'Climatisation',
        'Service traiteur disponible'
      ],
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop',
      idealFor: ['Baptêmes', 'Communions', 'Fiançailles', 'Réunions familiales']
    }
  ]

  const espacesBureaux = [
    {
      name: 'Bureaux exécutifs',
      capacity: '1-4 personnes',
      description: 'Bureaux privés entièrement équipés pour le travail individuel ou en petite équipe',
      features: [
        'Mobilier ergonomique',
        'Internet haute vitesse',
        'Ligne téléphonique privée',
        'Imprimante/Scanner',
        'Accès 24/7',
        'Service de secrétariat disponible'
      ],
      tarif: 'À partir de 500$/mois'
    },
    {
      name: 'Salles de réunion',
      capacity: '6-20 personnes',
      description: 'Salles modulables équipées pour vos réunions et formations',
      features: [
        'Écran de projection',
        'Vidéoconférence',
        'Tableau blanc',
        'Wi-Fi gratuit',
        'Service de restauration',
        'Réservation à l\'heure ou à la journée'
      ],
      tarif: 'À partir de 75$/heure'
    },
    {
      name: 'Espace coworking',
      capacity: '10-30 personnes',
      description: 'Espace de travail collaboratif et convivial',
      features: [
        'Postes de travail flexibles',
        'Salles de réunion partagées',
        'Coin café',
        'Réseau professionnel',
        'Événements networking',
        'Forfaits mensuels disponibles'
      ],
      tarif: 'À partir de 35$/jour'
    }
  ]

  const espacesJeux = [
    {
      name: 'Salle de machines à sous',
      capacity: '50-100 personnes',
      description: 'Espace moderne avec une sélection variée de machines de jeux',
      features: [
        '40+ machines à sous récentes',
        'Bar avec service complet',
        'Espace lounge confortable',
        'Écrans pour événements sportifs',
        'Atmosphère conviviale',
        'Service de restauration'
      ]
    },
    {
      name: 'Espace Loto-Québec',
      capacity: '30-60 personnes',
      description: 'Salle dédiée aux tirages et événements Loto-Québec',
      features: [
        'Billetterie Loto-Québec',
        'Écrans de diffusion en direct',
        'Organisation de tournois',
        'Espace bingo',
        'Service de bar',
        'Animations régulières'
      ]
    },
    {
      name: 'Salle de jeux de table',
      capacity: '20-40 personnes',
      description: 'Espace de divertissement avec jeux de table variés',
      features: [
        'Tables de billard',
        'Jeux de fléchettes',
        'Tables de poker',
        'Écrans géants',
        'Bar à proximité',
        'Location privée disponible'
      ]
    }
  ]

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous pourrez intégrer l'envoi du formulaire à votre backend
    alert('Votre demande de devis a été envoyée avec succès ! Nous vous contacterons sous 24h.')
    setShowQuoteForm(false)
    setQuoteForm({
      type: '',
      salle: '',
      date: '',
      duree: '',
      guests: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      entreprise: '',
      message: ''
    })
  }

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
                Location d'espaces
              </h1>
              <h2 className="text-2xl text-white/90 mb-2">Des espaces pour tous vos événements</h2>
              <p className="text-white/80">
                Salles de réception, bureaux professionnels, espaces de jeux et bien plus encore
              </p>
            </div>

            <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
                alt="Espaces de location"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom max-w-6xl">
          {/* Salles de réception */}
          {activeTab === 'salles' && (
            <motion.div
              key="salles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-3">
                  Salles de réception pour vos célébrations
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Des espaces élégants et modulables pour mariages, anniversaires et événements spéciaux
                </p>
              </div>

              {sallesReception.map((salle, index) => (
                <motion.div
                  key={salle.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={salle.image}
                        alt={salle.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-8">
                      <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                        {salle.name}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {salle.capacity}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {salle.size}
                        </span>
                      </div>

                      <p className="text-neutral-600 mb-4">
                        {salle.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-neutral-900 mb-2">Idéal pour :</h4>
                        <div className="flex flex-wrap gap-2">
                          {salle.idealFor.map((type) => (
                            <span
                              key={type}
                              className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {salle.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-neutral-600">
                            <Check className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setQuoteForm({ ...quoteForm, type: 'reception', salle: salle.name })
                          setShowQuoteForm(true)
                        }}
                        className="btn-primary w-full justify-center"
                      >
                        Demander un devis
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bureaux */}
          {activeTab === 'bureaux' && (
            <motion.div
              key="bureaux"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-3">
                  Espaces de travail professionnels
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Bureaux privés, salles de réunion et espaces de coworking entièrement équipés
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {espacesBureaux.map((espace, index) => (
                  <motion.div
                    key={espace.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                      <Briefcase className="h-6 w-6 text-primary-600" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      {espace.name}
                    </h3>

                    <p className="text-sm text-neutral-600 mb-1">
                      <Users className="h-4 w-4 inline mr-1" />
                      {espace.capacity}
                    </p>

                    <p className="text-neutral-600 text-sm mb-4">
                      {espace.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {espace.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                          <Check className="h-3 w-3 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-neutral-200 mb-4">
                      <p className="text-sm font-semibold text-primary-600">{espace.tarif}</p>
                    </div>

                    <button
                      onClick={() => {
                        setQuoteForm({ ...quoteForm, type: 'bureau', salle: espace.name })
                        setShowQuoteForm(true)
                      }}
                      className="btn-secondary w-full justify-center text-sm"
                    >
                      Demander un devis
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Espaces jeux */}
          {activeTab === 'jeux' && (
            <motion.div
              key="jeux"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-3">
                  Espaces de divertissement
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Machines de jeux, Loto-Québec et espaces de divertissement
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {espacesJeux.map((espace, index) => (
                  <motion.div
                    key={espace.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                      <Gamepad2 className="h-6 w-6 text-amber-600" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      {espace.name}
                    </h3>

                    <p className="text-sm text-neutral-600 mb-1">
                      <Users className="h-4 w-4 inline mr-1" />
                      {espace.capacity}
                    </p>

                    <p className="text-neutral-600 text-sm mb-4">
                      {espace.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {espace.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                          <Check className="h-3 w-3 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setQuoteForm({ ...quoteForm, type: 'jeux', salle: espace.name })
                        setShowQuoteForm(true)
                      }}
                      className="btn-secondary w-full justify-center text-sm"
                    >
                      En savoir plus
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowQuoteForm(true)}
              className="btn-gold inline-flex"
            >
              <Calendar className="h-5 w-5" />
              Demander un devis personnalisé
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-neutral-900">
                Demande de devis
              </h2>
              <button
                onClick={() => setShowQuoteForm(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              {/* Type d'espace */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Type d'espace *
                </label>
                <select
                  required
                  value={quoteForm.type}
                  onChange={(e) => setQuoteForm({ ...quoteForm, type: e.target.value })}
                  className="input-custom"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="reception">Salle de réception</option>
                  <option value="bureau">Bureau / Salle de réunion</option>
                  <option value="jeux">Espace jeux / Loto</option>
                </select>
              </div>

              {/* Nom et Prénom */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.prenom}
                    onChange={(e) => setQuoteForm({ ...quoteForm, prenom: e.target.value })}
                    className="input-custom"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.nom}
                    onChange={(e) => setQuoteForm({ ...quoteForm, nom: e.target.value })}
                    className="input-custom"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              {/* Email et Téléphone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="input-custom"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.telephone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, telephone: e.target.value })}
                    className="input-custom"
                    placeholder="(418) 123-4567"
                  />
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Entreprise / Organisation (optionnel)
                </label>
                <input
                  type="text"
                  value={quoteForm.entreprise}
                  onChange={(e) => setQuoteForm({ ...quoteForm, entreprise: e.target.value })}
                  className="input-custom"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              {/* Date et durée */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Date souhaitée *
                  </label>
                  <input
                    type="date"
                    required
                    value={quoteForm.date}
                    onChange={(e) => setQuoteForm({ ...quoteForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-custom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Durée estimée
                  </label>
                  <input
                    type="text"
                    value={quoteForm.duree}
                    onChange={(e) => setQuoteForm({ ...quoteForm, duree: e.target.value })}
                    className="input-custom"
                    placeholder="Ex: 4 heures, 1 journée, 1 mois"
                  />
                </div>
              </div>

              {/* Nombre de personnes */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Nombre de personnes estimé
                </label>
                <input
                  type="number"
                  value={quoteForm.guests}
                  onChange={(e) => setQuoteForm({ ...quoteForm, guests: e.target.value })}
                  className="input-custom"
                  placeholder="Ex: 50"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Détails de votre demande *
                </label>
                <textarea
                  required
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  className="input-custom min-h-[120px] resize-none"
                  placeholder="Décrivez votre événement, vos besoins spécifiques, services requis..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                >
                  <Send className="h-4 w-4" />
                  Envoyer la demande
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
