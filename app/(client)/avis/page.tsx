'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquarePlus, Users as UsersIcon } from 'lucide-react'
import { AvisList } from '@/components/avis/AvisList'
import { AvisForm } from '@/components/avis/AvisForm'
import { AvisData } from '@/components/avis/AvisCard'

const avisInitiaux: AvisData[] = [
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
  const [avis, setAvis] = useState<AvisData[]>(avisInitiaux)
  const [showForm, setShowForm] = useState(false)

  const notesMoyenne = 4.9
  const totalAvis = 847

  const distribution = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1
  }

  const handleNewAvis = (newAvis: AvisData) => {
    setAvis([newAvis, ...avis])
    setShowForm(false)
    // Scroll vers le haut pour voir le nouveau commentaire
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Hero */}
      <section className="relative bg-gradient-luxury text-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6"
            >
              <UsersIcon className="h-5 w-5" />
              <span className="font-semibold">{totalAvis} clients satisfaits</span>
            </motion.div>

            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ce que disent nos clients
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8">
              Découvrez les expériences authentiques de nos visiteurs
            </p>

            <motion.button
              onClick={() => setShowForm(!showForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="h-5 w-5" />
              {showForm ? 'Fermer le formulaire' : 'Laisser un avis'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Formulaire d'ajout d'avis */}
      {showForm && (
        <section className="py-12 bg-gradient-to-b from-white to-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <AvisForm onSubmit={handleNewAvis} />
            </div>
          </div>
        </section>
      )}

      {/* Stats globales */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Note moyenne */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-6 mb-4">
                <div className="font-display text-7xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  {notesMoyenne}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-7 w-7 text-accent-gold fill-accent-gold drop-shadow-md" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">
                    {totalAvis} avis vérifiés
                  </p>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="lg:col-span-8">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((note) => (
                  <div
                    key={note}
                    className="flex items-center gap-4 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-all"
                  >
                    <span className="text-sm font-bold text-neutral-800 w-16 flex items-center gap-1">
                      {note} <Star className="h-3.5 w-3.5 text-accent-gold fill-accent-gold" />
                    </span>
                    <div className="flex-1 h-4 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${distribution[note as keyof typeof distribution]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: note * 0.1 }}
                        className="h-full bg-gradient-to-r from-accent-gold to-yellow-600 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-semibold text-neutral-700 w-14 text-right">
                      {distribution[note as keyof typeof distribution]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Liste des avis avec filtres intégrés */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <AvisList avis={avis} itemsPerPage={6} />
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