'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  Search,
  Sparkles, 
  Award, 
  MapPin,
  ArrowRight,
  Star,
  Heart,
  Wifi,
  Coffee,
  Car,
  Check,
  ChevronRight,
  Play,
  Phone,
  X
} from 'lucide-react'

const chambres = [
  {
    id: 1,
    nom: 'Suite Royale',
    categorie: 'Premium',
    prix: 299,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
    capacite: 2,
    superficie: 45,
    disponible: true,
    note: 4.9
  },
  {
    id: 2,
    nom: 'Chambre Deluxe',
    categorie: 'Standard',
    prix: 189,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
    capacite: 2,
    superficie: 32,
    disponible: true,
    note: 4.7
  },
  {
    id: 3,
    nom: 'Suite Familiale',
    categorie: 'Famille',
    prix: 249,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    capacite: 4,
    superficie: 55,
    disponible: false,
    note: 4.8
  },
  {
    id: 4,
    nom: 'Chambre Confort',
    categorie: 'Standard',
    prix: 149,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    capacite: 2,
    superficie: 28,
    disponible: true,
    note: 4.6
  }
]

export default function HomePage() {
  const [dateArrivee, setDateArrivee] = useState('')
  const [dateDepart, setDateDepart] = useState('')
  const [personnes, setPersonnes] = useState(2)
  const [categorieFiltre, setCategorieFiltre] = useState('Toutes')
  const [showVideo, setShowVideo] = useState(false)

  const categories = ['Toutes', 'Premium', 'Standard', 'Famille']
  
  const chambresFiltrees = categorieFiltre === 'Toutes' 
    ? chambres 
    : chambres.filter(c => c.categorie === categorieFiltre)

  const handleSearch = () => {
    if (!dateArrivee || !dateDepart) {
      alert('Veuillez sélectionner les dates')
      return
    }
    console.log('Recherche:', { dateArrivee, dateDepart, personnes })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Hauteur réduite à 85vh */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lenord-cotier.com/wp-content/uploads/sites/3/2019/03/02h24v10_Vente_HotelSeptIles-1320x877.jpg"
            alt="Hôtel"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
              </span>
              <span className="text-white font-medium text-sm">
                ✨ Offre Spéciale : -20% sur 3 nuits et plus
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Votre oasis de luxe
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                sur la Côte-Nord
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              Chambres élégantes • Spa premium • Vue imprenable sur le fleuve
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Arrivée
                  </label>
                  <input
                    type="date"
                    value={dateArrivee}
                    onChange={(e) => setDateArrivee(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Départ
                  </label>
                  <input
                    type="date"
                    value={dateDepart}
                    onChange={(e) => setDateDepart(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    min={dateArrivee || new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Users className="inline h-4 w-4 mr-2" />
                    Voyageurs
                  </label>
                  <select
                    value={personnes}
                    onChange={(e) => setPersonnes(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num > 1 ? 'personnes' : 'personne'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Rechercher
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Annulation gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Meilleur prix garanti</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Confirmation immédiate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/20"
              >
                <Play className="h-5 w-5" />
                Visite virtuelle
              </button>

              <a
                href="tel:+14185551234"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white text-blue-600 px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                (418) 555-1234
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Catégories :
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorieFiltre(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  categorieFiltre === cat
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CHAMBRES */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              {chambresFiltrees.length} chambre{chambresFiltrees.length > 1 ? 's' : ''} disponible{chambresFiltrees.length > 1 ? 's' : ''}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nos chambres d'exception
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Chaque chambre est conçue pour votre confort absolu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chambresFiltrees.map((chambre, index) => (
              <motion.div
                key={chambre.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={chambre.image}
                    alt={chambre.nom}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 left-4">
                    {chambre.disponible ? (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        ✓ Disponible
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        Complet
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {chambre.categorie}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {chambre.prix}$
                      <span className="text-sm font-normal text-gray-500">/nuit</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {chambre.nom}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{chambre.capacite}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{chambre.superficie}m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{chambre.note}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    Réserver
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Award className="h-4 w-4" />
              Services Premium
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Une expérience complète
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Profitez de nos équipements et services haut de gamme
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wifi className="h-8 w-8" />,
                titre: 'WiFi Ultra-rapide',
                description: 'Internet haute vitesse gratuit dans tout l\'hôtel',
                couleur: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Coffee className="h-8 w-8" />,
                titre: 'Restaurant & Bar',
                description: 'Cuisine gastronomique et cocktails signature',
                couleur: 'from-amber-500 to-amber-600'
              },
              {
                icon: <Car className="h-8 w-8" />,
                titre: 'Parking Gratuit',
                description: 'Stationnement sécurisé inclus',
                couleur: 'from-green-500 to-green-600'
              },
              {
                icon: <Heart className="h-8 w-8" />,
                titre: 'Spa & Bien-être',
                description: 'Massages et soins relaxants',
                couleur: 'from-pink-500 to-pink-600'
              }
            ].map((service, index) => (
              <motion.div
                key={service.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.couleur} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.titre}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Star className="h-4 w-4 text-yellow-400" />
              4.9/5 sur 2000+ avis
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Des milliers de voyageurs nous font confiance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                nom: 'Marie Tremblay',
                lieu: 'Montréal, QC',
                note: 5,
                commentaire: 'Séjour exceptionnel ! Les chambres sont magnifiques et le personnel aux petits soins. La vue sur le fleuve est à couper le souffle.',
                avatar: 'https://i.pravatar.cc/150?img=1'
              },
              {
                nom: 'Jean-Pierre Gagnon',
                lieu: 'Québec, QC',
                note: 5,
                commentaire: 'Parfait pour un weekend romantique. Le spa est incroyable et le restaurant propose une cuisine délicieuse. Nous reviendrons !',
                avatar: 'https://i.pravatar.cc/150?img=12'
              },
              {
                nom: 'Sophie Lavoie',
                lieu: 'Rimouski, QC',
                note: 4,
                commentaire: 'Très bel hôtel avec des installations modernes. L\'emplacement est idéal pour découvrir la Côte-Nord. Hautement recommandé !',
                avatar: 'https://i.pravatar.cc/150?img=5'
              }
            ].map((avis, index) => (
              <motion.div
                key={avis.nom}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < avis.note
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-white/90 mb-6 leading-relaxed">
                  "{avis.commentaire}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={avis.avatar}
                    alt={avis.nom}
                    className="w-12 h-12 rounded-full ring-2 ring-yellow-400"
                  />
                  <div>
                    <div className="font-semibold text-white">{avis.nom}</div>
                    <div className="text-sm text-white/60">{avis.lieu}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Voir tous les avis
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
                <MapPin className="h-4 w-4" />
                Sept-Îles, Côte-Nord
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Un havre de paix sur la Côte-Nord
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
                <p>
                  Niché au cœur de Sept-Îles, notre hôtel offre une expérience unique où le luxe moderne rencontre l'hospitalité chaleureuse de la Côte-Nord.
                </p>
                <p>
                  Depuis 2010, nous accueillons voyageurs d'affaires et familles en quête de confort et d'authenticité. Nos 50 chambres élégantes, notre restaurant gastronomique et notre spa de classe mondiale font de nous la destination privilégiée de la région.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Fondé en', valeur: '2010' },
                  { label: 'Chambres', valeur: '50+' },
                  { label: 'Employés', valeur: '45' },
                  { label: 'Note moyenne', valeur: '4.9/5' }
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {item.valeur}
                    </div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                En savoir plus
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1200&fit=crop"
                    alt="Lobby"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=600&fit=crop"
                    alt="Restaurant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop"
                    alt="Chambre"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=1200&fit=crop"
                    alt="Spa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [180, 0, 180] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Prêt à vivre une expérience inoubliable ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Réservez dès maintenant et profitez de notre offre exclusive : <strong>-20% sur 3 nuits et plus</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Réserver maintenant
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="tel:+14185551234"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                Nous contacter
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-white/20">
              {[
                'Annulation gratuite',
                'Meilleur prix garanti',
                'Service 24/7',
                'WiFi gratuit'
              ].map((garantie) => (
                <div key={garantie} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">{garantie}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL VIDÉO */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-2 transition-all"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}