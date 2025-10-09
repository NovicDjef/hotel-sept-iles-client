'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User,
  Calendar,
  History,
  Settings,
  Heart,
  LogOut,
  Edit,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from 'lucide-react'

// Données temporaires (remplacer par les vraies données de l'API)
const user = {
  prenom: 'Jean',
  nom: 'Tremblay',
  email: 'jean.tremblay@email.com',
  telephone: '+1 418 962-2581',
  adresse: '123 rue Principale',
  ville: 'Québec',
  codePostal: 'G1A 1A1',
  avatar: '/images/avatars/default.svg',
  dateInscription: '2024-01-15'
}

const reservations = [
  {
    id: 1,
    chambre: {
      nom: 'Suite Royale',
      image: '/images/rooms/suite-royale-1.svg'
    },
    dateArrivee: '2025-02-15',
    dateDepart: '2025-02-18',
    nombrePersonnes: 2,
    services: ['Massage 60min', 'Hammam'],
    prixTotal: 1245,
    statut: 'CONFIRMEE'
  },
  {
    id: 2,
    chambre: {
      nom: 'Chambre Deluxe',
      image: '/images/rooms/deluxe-1.svg'
    },
    dateArrivee: '2024-12-20',
    dateDepart: '2024-12-22',
    nombrePersonnes: 2,
    services: ['Pédicure'],
    prixTotal: 489,
    statut: 'TERMINEE'
  },
  {
    id: 3,
    chambre: {
      nom: 'Suite Familiale',
      image: '/images/rooms/family-1.svg'
    },
    dateArrivee: '2024-11-10',
    dateDepart: '2024-11-13',
    nombrePersonnes: 4,
    services: [],
    prixTotal: 897,
    statut: 'TERMINEE'
  }
]

const favoris = [
  {
    id: 1,
    nom: 'Suite Royale',
    prix: 299,
    image: '/images/rooms/suite-royale-1.svg'
  },
  {
    id: 3,
    nom: 'Suite Familiale',
    prix: 249,
    image: '/images/rooms/family-1.svg'
  }
]

export default function MonComptePage() {
  const [activeTab, setActiveTab] = useState('reservations')
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const tabs = [
    { id: 'reservations', label: 'Mes réservations', icon: Calendar },
    { id: 'favoris', label: 'Favoris', icon: Heart },
    { id: 'profil', label: 'Mon profil', icon: User },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ]

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'CONFIRMEE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Confirmée
          </span>
        )
      case 'EN_ATTENTE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
            <Clock className="h-4 w-4" />
            En attente
          </span>
        )
      case 'ANNULEE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            <XCircle className="h-4 w-4" />
            Annulée
          </span>
        )
      case 'TERMINEE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Terminée
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-luxury text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-white/10 border-4 border-white/20">
              <Image
                src={user.avatar}
                alt={`${user.prenom} ${user.nom}`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold mb-1">
                Bienvenue, {user.prenom}
              </h1>
              <p className="text-white/80">
                Membre depuis {new Date(user.dateInscription).toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12">
        <div className="container-custom">
          {/* Onglet Réservations */}
          {activeTab === 'reservations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Mes réservations
                </h2>
                <Link href="/chambres" className="btn-primary">
                  <Calendar className="h-4 w-4" />
                  Nouvelle réservation
                </Link>
              </div>

              {reservations.length > 0 ? (
                <div className="space-y-6">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="card p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image */}
                        <div className="relative w-full lg:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={reservation.chambre.image}
                            alt={reservation.chambre.nom}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                                {reservation.chambre.nom}
                              </h3>
                              <p className="text-sm text-neutral-600">
                                Réservation #{reservation.id}
                              </p>
                            </div>
                            {getStatutBadge(reservation.statut)}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(reservation.dateArrivee).toLocaleDateString('fr-CA')} - {new Date(reservation.dateDepart).toLocaleDateString('fr-CA')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <User className="h-4 w-4" />
                              <span>{reservation.nombrePersonnes} personne{reservation.nombrePersonnes > 1 ? 's' : ''}</span>
                            </div>
                          </div>

                          {reservation.services.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-medium text-neutral-700 mb-2">Services inclus :</p>
                              <div className="flex flex-wrap gap-2">
                                {reservation.services.map((service, i) => (
                                  <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                            <div>
                              <span className="text-sm text-neutral-600">Total payé</span>
                              <div className="font-display text-2xl font-bold text-primary-600">
                                {reservation.prixTotal}$
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <button className="btn-secondary">
                                <Eye className="h-4 w-4" />
                                Détails
                              </button>
                              {reservation.statut === 'CONFIRMEE' && (
                                <button className="btn-primary">
                                  <Download className="h-4 w-4" />
                                  Facture
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                    Aucune réservation
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Vous n'avez pas encore effectué de réservation
                  </p>
                  <Link href="/chambres" className="btn-primary inline-flex">
                    <Calendar className="h-4 w-4" />
                    Réserver maintenant
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Onglet Favoris */}
          {activeTab === 'favoris' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">
                Mes chambres favorites
              </h2>

              {favoris.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoris.map((chambre) => (
                    <div key={chambre.id} className="card overflow-hidden group">
                      <div className="relative aspect-chambre">
                        <Image
                          src={chambre.image}
                          alt={chambre.nom}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                          {chambre.nom}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="font-display text-xl font-bold text-primary-600">
                            {chambre.prix}$
                            <span className="text-sm font-normal text-neutral-500">/nuit</span>
                          </div>
                          <Link
                            href={`/chambres/${chambre.id}`}
                            className="btn-secondary text-sm px-4 py-2"
                          >
                            Réserver
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                    Aucun favori
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Ajoutez des chambres à vos favoris pour les retrouver facilement
                  </p>
                  <Link href="/chambres" className="btn-primary inline-flex">
                    Parcourir les chambres
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Onglet Profil */}
          {activeTab === 'profil' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Mon profil
                </h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="btn-secondary"
                >
                  <Edit className="h-4 w-4" />
                  {isEditingProfile ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Informations personnelles */}
                <div className="card p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-6">
                    Informations personnelles
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nom complet
                      </label>
                      {isEditingProfile ? (
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            defaultValue={user.prenom}
                            className="input-custom"
                            placeholder="Prénom"
                          />
                          <input
                            type="text"
                            defaultValue={user.nom}
                            className="input-custom"
                            placeholder="Nom"
                          />
                        </div>
                      ) : (
                        <p className="text-neutral-900">{user.prenom} {user.nom}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email
                      </label>
                      {isEditingProfile ? (
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="input-custom pl-10"
                          />
                        </div>
                      ) : (
                        <p className="text-neutral-900">{user.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Téléphone
                      </label>
                      {isEditingProfile ? (
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="tel"
                            defaultValue={user.telephone}
                            className="input-custom pl-10"
                          />
                        </div>
                      ) : (
                        <p className="text-neutral-900">{user.telephone}</p>
                      )}
                    </div>
                  </div>

                  {isEditingProfile && (
                    <button className="btn-primary w-full mt-6">
                      Enregistrer les modifications
                    </button>
                  )}
                </div>

                {/* Adresse */}
                <div className="card p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-6">
                    Adresse
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Rue
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          defaultValue={user.adresse}
                          className="input-custom"
                        />
                      ) : (
                        <p className="text-neutral-900">{user.adresse}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Ville
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            defaultValue={user.ville}
                            className="input-custom"
                          />
                        ) : (
                          <p className="text-neutral-900">{user.ville}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Code postal
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            defaultValue={user.codePostal}
                            className="input-custom"
                          />
                        ) : (
                          <p className="text-neutral-900">{user.codePostal}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Onglet Paramètres */}
          {activeTab === 'parametres' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">
                Paramètres du compte
              </h2>

              <div className="space-y-6">
                {/* Sécurité */}
                <div className="card p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-4">
                    Sécurité
                  </h3>
                  <button className="btn-secondary">
                    Changer le mot de passe
                  </button>
                </div>

                {/* Notifications */}
                <div className="card p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-700">Recevoir les offres promotionnelles</span>
                      <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-700">Confirmation de réservation par email</span>
                      <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-700">Rappels de séjour</span>
                      <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                    </label>
                  </div>
                </div>

                {/* Déconnexion */}
                <div className="card p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-4">
                    Session
                  </h3>
                  <button className="btn-secondary text-red-600 border-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}