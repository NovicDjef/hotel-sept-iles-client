'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquarePlus, Users as UsersIcon, Loader2 } from 'lucide-react'
import { AvisList } from '@/components/avis/AvisList'
import { AvisForm } from '@/components/avis/AvisForm'
import { AvisData } from '@/components/avis/AvisCard'
import { getHotelReviews, getHotelReviewsStats } from '@/services/api/routeApi'
import { hotelId } from '@/services/api/Api'

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

// Fonction pour transformer les avis de l'API vers le format AvisData
const transformApiReview = (apiReview: any): AvisData | null => {
  try {
    // Vérifications de base
    if (!apiReview) {
      console.warn('⚠️ Avis invalide:', apiReview)
      return null
    }

    // Extraire les photos (string CSV vers array)
    let photos: string[] = []
    if (apiReview.photos) {
      if (Array.isArray(apiReview.photos)) {
        photos = apiReview.photos.filter((p: string) => p && typeof p === 'string')
      } else if (typeof apiReview.photos === 'string') {
        photos = apiReview.photos
          .split(',')
          .map((p: string) => p.trim())
          .filter(Boolean)
      }
    }

    // Gérer la date de création de façon robuste
    let dateFormatted = new Date().toISOString().split('T')[0]
    try {
      if (apiReview.createdAt) {
        const date = new Date(apiReview.createdAt)
        if (!isNaN(date.getTime())) {
          dateFormatted = date.toISOString().split('T')[0]
        }
      }
    } catch (e) {
      console.warn('⚠️ Date invalide pour l\'avis:', apiReview.id, e)
    }

    // Gérer la note de façon robuste (doit être entre 1 et 5)
    let note = 5 // Valeur par défaut
    if (apiReview.overallRating !== undefined && apiReview.overallRating !== null) {
      // Si overallRating est un objet avec plusieurs notes (structure backend complexe)
      if (typeof apiReview.overallRating === 'object') {
        console.log('ℹ️ overallRating est un objet pour l\'avis:', apiReview.id, apiReview.overallRating)
        // Essayer d'extraire la note globale de l'objet
        // Cela peut être utile si le backend renvoie un objet de ratings détaillés
        if (typeof apiReview.overallRating.overallRating === 'number') {
          note = apiReview.overallRating.overallRating
        } else {
          console.warn('⚠️ Impossible d\'extraire la note de l\'objet overallRating')
          // Utiliser la note par défaut de 5
        }
      } else {
        // overallRating est un nombre simple
        const parsedNote = Number(apiReview.overallRating)
        if (!isNaN(parsedNote) && parsedNote >= 1 && parsedNote <= 5) {
          note = parsedNote
        } else {
          console.warn('⚠️ Note invalide pour l\'avis:', apiReview.id, 'Note reçue:', apiReview.overallRating)
        }
      }
    }

    // Gérer l'auteur de façon robuste
    let auteur = 'Anonyme'
    if (apiReview.guest) {
      const firstName = apiReview.guest.firstName || ''
      const lastName = apiReview.guest.lastName || ''
      const fullName = `${firstName} ${lastName}`.trim()
      if (fullName) {
        auteur = fullName
      }
    }

    // Gérer l'avatar
    const avatar = apiReview.guest?.avatar || '/images/avatars/default.svg'

    // Gérer le séjour
    let sejour = 'Date inconnue'
    if (apiReview.stayDate && typeof apiReview.stayDate === 'string') {
      sejour = apiReview.stayDate
    }

    // Gérer la chambre
    const chambre = apiReview.roomName && typeof apiReview.roomName === 'string'
      ? apiReview.roomName
      : 'Chambre'

    // Gérer le titre
    const titre = apiReview.title && typeof apiReview.title === 'string'
      ? apiReview.title
      : 'Sans titre'

    // Gérer le commentaire
    const commentaire = apiReview.comment && typeof apiReview.comment === 'string'
      ? apiReview.comment
      : ''

    // Gérer le nombre de likes
    const utile = typeof apiReview.helpfulCount === 'number' && apiReview.helpfulCount >= 0
      ? apiReview.helpfulCount
      : 0

    // Gérer la réponse de l'hôtel
    const reponseHotel = apiReview.hotelResponse && typeof apiReview.hotelResponse === 'string'
      ? apiReview.hotelResponse
      : null

    return {
      id: apiReview.id || Date.now(),
      auteur,
      avatar,
      note,
      date: dateFormatted,
      sejour,
      chambre,
      titre,
      commentaire,
      photos,
      utile,
      reponseHotel
    }
  } catch (error) {
    console.error('❌ Erreur lors de la transformation de l\'avis:', error, 'Avis:', apiReview)
    return null
  }
}

export default function AvisPage() {
  const [avis, setAvis] = useState<AvisData[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [notesMoyenne, setNotesMoyenne] = useState(0)
  const [totalAvis, setTotalAvis] = useState(0)
  const [distribution, setDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  })

  // Charger les avis au montage
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        console.log('🔍 Chargement des avis pour l\'hôtel:', hotelId)

        // Charger les avis et les stats en parallèle
        const [reviewsResponse, statsResponse] = await Promise.all([
          getHotelReviews(hotelId),
          getHotelReviewsStats(hotelId)
        ])

        console.log('✅ Réponse complète de l\'API avis:', reviewsResponse)
        console.log('✅ Avis reçus (data):', reviewsResponse.data)
        console.log('📊 Réponse complète des stats:', statsResponse)
        console.log('📊 Stats reçues (data):', statsResponse.data)

        // Transformer les avis (gérer les différentes structures de réponse)
        const reviewsData = reviewsResponse.data?.data || reviewsResponse.data || []
        console.log('📋 Type de reviewsData:', typeof reviewsData, 'Is array:', Array.isArray(reviewsData))
        console.log('📋 Contenu de reviewsData:', JSON.stringify(reviewsData, null, 2))

        const transformedReviews = Array.isArray(reviewsData)
          ? reviewsData
              .map((review, index) => {
                console.log(`🔄 Transformation avis ${index}:`, review)
                const transformed = transformApiReview(review)
                console.log(`✅ Avis transformé ${index}:`, transformed)
                return transformed
              })
              .filter((review): review is AvisData => review !== null) // Filtrer les avis invalides
          : []
        console.log('📝 Total avis transformés:', transformedReviews.length)
        setAvis(transformedReviews)

        // Mettre à jour les stats (gérer les différentes structures de réponse)
        const stats = statsResponse.data?.data || statsResponse.data || {}
        console.log('📊 Stats extraites:', JSON.stringify(stats, null, 2))

        // Gérer averageRating qui peut être un nombre OU un objet
        let avgRating = 0
        if (typeof stats.averageRating === 'number' && !isNaN(stats.averageRating)) {
          // Si c'est déjà un nombre
          avgRating = stats.averageRating
        } else if (typeof stats.averageRating === 'object' && stats.averageRating !== null) {
          // Si c'est un objet avec overallRating
          const overallRating = stats.averageRating.overallRating
          if (typeof overallRating === 'number' && !isNaN(overallRating)) {
            avgRating = overallRating
          }
        }
        setNotesMoyenne(avgRating)

        // S'assurer que totalReviews est bien un nombre (peut être "total" ou "totalReviews")
        const totalFromApi = stats.totalReviews || stats.total || stats.published || 0
        const totalRev = typeof totalFromApi === 'number' && !isNaN(totalFromApi)
          ? totalFromApi
          : 0
        setTotalAvis(totalRev)

        // S'assurer que ratingDistribution contient bien des nombres
        const distrib = stats.ratingDistribution || {}
        const safeDistribution = {
          5: typeof distrib[5] === 'number' && !isNaN(distrib[5]) ? distrib[5] : 0,
          4: typeof distrib[4] === 'number' && !isNaN(distrib[4]) ? distrib[4] : 0,
          3: typeof distrib[3] === 'number' && !isNaN(distrib[3]) ? distrib[3] : 0,
          2: typeof distrib[2] === 'number' && !isNaN(distrib[2]) ? distrib[2] : 0,
          1: typeof distrib[1] === 'number' && !isNaN(distrib[1]) ? distrib[1] : 0,
        }
        setDistribution(safeDistribution)

        setError(null)
      } catch (err: any) {
        console.error('❌ Erreur chargement avis:', err)
        setError('Impossible de charger les avis')
        // Garder les données initiales en cas d'erreur
        setAvis(avisInitiaux)
        setNotesMoyenne(4.9)
        setTotalAvis(847)
        setDistribution({ 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 })
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handleNewAvis = async (newAvis: AvisData) => {
    // Fermer le formulaire
    setShowForm(false)

    // Recharger les avis depuis l'API pour avoir les données à jour
    try {
      console.log('🔄 Rechargement des avis après soumission...')
      const [reviewsResponse, statsResponse] = await Promise.all([
        getHotelReviews(hotelId),
        getHotelReviewsStats(hotelId)
      ])

      // Transformer les avis
      const reviewsData = reviewsResponse.data?.data || reviewsResponse.data || []
      const transformedReviews = Array.isArray(reviewsData)
        ? reviewsData
            .map(transformApiReview)
            .filter((review): review is AvisData => review !== null) // Filtrer les avis invalides
        : []
      setAvis(transformedReviews)

      // Mettre à jour les stats
      const stats = statsResponse.data?.data || statsResponse.data || {}

      // Gérer averageRating qui peut être un nombre OU un objet
      let avgRating = 0
      if (typeof stats.averageRating === 'number' && !isNaN(stats.averageRating)) {
        // Si c'est déjà un nombre
        avgRating = stats.averageRating
      } else if (typeof stats.averageRating === 'object' && stats.averageRating !== null) {
        // Si c'est un objet avec overallRating
        const overallRating = stats.averageRating.overallRating
        if (typeof overallRating === 'number' && !isNaN(overallRating)) {
          avgRating = overallRating
        }
      }
      setNotesMoyenne(avgRating)

      // S'assurer que totalReviews est bien un nombre (peut être "total" ou "totalReviews")
      const totalFromApi = stats.totalReviews || stats.total || stats.published || 0
      const totalRev = typeof totalFromApi === 'number' && !isNaN(totalFromApi)
        ? totalFromApi
        : 0
      setTotalAvis(totalRev)

      // S'assurer que ratingDistribution contient bien des nombres
      const distrib = stats.ratingDistribution || {}
      const safeDistribution = {
        5: typeof distrib[5] === 'number' && !isNaN(distrib[5]) ? distrib[5] : 0,
        4: typeof distrib[4] === 'number' && !isNaN(distrib[4]) ? distrib[4] : 0,
        3: typeof distrib[3] === 'number' && !isNaN(distrib[3]) ? distrib[3] : 0,
        2: typeof distrib[2] === 'number' && !isNaN(distrib[2]) ? distrib[2] : 0,
        1: typeof distrib[1] === 'number' && !isNaN(distrib[1]) ? distrib[1] : 0,
      }
      setDistribution(safeDistribution)

      console.log('✅ Avis rechargés avec succès')
    } catch (err) {
      console.error('❌ Erreur rechargement avis:', err)
      // En cas d'erreur, ajouter simplement le nouvel avis en haut
      setAvis([newAvis, ...avis])
    }

    // Scroll vers le haut pour voir les avis
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Chargement des avis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-neutral-50">
      {/* Afficher un message d'erreur si nécessaire */}
      {error && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-4">
          <div className="container-custom">
            <p className="text-yellow-800 text-sm">⚠️ {error} - Affichage des données d'exemple</p>
          </div>
        </div>
      )}
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
                  {typeof notesMoyenne === 'number' ? notesMoyenne.toFixed(1) : '0.0'}
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