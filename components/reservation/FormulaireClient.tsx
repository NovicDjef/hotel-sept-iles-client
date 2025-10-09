'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { registerGuest } from '@/store/slices/authSlice'

interface FormulaireClientProps {
  onClientInfoChange: (info: any) => void
  initialData?: any
}

export function FormulaireClient({ onClientInfoChange, initialData }: FormulaireClientProps) {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState(initialData || {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    commentaires: ''
  })

  const [errors, setErrors] = useState<any>({})
  const [isRegistering, setIsRegistering] = useState(false)

  // Si l'utilisateur est déjà connecté, pré-remplir le formulaire
  useEffect(() => {
    if (isAuthenticated && user) {
      const updatedData = {
        prenom: user.firstName || '',
        nom: user.lastName || '',
        email: user.email || '',
        telephone: user.phone || '',
        adresse: formData.adresse || '',
        ville: formData.ville || '',
        codePostal: formData.codePostal || '',
        commentaires: formData.commentaires || ''
      }
      setFormData(updatedData)
      onClientInfoChange(updatedData)
    }
  }, [isAuthenticated, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)
    onClientInfoChange(updated)

    // Validation simple
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Enregistrer l'invité automatiquement quand il remplit les champs requis
  const handleBlur = async () => {
    if (!isAuthenticated && formData.prenom && formData.nom && formData.email && formData.telephone) {
      if (validateEmail(formData.email) && !isRegistering) {
        setIsRegistering(true)
        try {
          await dispatch(registerGuest({
            firstName: formData.prenom,
            lastName: formData.nom,
            email: formData.email,
            phone: formData.telephone,
            address: formData.adresse || undefined
          })).unwrap()
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error)
        } finally {
          setIsRegistering(false)
        }
      }
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-neutral-900">
          Vos informations
        </h2>
        {isAuthenticated && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Compte client actif</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Nom et prénom */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Prénom *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-custom pl-10"
                placeholder="Jean"
                required
                disabled={isAuthenticated}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Nom *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-custom pl-10"
                placeholder="Tremblay"
                required
                disabled={isAuthenticated}
              />
            </div>
          </div>
        </div>

        {/* Email et téléphone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-custom pl-10"
                placeholder="jean.tremblay@email.com"
                required
                disabled={isAuthenticated}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Téléphone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-custom pl-10"
                placeholder="+1 418 962-2581"
                required
                disabled={isAuthenticated}
              />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Adresse
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="input-custom pl-10"
              placeholder="123 rue Principale"
            />
          </div>
        </div>

        {/* Ville et code postal */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Ville
            </label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="input-custom"
              placeholder="Québec"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Code postal
            </label>
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleChange}
              className="input-custom"
              placeholder="G1A 1A1"
            />
          </div>
        </div>

        {/* Commentaires */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Demandes spéciales (optionnel)
          </label>
          <textarea
            name="commentaires"
            value={formData.commentaires}
            onChange={handleChange}
            rows={4}
            className="input-custom resize-none"
            placeholder="Arrivée tardive, étage élevé, etc."
          />
        </div>

        {/* Info */}
        {!isAuthenticated ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              💡 Un compte client sera automatiquement créé avec vos informations pour faciliter vos futures réservations
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700">
              ✅ Vos informations sont pré-remplies depuis votre compte client
            </p>
          </div>
        )}

        {/* Indicateur de chargement */}
        {isRegistering && (
          <div className="flex items-center justify-center gap-2 text-primary-600">
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-600 border-r-transparent"></div>
            <span className="text-sm">Création de votre compte...</span>
          </div>
        )}
      </div>
    </div>
  )
}