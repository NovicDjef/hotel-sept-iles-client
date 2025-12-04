'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, ThumbsUp, Filter, ChevronDown } from 'lucide-react'

const avis = [
  {
    id: 1,
    auteur: 'Marie Tremblay',
    avatar: '/images/avatars/avatar-1.svg',
    note: 5,
    date: '2024-12-15',
    sejour: 'Décembre 2024',
    chambre: 'Suite Royale',
    titre: 'Expérience exceptionnelle !',
    commentaire: 'Un séjour absolument magnifique ! La chambre était spacieuse et impeccablement propre. La vue sur le fleuve était à couper le souffle. Le personnel était aux petits soins et très professionnel. Le petit-déjeuner était délicieux avec beaucoup de choix. Je recommande vivement cet hôtel et j\'y retournerai sans hésiter !',
    photos: ['/images/reviews/review-1-1.jpg', '/images/reviews/review-1-2.svg'],
    utile: 24,
    reponseHotel: 'Merci infiniment Marie pour ce merveilleux commentaire ! Nous sommes ravis que votre séjour ait été à la hauteur de vos attentes. Au plaisir de vous accueillir à nouveau !'
  },
  {
    id: 2,
    auteur: 'Jean-François Bouchard',
    avatar: '/images/avatars/avatar-2.svg',
    note: 5,
    date: '2024-12-10',
    sejour: 'Décembre 2024',
    chambre: 'Chambre Deluxe',
    titre: 'Parfait pour un weekend',
    commentaire: 'Excellent rapport qualité-prix. La chambre était moderne et très confortable. Le lit king size était incroyablement douillet. Le service spa est un vrai plus, j\'ai adoré le massage. Parking gratuit et wifi rapide. Seul petit bémol : le bruit des chambres voisines le matin, mais rien de dérangeant.',
    photos: [],
    utile: 18,
    reponseHotel: null
  },
  {
    id: 3,
    auteur: 'Sophie Gagnon',
    avatar: '/images/avatars/avatar-3.svg',
    note: 4,
    date: '2024-12-05',
    sejour: 'Novembre 2024',
    chambre: 'Suite Familiale',
    titre: 'Idéal pour les familles',
    commentaire: 'Nous avons passé un excellent séjour en famille. La suite familiale était parfaite pour nos deux enfants avec ses deux chambres séparées. La cuisine équipée est très pratique. Les enfants ont adoré la piscine. Personnel très accueillant et souriant. Un peu de bruit le matin mais globalement une très belle expérience.',
    photos: ['/images/reviews/review-3-1.svg'],
    utile: 12,
    reponseHotel: 'Merci Sophie ! Nous sommes heureux que vos enfants aient apprécié leur séjour. À bientôt !'
  },
  {
    id: 4,
    auteur: 'Alexandre Leblanc',
    avatar: '/images/avatars/avatar-4.svg',
    note: 5,
    date: '2024-11-28',
    sejour: 'Novembre 2024',
    chambre: 'Suite Royale',
    titre: 'Le meilleur hôtel de la Côte-Nord',
    commentaire: 'J\'ai voyagé dans plusieurs hôtels de la région et celui-ci se démarque vraiment. Le service est impeccable, les chambres sont luxueuses et la localisation est idéale. Le hammam est exceptionnel. Rapport qualité-prix imbattable pour ce niveau de prestations.',
    photos: [],
    utile: 31,
    reponseHotel: null
  },
  {
    id: 5,
    auteur: 'Catherine Lavoie',
    avatar: '/images/avatars/avatar-5.svg',
    note: 5,
    date: '2024-11-20',
    sejour: 'Novembre 2024',
    chambre: 'Chambre Deluxe',
    titre: 'Magnifique découverte',
    commentaire: 'Premier séjour à Sept-Îles et j\'ai été agréablement surprise par la qualité de cet hôtel. Tout est pensé pour le confort des clients. Les massages sont divins, la masseuse était très professionnelle. Petit-déjeuner copieux et varié. Je reviendrai c\'est certain !',
    photos: ['/images/reviews/review-5-1.jpg', '/images/reviews/review-5-2.jpg', '/images/reviews/review-5-3.svg'],
    utile: 15,
    reponseHotel: 'Catherine, quel plaisir de lire votre avis ! Merci d\'avoir choisi notre établissement. À très bientôt !'
  },
  {
    id: 6,
    auteur: 'Marc-André Roy',
    avatar: '/images/avatars/avatar-6.svg',
    note: 5,
    date: '2024-11-15',
    sejour: 'Novembre 2024',
    chambre: 'Suite Panoramique',
    titre: 'Vue spectaculaire',
    commentaire: 'La suite panoramique porte bien son nom ! La vue à 180° sur le fleuve est absolument magnifique, surtout au coucher de soleil. La chambre est immense et ultra moderne. Le jacuzzi privé sur le balcon est un vrai luxe. Service 5 étoiles. Un peu cher mais ça vaut vraiment le coup pour une occasion spéciale.',
    photos: [],
    utile: 28,
    reponseHotel: null
  }
]

export default function AvisPage() {
  const [filtreNote, setFiltreNote] = useState<number | null>(null)
  const [triPar, setTriPar] = useState('recent')

  const notesMoyenne = 4.9
  const totalAvis = 847

  const distribution = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1
  }

  const avisFiltres = filtreNote
    ? avis.filter(a => a.note === filtreNote)
    : avis

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-luxury text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Avis de nos clients
            </h1>
            <p className="text-lg text-white/90">
              Découvrez ce que nos clients pensent de leur expérience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats globales */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
            {/* Note moyenne */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="font-display text-6xl font-bold text-primary-600">
                  {notesMoyenne}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-accent-gold fill-accent-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">
                    {totalAvis} avis vérifiés
                  </p>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="lg:col-span-8">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((note) => (
                  <button
                    key={note}
                    onClick={() => setFiltreNote(filtreNote === note ? null : note)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                      filtreNote === note
                        ? 'bg-primary-50 ring-2 ring-primary-500'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-sm font-medium text-neutral-700 w-12">
                      {note} ⭐
                    </span>
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-gold rounded-full transition-all"
                        style={{ width: `${distribution[note as keyof typeof distribution]}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-600 w-12 text-right">
                      {distribution[note as keyof typeof distribution]}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et tri */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">
                {avisFiltres.length} avis {filtreNote && `avec ${filtreNote} étoile${filtreNote > 1 ? 's' : ''}`}
              </span>
              {filtreNote && (
                <button
                  onClick={() => setFiltreNote(null)}
                  className="text-sm text-primary-600 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            <select
              value={triPar}
              onChange={(e) => setTriPar(e.target.value)}
              className="input-custom text-sm py-2 px-4 pr-8"
            >
              <option value="recent">Plus récents</option>
              <option value="ancien">Plus anciens</option>
              <option value="note-haut">Note la plus haute</option>
              <option value="note-bas">Note la plus basse</option>
              <option value="utile">Plus utiles</option>
            </select>
          </div>
        </div>
      </section>

      {/* Liste des avis */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            {avisFiltres.map((avis, index) => (
              <motion.div
                key={avis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                    <Image
                      src={avis.avatar}
                      alt={avis.auteur}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {avis.auteur}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Séjour en {avis.sejour}
                        </p>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {new Date(avis.date).toLocaleDateString('fr-CA')}
                      </span>
                    </div>

                    {/* Note */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < avis.note
                                ? 'text-accent-gold fill-accent-gold'
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-600">
                        • {avis.chambre}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Titre */}
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  {avis.titre}
                </h4>

                {/* Commentaire */}
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {avis.commentaire}
                </p>

                {/* Photos */}
                {avis.photos.length > 0 && (
                  <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
                    {avis.photos.map((photo, i) => (
                      <div
                        key={i}
                        className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <Image
                          src={photo}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Utile ({avis.utile})</span>
                  </button>
                </div>

                {/* Réponse de l'hôtel */}
                {avis.reponseHotel && (
                  <div className="mt-4 ml-12 p-4 bg-primary-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600">
                        <span className="text-white text-xs font-bold">H</span>
                      </div>
                      <span className="font-semibold text-sm text-primary-900">
                        Réponse de l'hôtel
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700">
                      {avis.reponseHotel}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bouton charger plus */}
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Charger plus d'avis
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 section-gradient">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Vivez l'expérience par vous-même
            </h2>
            <p className="text-white/90 mb-8">
              Rejoignez nos centaines de clients satisfaits
            </p>
            <a href="/chambres" className="btn-gold inline-flex">
              Réserver maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}