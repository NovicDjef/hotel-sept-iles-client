'use client'

import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { AvisCard, AvisData } from './AvisCard'

interface AvisListProps {
  avis: AvisData[]
  itemsPerPage?: number
}

export function AvisList({ avis, itemsPerPage = 6 }: AvisListProps) {
  const [filtreNote, setFiltreNote] = useState<number | null>(null)
  const [triPar, setTriPar] = useState('recent')
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)

  // Filtrer et trier les avis
  let avisFiltres = filtreNote
    ? avis.filter(a => a.note === filtreNote)
    : avis

  // Trier
  switch (triPar) {
    case 'recent':
      avisFiltres = [...avisFiltres].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      break
    case 'ancien':
      avisFiltres = [...avisFiltres].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      break
    case 'note-haut':
      avisFiltres = [...avisFiltres].sort((a, b) => b.note - a.note)
      break
    case 'note-bas':
      avisFiltres = [...avisFiltres].sort((a, b) => a.note - b.note)
      break
    case 'utile':
      avisFiltres = [...avisFiltres].sort((a, b) => b.utile - a.utile)
      break
  }

  const avisVisibles = avisFiltres.slice(0, visibleCount)
  const hasMore = visibleCount < avisFiltres.length

  return (
    <div>
      {/* Filtres et tri */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-md mb-8 sticky top-20 z-30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-semibold text-neutral-900">
              {avisFiltres.length} avis {filtreNote && `avec ${filtreNote} étoile${filtreNote > 1 ? 's' : ''}`}
            </span>
            {filtreNote && (
              <button
                onClick={() => setFiltreNote(null)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline"
              >
                Réinitialiser
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <label className="text-sm font-medium text-neutral-600 whitespace-nowrap">
              Trier par:
            </label>
            <select
              value={triPar}
              onChange={(e) => setTriPar(e.target.value)}
              className="input-custom text-sm py-2.5 px-4 pr-10 flex-1 lg:flex-none lg:min-w-[200px]"
            >
              <option value="recent">Plus récents</option>
              <option value="ancien">Plus anciens</option>
              <option value="note-haut">Note la plus haute</option>
              <option value="note-bas">Note la plus basse</option>
              <option value="utile">Plus utiles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {avisVisibles.map((avis, index) => (
          <AvisCard key={avis.id} avis={avis} index={index} />
        ))}
      </div>

      {/* Bouton charger plus */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount(prev => prev + itemsPerPage)}
            className="btn-secondary px-8 py-3"
          >
            Charger plus d'avis ({avisFiltres.length - visibleCount} restants)
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Message si aucun avis */}
      {avisFiltres.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
            <Filter className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
            Aucun avis trouvé
          </h3>
          <p className="text-neutral-600 mb-6">
            Aucun avis ne correspond à vos critères de filtrage
          </p>
          <button
            onClick={() => setFiltreNote(null)}
            className="btn-primary"
          >
            Voir tous les avis
          </button>
        </div>
      )}
    </div>
  )
}
