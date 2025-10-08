'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Upload, X, Send, User, Mail } from 'lucide-react'
import Image from 'next/image'

interface AvisFormProps {
  onSubmit?: (avis: any) => void
}

export function AvisForm({ onSubmit }: AvisFormProps) {
  const [formData, setFormData] = useState({
    auteur: '',
    email: '',
    chambre: '',
    note: 5,
    titre: '',
    commentaire: '',
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const chambres = [
    'Suite Royale',
    'Chambre Deluxe',
    'Suite Familiale',
    'Chambre Confort',
    'Suite Exécutive',
    'Suite Panoramique',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi
    setTimeout(() => {
      if (onSubmit) {
        const newAvis = {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString(),
          avatar: '/images/avatars/default.svg',
          photos: photos,
          utile: 0,
          sejour: new Date().toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' }),
          reponseHotel: null,
        }
        onSubmit(newAvis)

        // Afficher une notification de succès
        alert('✅ Merci ! Votre avis a été publié avec succès.')
      }

      // Réinitialiser le formulaire
      setFormData({
        auteur: '',
        email: '',
        chambre: '',
        note: 5,
        titre: '',
        commentaire: '',
      })
      setPhotos([])
      setIsSubmitting(false)
    }, 1500)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simuler l'upload de photos
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file))
      setPhotos([...photos, ...newPhotos].slice(0, 4)) // Max 4 photos
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Effet de lueur */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-gold to-primary-600 rounded-3xl opacity-20 blur-2xl" />

      <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-neutral-100">
        {/* Header */}
        <div className="mb-8">
          <h3 className="font-display text-3xl font-bold text-neutral-900 mb-2">
            Partagez votre expérience
          </h3>
          <p className="text-neutral-600">
            Votre avis nous aide à améliorer nos services et guide les futurs clients
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom et Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Votre nom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={formData.auteur}
                  onChange={(e) => setFormData({ ...formData, auteur: e.target.value })}
                  className="input-custom pl-11"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-custom pl-11"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>
          </div>

          {/* Chambre */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Chambre séjournée *
            </label>
            <select
              required
              value={formData.chambre}
              onChange={(e) => setFormData({ ...formData, chambre: e.target.value })}
              className="input-custom"
            >
              <option value="">Sélectionnez une chambre</option>
              {chambres.map((chambre) => (
                <option key={chambre} value={chambre}>
                  {chambre}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Note globale *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormData({ ...formData, note: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 transition-all ${
                      star <= formData.note
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-neutral-300'
                    }`}
                  />
                </motion.button>
              ))}
              <span className="ml-3 text-2xl font-bold text-neutral-900">
                {formData.note}.0
              </span>
            </div>
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Titre de votre avis *
            </label>
            <input
              type="text"
              required
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="input-custom"
              placeholder="Ex: Séjour inoubliable!"
              maxLength={100}
            />
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Votre commentaire *
            </label>
            <textarea
              required
              value={formData.commentaire}
              onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
              className="input-custom min-h-[150px] resize-none"
              placeholder="Partagez votre expérience avec nous..."
              maxLength={1000}
            />
            <div className="text-right text-xs text-neutral-500 mt-1">
              {formData.commentaire.length}/1000 caractères
            </div>
          </div>

          {/* Upload photos */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Photos (optionnel - max 4)
            </label>

            {photos.length < 4 && (
              <label className="relative block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all">
                  <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-neutral-600">
                    Cliquez pour ajouter des photos
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    JPG, PNG jusqu'à 5MB
                  </p>
                </div>
              </label>
            )}

            {/* Preview photos */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden w-full btn-primary py-4 text-base font-bold shadow-xl ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Publier mon avis
                  </>
                )}
              </span>
            </motion.button>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            En publiant, vous acceptez que votre avis soit visible publiquement
          </p>
        </form>
      </div>
    </motion.div>
  )
}
