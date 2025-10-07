'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin } from 'lucide-react'

interface FormulaireClientProps {
  onClientInfoChange: (info: any) => void
  initialData?: any
}

export function FormulaireClient({ onClientInfoChange, initialData }: FormulaireClientProps) {
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

  return (
    <div className="card p-6">
      <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
        Vos informations
      </h2>

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
                className="input-custom pl-10"
                placeholder="Jean"
                required
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
                className="input-custom pl-10"
                placeholder="Tremblay"
                required
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
                className="input-custom pl-10"
                placeholder="jean.tremblay@email.com"
                required
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
                className="input-custom pl-10"
                placeholder="(418) 555-1234"
                required
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            💡 Vos informations sont sécurisées et ne seront utilisées que pour votre réservation
          </p>
        </div>
      </div>
    </div>
  )
}