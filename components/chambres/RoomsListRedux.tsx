'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Maximize2, Star, Eye } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchRooms, setCategory, setCapacity, resetFilters } from '@/store/slices/roomsSlice'

export function RoomsListRedux() {
  const dispatch = useAppDispatch()
  const { filteredRooms, loading, error, filters } = useAppSelector((state) => state.rooms)

  // Charger les chambres au montage du composant
  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
          <p className="text-neutral-600">Chargement des chambres...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600 font-medium">
          Une erreur est survenue : {error}
        </p>
        <button
          onClick={() => dispatch(fetchRooms())}
          className="btn-primary mt-4"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Catégorie
            </label>
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="input-custom text-sm py-2 px-4"
            >
              <option value="Toutes">Toutes</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Famille">Famille</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Capacité minimale
            </label>
            <select
              value={filters.capacity}
              onChange={(e) => dispatch(setCapacity(Number(e.target.value)))}
              className="input-custom text-sm py-2 px-4"
            >
              <option value={1}>1 personne</option>
              <option value={2}>2 personnes</option>
              <option value={3}>3 personnes</option>
              <option value={4}>4 personnes</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => dispatch(resetFilters())}
              className="btn-secondary text-sm"
            >
              Réinitialiser
            </button>
          </div>

          <div className="ml-auto text-sm font-medium text-neutral-700">
            {filteredRooms.length} chambre{filteredRooms.length > 1 ? 's' : ''} trouvée{filteredRooms.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Liste des chambres */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group card overflow-hidden hover:shadow-strong transition-all duration-500"
          >
            <div className="relative aspect-chambre overflow-hidden">
              <Image
                src={room.images[0]}
                alt={room.nom}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    href={`/reservation?chambreId=${room.id}`}
                    className="btn-primary w-full justify-center group/btn"
                  >
                    <Calendar className="h-4 w-4" />
                    Réserver
                  </Link>
                </div>
              </div>

              <div className="absolute top-4 left-4">
                <span className={`badge ${
                  room.disponible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {room.disponible ? 'Disponible' : 'Complet'}
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
                <div className="text-xs text-neutral-600">À partir de</div>
                <div className="font-display text-xl font-bold text-primary-600">
                  {room.prix}$
                  <span className="text-sm font-normal text-neutral-500">/nuit</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {room.nom}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{room.note}</span>
                </div>
              </div>

              <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                {room.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{room.capacite} pers.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="h-4 w-4" />
                  <span>{room.superficie} m²</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message si aucune chambre */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-600 mb-4">
            Aucune chambre ne correspond à vos critères
          </p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="btn-primary"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}
