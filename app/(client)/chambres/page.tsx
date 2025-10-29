'use client'

import { useState, useEffect } from 'react'
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
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms } from '@/store/slices/roomsSlice'
import { MaintenanceMessage } from '@/components/common/MaintenanceMessage'
import { checkRoomsAvailability } from '@/services/api/routeApi'

const categories = ['Toutes', 'Premium', 'Standard', 'Famille', 'Business']

export default function ChambresPage() {
  const dispatch = useAppDispatch()
  const { filteredRooms, loading, error, filters } = useAppSelector((state) => state.rooms)

  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [sortBy, setSortBy] = useState('recommande')
  const [availability, setAvailability] = useState<any[]>([])
  const [availabilityLoading, setAvailabilityLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  // Charger la disponibilité quand les filtres de dates changent
  useEffect(() => {
    const loadAvailability = async () => {
      if (filters.checkIn && filters.checkOut) {
        setAvailabilityLoading(true)
        try {
          const response = await checkRoomsAvailability({
            checkInDate: filters.checkIn,
            checkOutDate: filters.checkOut
          })
          console.log('✅ Disponibilité chargée:', response.data.data)
          setAvailability(response.data.data)
        } catch (err) {
          console.error('❌ Erreur chargement disponibilité:', err)
          setAvailability([])
        } finally {
          setAvailabilityLoading(false)
        }
      }
    }

    loadAvailability()
  }, [filters.checkIn, filters.checkOut])

  const filteredChambres = filteredRooms.filter(chambre =>
    selectedCategory === 'Toutes' || chambre.categorie === selectedCategory
  )

  // Debug logs
  console.log('🏨 Total chambres Redux (filteredRooms):', filteredRooms.length, filteredRooms)
  console.log('🔍 Catégorie sélectionnée:', selectedCategory)
  console.log('✅ Chambres après filtre catégorie:', filteredChambres.length, filteredChambres)

  // Helper pour obtenir la disponibilité d'un type de chambre
  const getAvailabilityForRoom = (roomType: string) => {
    return availability.find(avail => avail.type === roomType)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 text-white overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/hotel/hotel.jpg"
            alt="Hôtel Sept-Îles"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Effets décoratifs par-dessus l'overlay */}
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

              {/* Loading state */}
              {loading && (
                <div className="text-center py-16">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
                  <p className="mt-4 text-neutral-600 text-lg">Chargement des chambres...</p>
                </div>
              )}

              {/* Error state - Maintenance */}
              {error && error === 'MAINTENANCE' && (
                <MaintenanceMessage
                  onRetry={() => dispatch(fetchRooms())}
                  submessage="Nos chambres seront de nouveau disponibles très bientôt."
                  email="reservations@hotel-sept-iles.com"
                />
              )}

              {/* Error state - Autre erreur */}
              {error && error !== 'MAINTENANCE' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto">
                  <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    Erreur de chargement
                  </h3>
                  <p className="text-red-600 text-sm mb-6">{error}</p>
                  <button
                    onClick={() => dispatch(fetchRooms())}
                    className="btn-primary"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {/* Grid des chambres */}
              {!loading && !error && (
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

                      {/* Badge disponibilité avec données temps réel */}
                      <div className="absolute top-4 left-4">
                        {(() => {
                          const avail = getAvailabilityForRoom(chambre.type)
                          if (!avail || availabilityLoading) {
                            // Fallback sur les données statiques
                            return chambre.disponible ? (
                              <span className="badge-success backdrop-blur-md">
                                Disponible
                              </span>
                            ) : (
                              <span className="badge bg-red-500 text-white backdrop-blur-md">
                                Complet
                              </span>
                            )
                          }

                          // Données temps réel de l'API
                          if (!avail.isAvailable) {
                            return (
                              <span className="badge bg-red-500 text-white backdrop-blur-md">
                                ❌ Complet
                              </span>
                            )
                          }

                          // Alerte si moins de 5 chambres disponibles
                          if (avail.availableRooms <= 5) {
                            return (
                              <span className="badge bg-orange-500 text-white backdrop-blur-md animate-pulse">
                                ⚠️ Plus que {avail.availableRooms} {avail.availableRooms > 1 ? 'chambres' : 'chambre'}
                              </span>
                            )
                          }

                          return (
                            <span className="badge-success backdrop-blur-md">
                              ✓ {avail.availableRooms} disponibles
                            </span>
                          )
                        })()}
                      </div>

                      {/* Badge type de chambre */}
                      <div className="absolute top-4 right-4">
                        <span className={`badge backdrop-blur-md font-semibold ${
                          chambre.type === 'SUITE' || chambre.type === 'PRESIDENTIAL'
                            ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-lg'
                            : chambre.type === 'DELUXE'
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white shadow-lg'
                            : chambre.type === 'CONDO'
                            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg'
                            : chambre.type === 'FAMILY'
                            ? 'bg-gradient-to-r from-green-600 via-lime-600 to-emerald-500 text-white shadow-lg'
                            : chambre.type === 'EXECUTIVE'
                            ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg'
                            : chambre.type === 'DOUBLE'
                            ? 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-md'
                            : chambre.type === 'TWIN'
                            ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 text-white shadow-md'
                            : chambre.type === 'SIMPLE' || chambre.type === 'STANDARD'
                            ? 'bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 text-white shadow-md'
                            : 'bg-gradient-to-r from-neutral-600 to-gray-600 text-white shadow-md'
                        }`}>
                          {chambre.type}
                        </span>
                      </div>

                      {/* Prix */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
                        <div className="text-xs text-neutral-600">À partir de</div>
                        <div className="font-display text-2xl font-bold text-primary-600">
                          {chambre.prix}$
                          <span className="text-sm font-normal text-neutral-500">/nuit</span>
                        </div>
                        {chambre.prixWeekend !== chambre.prix && (
                          <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                            {chambre.prixWeekend}$ weekend
                          </div>
                        )}
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

                      {/* Indicateur de popularité / Taux d'occupation */}
                      {(() => {
                        const avail = getAvailabilityForRoom(chambre.type)
                        if (avail && filters.checkIn && filters.checkOut) {
                          const occupancy = parseFloat(avail.occupancyRate)
                          let colorClass = 'bg-green-500'
                          let textClass = 'text-green-700'
                          let message = 'Bonne disponibilité'

                          if (occupancy >= 80) {
                            colorClass = 'bg-red-500'
                            textClass = 'text-red-700'
                            message = 'Très demandé'
                          } else if (occupancy >= 60) {
                            colorClass = 'bg-orange-500'
                            textClass = 'text-orange-700'
                            message = 'Populaire'
                          }

                          return (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className={`font-medium ${textClass}`}>{message}</span>
                                <span className="text-neutral-500">{occupancy}% occupé</span>
                              </div>
                              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${colorClass} transition-all duration-500`}
                                  style={{ width: `${occupancy}%` }}
                                />
                              </div>
                            </div>
                          )
                        }
                        return null
                      })()}

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
                        {(() => {
                          // Utiliser les données temps réel si disponibles
                          const avail = getAvailabilityForRoom(chambre.type)
                          const isAvailable = avail ? avail.isAvailable : chambre.disponible

                          return (
                            <Link
                              href={`/reservation/${chambre.id}`}
                              className={`btn-primary flex-1 justify-center group/btn ${
                                !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              onClick={(e) => !isAvailable && e.preventDefault()}
                            >
                              <Calendar className="h-4 w-4" />
                              Réserver
                              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          )
                        })()}
                      </div>
                    </div>
                  </motion.div>
                  ))}
                </div>
              )}

              {/* Message si aucune chambre */}
              {!loading && !error && filteredChambres.length === 0 && (
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