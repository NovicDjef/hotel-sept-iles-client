'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ThumbsUp, ArrowRight } from 'lucide-react'

interface ReviewsSectionProps {
  chambreId: string
  note: number
  total: number
}

const avis = [
  {
    id: 1,
    auteur: 'Marie Tremblay',
    avatar: '/images/avatars/avatar-1.jpg',
    note: 5,
    date: '2024-12-15',
    commentaire: 'Chambre magnifique avec une vue incroyable ! Le lit était très confortable et la propreté irréprochable.',
    utile: 12
  },
  {
    id: 2,
    auteur: 'Jean-François B.',
    avatar: '/images/avatars/avatar-2.jpg',
    note: 5,
    date: '2024-12-10',
    commentaire: 'Excellent séjour ! Le personnel est aux petits soins et la chambre est spacieuse. Je recommande vivement.',
    utile: 8
  },
  {
    id: 3,
    auteur: 'Sophie L.',
    avatar: '/images/avatars/avatar-3.jpg',
    note: 4,
    date: '2024-12-05',
    commentaire: 'Très belle chambre, bien équipée. Seul bémol : un peu de bruit le matin. Mais globalement une excellente expérience.',
    utile: 5
  }
]

export function ReviewsSection({ chambreId, note, total }: ReviewsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
            Avis des clients
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-accent-gold fill-accent-gold" />
              <span className="font-semibold text-lg">{note}</span>
            </div>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-600">{total} avis</span>
          </div>
        </div>
      </div>

      <div className="mb-8 space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 w-12">
              {stars} ⭐
            </span>
            <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-gold rounded-full"
                style={{ width: `${stars === 5 ? 85 : stars === 4 ? 10 : 5}%` }}
              />
            </div>
            <span className="text-sm text-neutral-600 w-12 text-right">
              {stars === 5 ? '85%' : stars === 4 ? '10%' : '5%'}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {avis.map((avis, index) => (
          <motion.div
            key={avis.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pb-6 border-b border-neutral-100 last:border-0"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
                <Image
                  src={avis.avatar}
                  alt={avis.auteur}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-neutral-900">{avis.auteur}</span>
                  <span className="text-sm text-neutral-500">
                    {new Date(avis.date).toLocaleDateString('fr-CA')}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(avis.note)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-neutral-700 leading-relaxed mb-3">
              {avis.commentaire}
            </p>
            <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>Utile ({avis.utile})</span>
            </button>
          </motion.div>
        ))}
      </div>

      <Link href="/avis" className="btn-secondary w-full mt-6 justify-center">
        Voir tous les avis
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}
