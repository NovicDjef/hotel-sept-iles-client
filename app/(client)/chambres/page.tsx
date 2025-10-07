'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar, 
  Users, 
  Maximize2, 
  Filter,
  SlidersHorizontal,
  Eye,
  ArrowRight,
  Wifi,
  Coffee,
  Bath,
  Wind,
  Tv,
  Star
} from 'lucide-react'
import { SearchBar } from '@/components/chambres/SearchBar'
import { FilterSidebar } from '@/components/chambres/FilterSidebar'

// Données temporaires (sera remplacé par l'API)
const chambres = [
  {
    id: 1,
    nom: 'Suite Royale',
    categorie: 'Premium',
    description: 'Notre suite la plus luxueuse avec vue panoramique sur le fleuve Saint-Laurent',
    prix: 299,
    capacite: 2,
    superficie: 45,
    images: [
      '/images/rooms/suite-royale-1.svg',
      '/images/rooms/suite-royale-2.svg',
      '/images/rooms/suite-royale-3.svg',
      '/images/rooms/suite-royale-4.svg',
    ],
    equipements: ['Vue fleuve', 'Jacuzzi', 'Balcon privé', 'King size', 'Mini-bar', 'Coffre-fort'],
    note: 4.9,
    avis: 127,
    disponible: true
  },
  {
    id: 2,
    nom: 'Chambre Deluxe',
    categorie: 'Standard',
    description: 'Confort moderne avec tout l\'équipement nécessaire pour un séjour agréable',
    prix: 189,
    capacite: 2,
    superficie: 32,
    images: [
      '/images/rooms/deluxe-1.svg',
      '/images/rooms/deluxe-2.svg',
      '/images/rooms/deluxe-3.svg',
    ],
    equipements: ['King size', 'Bureau', 'Mini-bar', 'Wi-Fi', 'TV 55"', 'Climatisation'],
    note: 4.7,
    avis: 89,
    disponible: true
  },
  {
    id: 3,
    nom: 'Suite Familiale',
    categorie: 'Famille',
    description: 'Espace généreux parfait pour toute la famille avec deux chambres séparées',
    prix: 249,
    capacite: 4,
    superficie: 55,
    images: [
      '/images/rooms/family-1.svg',
      '/images/rooms/family-2.svg',
      '/images/rooms/family-3.svg',
      '/images/rooms/family-4.svg',
    ],
    equipements: ['2 chambres', 'Cuisine', 'Salon', 'Balcon', '2 salles de bain', 'Wi-Fi'],
    note: 4.8,
    avis: 156,
    disponible: true
  },
  {
    id: 4,
    nom: 'Chambre Confort',
    categorie: 'Standard',
    description: 'Parfaite pour un séjour court, offrant tout le confort essentiel',
    prix: 149,
    capacite: 2,
    superficie: 28,
    images: [
      '/images/rooms/confort-1.svg',
      '/images/rooms/confort-2.svg',
    ],
    equipements: ['Queen size', 'Bureau', 'Wi-Fi', 'TV', 'Climatisation'],
    note: 4.6,
    avis: 73,
    disponible: true
  },
  {
    id: 5,
    nom: 'Suite Exécutive',
    categorie: 'Business',
    description: 'Idéale pour les voyageurs d\'affaires avec espace de travail dédié',
    prix: 269,
    capacite: 2,
    superficie: 40,
    images: [
      '/images/rooms/executive-1.svg',
      '/images/rooms/executive-2.svg',
      '/images/rooms/executive-3.svg',
    ],
    equipements: ['Bureau ergonomique', 'Fauteuil', 'Mini-bar', 'Coffre-fort', 'Vue ville'],
    note: 4.8,
    avis: 94,
    disponible: true
  },
  {
    id: 6,
    nom: 'Suite Panoramique',
    categorie: 'Premium',
    description: 'Vue spectaculaire à 180° sur le fleuve et les montagnes',
    prix: 329,
    capacite: 2,
    superficie: 50,
    images: [
      '/images/rooms/panoramique-1.svg',
      '/images/rooms/panoramique-2.svg',
      '/images/rooms/panoramique-3.svg',
      '/images/rooms/panoramique-4.svg',
    ],
    equipements: ['Vue panoramique', 'Balcon', 'Baignoire spa', 'King size', 'Bar', 'Terrasse'],
    note: 5.0,
    avis: 203,
    disponible: false
  },
]

const categories = ['Toutes', 'Premium', 'Standard', 'Famille', 'Business']

export default function ChambresPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [sortBy, setSortBy] = useState('recommande')

  const filteredChambres = chambres.filter(chambre => 
    selectedCategory === 'Toutes' || chambre.categorie === selectedCategory
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-luxury text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="badge bg-white/10 border border-white/20 text-white mb-4">
              Nos chambres
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4">
              Choisissez votre chambre idéale
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              Découvrez nos chambres et suites élégantes, conçues pour votre confort absolu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Barre de recherche */}
      <section className="sticky top-16 z-40 bg-white shadow-md">
        <div className="container-custom py-4">
          <SearchBar />
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar Filtres - Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <FilterSidebar />
              </div>
            </aside>

            {/* Liste des chambres */}
            <div className="lg:col-span-9">
              {/* Header avec filtres mobiles */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {filteredChambres.length} chambre{filteredChambres.length > 1 ? 's' : ''} disponible{filteredChambres.length > 1 ? 's' : ''}
                  </h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    {selectedCategory !== 'Toutes' && `Catégorie: ${selectedCategory}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Bouton filtres mobile */}
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden btn-secondary"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtres
                  </button>

                  {/* Tri */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-custom text-sm py-2 px-3 pr-8"
                  >
                    <option value="recommande">Recommandé</option>
                    <option value="prix-asc">Prix croissant</option>
                    <option value="prix-desc">Prix décroissant</option>
                    <option value="note">Mieux notées</option>
                  </select>
                </div>
              </div>

              {/* Filtres par catégorie - Pills */}
              <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid des chambres */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredChambres.map((chambre, index) => (
                  <motion.div
                    key={chambre.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card overflow-hidden group hover:shadow-strong transition-all duration-500"
                  >
                    {/* Images carousel */}
                    <div className="relative aspect-chambre overflow-hidden">
                      <Image
                        src={chambre.images[0]}
                        alt={chambre.nom}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Badge disponibilité */}
                      <div className="absolute top-4 left-4">
                        {chambre.disponible ? (
                          <span className="badge-success backdrop-blur-md">
                            Disponible
                          </span>
                        ) : (
                          <span className="badge bg-red-500 text-white backdrop-blur-md">
                            Complet
                          </span>
                        )}
                      </div>

                      {/* Badge catégorie */}
                      <div className="absolute top-4 right-4">
                        <span className="badge-gold backdrop-blur-md">
                          {chambre.categorie}
                        </span>
                      </div>

                      {/* Prix */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
                        <div className="text-xs text-neutral-600">À partir de</div>
                        <div className="font-display text-2xl font-bold text-primary-600">
                          {chambre.prix}$
                          <span className="text-sm font-normal text-neutral-500">/nuit</span>
                        </div>
                      </div>

                      {/* Indicateur images */}
                      <div className="absolute bottom-4 left-4 flex gap-1">
                        {chambre.images.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 rounded-full ${
                              i === 0 ? 'w-6 bg-white' : 'w-1 bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                            {chambre.nom}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-accent-gold fill-accent-gold" />
                              <span className="font-semibold text-sm">{chambre.note}</span>
                            </div>
                            <span className="text-neutral-400">•</span>
                            <span className="text-sm text-neutral-600">
                              {chambre.avis} avis
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {chambre.description}
                      </p>

                      {/* Infos rapides */}
                      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4 pb-4 border-b border-neutral-100">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          <span>{chambre.capacite} pers.</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="h-4 w-4" />
                          <span>{chambre.superficie} m²</span>
                        </div>
                      </div>

                      {/* Équipements */}
                      <div className="mb-4">
                        <div className="grid grid-cols-3 gap-2">
                          {chambre.equipements.slice(0, 6).map((equipement, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 text-xs text-neutral-600"
                            >
                              {i === 0 && <Wifi className="h-3 w-3 text-primary-600" />}
                              {i === 1 && <Coffee className="h-3 w-3 text-primary-600" />}
                              {i === 2 && <Bath className="h-3 w-3 text-primary-600" />}
                              {i === 3 && <Wind className="h-3 w-3 text-primary-600" />}
                              {i === 4 && <Tv className="h-3 w-3 text-primary-600" />}
                              {i === 5 && <Star className="h-3 w-3 text-primary-600" />}
                              <span className="truncate">{equipement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex gap-3">
                        <Link
                          href={`/chambres/${chambre.id}`}
                          className="btn-secondary flex-1 justify-center group/btn"
                        >
                          <Eye className="h-4 w-4" />
                          Voir les détails
                        </Link>
                        <Link
                          href={`/reservation/${chambre.id}`}
                          className={`btn-primary flex-1 justify-center group/btn ${
                            !chambre.disponible ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => !chambre.disponible && e.preventDefault()}
                        >
                          <Calendar className="h-4 w-4" />
                          Réserver
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message si aucune chambre */}
              {filteredChambres.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
                    <Filter className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                    Aucune chambre trouvée
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <button
                    onClick={() => setSelectedCategory('Toutes')}
                    className="btn-primary"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal filtres mobile */}
      {filterOpen && (
        <div className="lg:hidden">
          <FilterSidebar onClose={() => setFilterOpen(false)} />
        </div>
      )}
    </div>
  )
}