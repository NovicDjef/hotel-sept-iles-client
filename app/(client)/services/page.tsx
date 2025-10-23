'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  Clock,
  Tag,
  Calendar,
  ArrowRight,
  Check,
  Star,
  Heart,
  Gift
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAllSpaData, setCategory } from '@/store/slices/servicesSlice'
import { MaintenanceMessage } from '@/components/common/MaintenanceMessage'

// Suppression de toutes les données en dur - maintenant récupérées depuis l'API
/*
const servicesLocal = [
  {
    id: 'massage-therapeutique',
    nom: 'Massage Thérapeutique',
    description: 'Libérez vos tensions avec nos massages personnalisés aux huiles essentielles biologiques.',
    descriptionLongue: 'Nos massothérapeutes certifiés utilisent des techniques variées pour soulager vos tensions musculaires et favoriser une relaxation profonde. Chaque séance est adaptée à vos besoins spécifiques.',
    duree: [50, 80],
    prix: { 50: 75, 80: 110 },
    image: '/images/spa/1.jpg',
    categorie: 'Massage',
    bienfaits: [
      'Réduit le stress et l\'anxiété',
      'Soulage les tensions musculaires',
      'Améliore la circulation sanguine',
      'Favorise un sommeil réparateur'
    ],
    inclus: [
      'Consultation personnalisée',
      'Huiles essentielles premium',
      'Musique relaxante',
      'Thé détox offert'
    ]
  },
  {
    id: 'massage-decouverte',
    nom: 'Massage Découverte',
    description: 'Découvrez les bienfaits du massage avec notre séance d\'introduction relaxante.',
    descriptionLongue: 'Parfait pour les débutants, ce massage combine plusieurs techniques douces pour vous initier aux bienfaits de la massothérapie dans une ambiance apaisante.',
    duree: [50, 80],
    prix: { 50: 70, 80: 100 },
    image: '/images/spa/acceuil.jpeg',
    categorie: 'Massage',
    bienfaits: [
      'Relaxation profonde',
      'Découverte des techniques',
      'Soulagement des tensions légères',
      'Moment de détente unique'
    ],
    inclus: [
      'Introduction aux techniques',
      'Huiles aromatiques',
      'Ambiance zen',
      'Conseils personnalisés'
    ]
  },
  {
    id: 'massage-dos-nuque',
    nom: 'Massage Dos & Nuque',
    description: 'Ciblé sur les zones de tension, idéal pour soulager le stress du quotidien.',
    descriptionLongue: 'Ce massage concentré sur le dos, les épaules et la nuque est parfait pour ceux qui passent de longues heures assis ou devant un écran. Soulagement immédiat garanti.',
    duree: [50, 80],
    prix: { 50: 65, 80: 95 },
    image: '/images/spa/massage-femme.jpeg',
    categorie: 'Massage',
    bienfaits: [
      'Soulage les douleurs cervicales',
      'Réduit les tensions des épaules',
      'Améliore la posture',
      'Détente immédiate'
    ],
    inclus: [
      'Focus zones tendues',
      'Techniques spécifiques',
      'Huiles chauffantes',
      'Conseils posturaux'
    ]
  },
  {
    id: 'massage-deep-tissue',
    nom: 'Massage Deep Tissue',
    description: 'Massage en profondeur pour éliminer les tensions musculaires chroniques.',
    descriptionLongue: 'Technique de massage profond qui cible les couches musculaires les plus profondes pour soulager les douleurs chroniques et les nœuds musculaires tenaces.',
    duree: [50, 80],
    prix: { 50: 85, 80: 120 },
    image: '/images/spa/relaxa.jpg',
    categorie: 'Massage',
    bienfaits: [
      'Élimine les tensions profondes',
      'Soulage les douleurs chroniques',
      'Améliore la flexibilité',
      'Récupération musculaire'
    ],
    inclus: [
      'Techniques en profondeur',
      'Baume musculaire',
      'Étirements adaptés',
      'Suivi personnalisé'
    ]
  },
  {
    id: 'massage-femme-enceinte',
    nom: 'Massage Femme Enceinte',
    description: 'Massage prénatal doux et sécuritaire pour futures mamans (après 12 semaines).',
    descriptionLongue: 'Spécialement conçu pour les femmes enceintes, ce massage adapté soulage les maux de dos, réduit le stress et favorise la détente en toute sécurité pour vous et votre bébé.',
    duree: [50, 80],
    prix: { 50: 80, 80: 115 },
    image: '/images/spa/massage-femme-enceinte-dijon.png',
    categorie: 'Massage',
    bienfaits: [
      'Soulage les maux de grossesse',
      'Réduit les œdèmes',
      'Favorise la détente',
      'Améliore le sommeil'
    ],
    inclus: [
      'Position adaptée confortable',
      'Huiles sécuritaires',
      'Techniques douces',
      'Moment privilégié'
    ]
  },
  {
    id: 'hammam',
    nom: 'Hammam Premium',
    description: 'Expérience orientale authentique dans notre hammam traditionnel avec gommage au savon noir.',
    descriptionLongue: 'Plongez dans la tradition du hammam oriental. La chaleur humide ouvre les pores, le gommage au savon noir élimine les cellules mortes et le rinçage à l\'eau de rose complète ce rituel millénaire.',
    duree: [45, 60],
    prix: { 45: 65, 60: 85 },
    image: '/images/spa/therma.jpg',
    categorie: 'Spa',
    bienfaits: [
      'Détoxifie en profondeur',
      'Peau douce et éclatante',
      'Relaxation intense',
      'Améliore la respiration'
    ],
    inclus: [
      'Gommage au savon noir',
      'Rinçage eau de rose',
      'Peignoir et serviettes',
      'Thé à la menthe'
    ]
  },
  {
    id: 'pedicure',
    nom: 'Pédicure Spa',
    description: 'Soin complet des pieds avec bain relaxant, exfoliation, massage et pose de vernis.',
    descriptionLongue: 'Offrez à vos pieds le soin qu\'ils méritent. Bain aromatique, gommage exfoliant, soin des cuticules, massage relaxant et pose de vernis semi-permanent pour des résultats durables.',
    duree: [60, 75],
    prix: { 60: 55, 75: 70 },
    image: '/images/spa/pedicure.jpg',
    categorie: 'Soins',
    bienfaits: [
      'Pieds doux et hydratés',
      'Ongles parfaitement soignés',
      'Circulation améliorée',
      'Relaxation des jambes'
    ],
    inclus: [
      'Bain aromatique',
      'Exfoliation complète',
      'Massage 15 minutes',
      'Vernis semi-permanent'
    ]
  },
  {
    id: 'manucure',
    nom: 'Manucure Luxe',
    description: 'Soin des mains et des ongles avec pose de vernis semi-permanent longue tenue.',
    descriptionLongue: 'Vos mains révèlent votre élégance. Soin complet avec trempage, exfoliation, massage hydratant et pose de vernis semi-permanent qui tient jusqu\'à 3 semaines.',
    duree: [45, 60],
    prix: { 45: 45, 60: 60 },
    image: '/images/spa/manicure.jpg',
    categorie: 'Soins',
    bienfaits: [
      'Mains douces et rajeunies',
      'Ongles renforcés',
      'Hydratation intense',
      'Résultat durable'
    ],
    inclus: [
      'Soin des cuticules',
      'Massage des mains',
      'Vernis semi-permanent',
      'Séchage UV'
    ]
  },
  {
    id: 'sauna',
    nom: 'Sauna Finlandais',
    description: 'Séance de détoxification dans notre sauna authentique avec aromathérapie.',
    descriptionLongue: 'Le sauna finlandais traditionnel utilise la chaleur sèche pour éliminer les toxines, détendre les muscles et renforcer le système immunitaire. Complété par une douche froide revigorante.',
    duree: [30, 45],
    prix: { 30: 35, 45: 50 },
    image: '/images/spa/sona.jpg',
    categorie: 'Spa',
    bienfaits: [
      'Détoxification profonde',
      'Renforce l\'immunité',
      'Soulage les douleurs',
      'Améliore le sommeil'
    ],
    inclus: [
      'Aromathérapie eucalyptus',
      'Serviette rafraîchissante',
      'Eau minérale',
      'Peignoir fourni'
    ]
  },
  {
    id: 'facial',
    nom: 'Soin du Visage',
    description: 'Traitement facial complet adapté à votre type de peau avec produits premium.',
    descriptionLongue: 'Révélez l\'éclat de votre peau avec notre soin du visage sur mesure. Nettoyage en profondeur, exfoliation douce, masque adapté et massage facial pour une peau radieuse.',
    duree: [60, 90],
    prix: { 60: 75, 90: 110 },
    image: '/images/spa/soin-visage.png',
    categorie: 'Soins',
    bienfaits: [
      'Peau éclatante et lumineuse',
      'Hydratation optimale',
      'Réduit les imperfections',
      'Anti-âge naturel'
    ],
    inclus: [
      'Diagnostic de peau',
      'Nettoyage profond',
      'Masque personnalisé',
      'Massage crânien'
    ]
  }
]

const forfaitsLocal = [
  {
    id: '1',
    nom: 'Forfait Détente',
    description: 'Massage 50min + Hammam',
    prixIndividuel: 130,
    prixDuo: 240,
    economieIndividuel: 20,
    economieDuo: 40,
    services: ['massage-therapeutique', 'hammam']
  },
  {
    id: '2',
    nom: 'Forfait Renaissance',
    description: 'Soin visage + Manucure + Pédicure',
    prixIndividuel: 150,
    prixDuo: 280,
    economieIndividuel: 25,
    economieDuo: 50,
    services: ['facial', 'manucure', 'pedicure']
  },
  {
    id: '3',
    nom: 'Forfait Complet',
    description: 'Tous les services (journée spa)',
    prixIndividuel: 299,
    prixDuo: 550,
    economieIndividuel: 80,
    economieDuo: 160,
    services: ['massage-therapeutique', 'hammam', 'pedicure', 'manucure', 'sauna', 'facial']
  }
]

const certificatsCadeauxLocal = [
  { id: '1', montant: 25, populaire: false, disponible: true },
  { id: '2', montant: 50, populaire: true, disponible: true },
  { id: '3', montant: 100, populaire: true, disponible: true },
  { id: '4', montant: 150, populaire: false, disponible: true },
  { id: '5', montant: 200, populaire: true, disponible: true },
  { id: '6', montant: 250, populaire: false, disponible: true },
  { id: '7', montant: 300, populaire: false, disponible: true },
  { id: '8', montant: 350, populaire: false, disponible: true },
  { id: '9', montant: 400, populaire: false, disponible: true },
  { id: '10', montant: 450, populaire: false, disponible: true },
  { id: '11', montant: 500, populaire: true, disponible: true },
]
*/

export default function ServicesPage() {
  const dispatch = useAppDispatch()
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // Récupérer les données depuis Redux
  const {
    filteredServices,
    forfaits,
    certificats,
    categories,
    loading,
    error,
    filters
  } = useAppSelector((state) => state.services)

  // Plus de données locales - tout vient de l'API
  const services = filteredServices
  const forfaitsList = forfaits
  const certificatsList = certificats

  // Catégories par défaut si l'API échoue
  const defaultCategories = [
    { id: 'tous', name: 'Tous', slug: 'tous', servicesCount: 0 },
    { id: 'massage', name: 'Massage', slug: 'massage', servicesCount: 0 },
    { id: 'spa', name: 'Spa', slug: 'spa', servicesCount: 0 },
    { id: 'soins', name: 'Soins', slug: 'soins', servicesCount: 0 }
  ]

  // Utiliser les catégories de l'API ou les catégories par défaut
  const displayCategories = categories.length > 0 ? categories : defaultCategories

  // Charger les données au montage du composant
  useEffect(() => {
    dispatch(fetchAllSpaData())
  }, [dispatch])

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 text-white overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/spa/acceuil.jpeg"
            alt="Spa Sept-Îles"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Effets décoratifs par-dessus l'overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-white">
              <Sparkles className="h-4 w-4 text-accent-gold" />
              <span className="text-sm font-medium">Services Spa Premium</span>
            </span>

            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
              Prenez soin de vous
            </h1>
            
            <p className="text-lg lg:text-xl text-white/90 mb-8">
              Découvrez notre gamme complète de services spa pour une expérience de détente absolue
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chambres" className="btn-gold">
                <Calendar className="h-5 w-5" />
                Réserver avec une chambre
              </Link>
              <a href="#services" className="btn-secondary bg-white text-primary-600 hover:bg-neutral-50">
                Voir les services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => dispatch(setCategory(cat.slug))}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filters.category === cat.slug
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
                {cat.servicesCount > 0 && (
                  <span className="ml-2 text-xs opacity-75">({cat.servicesCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-neutral-50">
        <div className="container-custom">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-4 text-neutral-600">Chargement des services...</p>
            </div>
          )}

          {error && error === 'MAINTENANCE' && (
            <MaintenanceMessage
              onRetry={() => dispatch(fetchAllSpaData())}
              submessage="Nos services spa seront de nouveau disponibles très bientôt."
              email="spa@hotel-sept-iles.com"
            />
          )}

          {error && error !== 'MAINTENANCE' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
              <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-700 font-semibold mb-2">Une erreur est survenue</p>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button
                onClick={() => dispatch(fetchAllSpaData())}
                className="btn-primary"
              >
                Réessayer
              </button>
            </div>
          )}

          {!loading && !error && services.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-600 text-lg">Aucun service disponible pour le moment</p>
              <p className="text-neutral-500 text-sm mt-2">Veuillez réessayer plus tard</p>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Effet de lueur au survol */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 via-accent-gold to-primary-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

                {/* Card principale */}
                <div className="relative card overflow-hidden bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {/* Image avec effets */}
                  <div className="relative aspect-service overflow-hidden">
                    {/* Effet de brillance animé */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />

                    <Image
                      src={service.image}
                      alt={service.nom}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Gradient overlay amélioré */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Badge catégorie avec effet */}
                    <div className="absolute top-4 left-4 z-20">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-neutral-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                      >
                        <Sparkles className="h-3 w-3" />
                        {service.categorie}
                      </motion.span>
                    </div>

                    {/* Prix avec effet brillant */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/20"
                    >
                      <div className="text-xs font-medium text-neutral-500 mb-0.5">À partir de</div>
                      <div className="font-display text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                        {Math.min(...Object.values(service.prix))}$
                      </div>
                    </motion.div>

                    {/* Titre sur l'image */}
                    <div className="absolute bottom-20 left-4 right-4 z-20">
                      <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">
                        {service.nom}
                      </h3>
                    </div>
                  </div>

                  {/* Contenu avec meilleur espacement */}
                  <div className="p-6 bg-gradient-to-b from-white to-neutral-50/50">
                    <p className="text-neutral-600 text-sm mb-5 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Durées avec style amélioré */}
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                      {service.duree.map((duree) => (
                        <motion.span
                          key={duree}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 px-3 py-2 rounded-full flex items-center gap-1.5 font-medium border border-primary-100 shadow-sm"
                        >
                          <Clock className="h-3.5 w-3.5 text-primary-600" />
                          {duree} min - {service.prix[duree as keyof typeof service.prix]}$
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA avec effet premium */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service.id)}
                      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl group/btn"
                    >
                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                      <span className="relative flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Voir les détails
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Forfaits */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-primary mb-4">Forfaits spa</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Économisez avec nos forfaits
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Combinez plusieurs services et profitez de réductions exclusives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {forfaitsList.map((forfait, index) => (
              <motion.div
                key={forfait.nom}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card-premium p-8 text-center ${
                  index === 2 ? 'ring-4 ring-accent-gold/30' : ''
                }`}
              >
                {index === 2 && (
                  <div className="inline-flex items-center gap-2 bg-accent-gold text-neutral-900 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <Star className="h-4 w-4 fill-current" />
                    Meilleur choix
                  </div>
                )}

                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold mb-4 shadow-glow-gold">
                  <Gift className="h-8 w-8 text-neutral-900" />
                </div>

                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  {forfait.nom}
                </h3>
                
                <p className="text-neutral-600 mb-4 text-sm">
                  {forfait.description}
                </p>

                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="font-display text-4xl font-bold text-primary-600">
                    {forfait.prixIndividuel}$
                  </span>
                  <div className="text-left">
                    <div className="badge-success text-xs">
                      -{forfait.economieIndividuel}$
                    </div>
                  </div>
                </div>

                <Link
                  href={`/chambres?forfait=${forfait.nom.toLowerCase().replace(/\s+/g, '-')}`}
                  className="btn-primary w-full justify-center mb-4"
                >
                  <Calendar className="h-4 w-4" />
                  Réserver ce forfait
                </Link>

                <div className="pt-4 border-t border-neutral-200 text-left">
                  <p className="text-xs font-semibold text-neutral-700 mb-2">Inclus :</p>
                  <ul className="space-y-1">
                    {forfait.services.map((service) => (
                      <li key={service.id} className="flex items-center gap-2 text-xs text-neutral-600">
                        <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                        <span>{service.nom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificats Cadeaux */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-primary mb-4">
              <Gift className="h-4 w-4 inline mr-2" />
              Certificats Cadeaux
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Offrez un moment de détente
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Faites plaisir à vos proches avec nos certificats cadeaux spa. Le cadeau parfait pour toutes les occasions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {certificatsList.filter(c => c.disponible).map((certificat, index) => (
              <motion.div
                key={certificat.montant}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative group cursor-pointer ${
                  certificat.populaire ? 'ring-2 ring-accent-gold' : ''
                }`}
              >
                <div className="card-premium p-6 text-center h-full flex flex-col justify-between">
                  {certificat.populaire && (
                    <div className="absolute -top-2 -right-2 bg-accent-gold text-neutral-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      Populaire
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold mb-3 group-hover:scale-110 transition-transform">
                      <Gift className="h-6 w-6 text-neutral-900" />
                    </div>

                    <div className="font-display text-3xl font-bold text-primary-600 mb-1">
                      {certificat.montant}$
                    </div>
                    <p className="text-xs text-neutral-600">Valeur</p>
                  </div>

                  <button className="btn-primary-sm w-full justify-center text-xs group-hover:shadow-lg transition-all">
                    <Gift className="h-3 w-3" />
                    Acheter
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="font-semibold text-lg text-blue-900 mb-2">
                Certificats personnalisés disponibles
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Besoin d'un montant différent ? Contactez-nous pour créer un certificat cadeau sur mesure.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 section-gradient">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                Prêt à vous détendre ?
              </h2>
              <p className="text-white/90 mb-8">
                Réservez une chambre et ajoutez nos services spa pour une expérience complète
              </p>
              <Link href="/chambres" className="btn-gold inline-flex">
                <Calendar className="h-5 w-5" />
                Réserver maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal détails service (optionnel) */}
      {selectedService && (
        <ServiceDetailModal
          service={services.find(s => s.id === selectedService)!}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}

// Modal pour les détails d'un service
function ServiceDetailModal({ service, onClose }: { service: any, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-service">
          <Image src={service.image} alt={service.nom} fill className="object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contenu */}
        <div className="p-8">
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            {service.nom}
          </h2>
          
          <p className="text-neutral-700 mb-6 leading-relaxed">
            {service.descriptionLongue}
          </p>

          {/* Bienfaits */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-neutral-900 mb-3">Bienfaits</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {service.bienfaits.map((bienfait: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{bienfait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclus */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-neutral-900 mb-3">Inclus</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {service.inclus.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prix et durées */}
          <div className="bg-primary-50 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-lg text-neutral-900 mb-4">Tarifs</h3>
            <div className="space-y-3">
              {service.duree.map((duree: number) => (
                <div key={duree} className="flex items-center justify-between">
                  <span className="text-neutral-700">{duree} minutes</span>
                  <span className="font-display text-2xl font-bold text-primary-600">
                    {service.prix[duree]}$
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/chambres"
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            <Calendar className="h-5 w-5" />
            Réserver avec une chambre
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}