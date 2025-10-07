'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: 'information',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
              Contactez-nous
            </h1>
            <p className="text-lg text-white/90">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Informations de contact */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Adresse',
                content: '123 rue Principale\nSept-Îles, QC G4R 1A1',
                link: 'https://maps.google.com',
                linkText: 'Voir sur la carte'
              },
              {
                icon: Phone,
                title: 'Téléphone',
                content: '(418) 555-1234\nSans frais: 1-800-555-1234',
                link: 'tel:+14185551234',
                linkText: 'Appeler maintenant'
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'info@hotel-sept-iles.com\nreservations@hotel-sept-iles.com',
                link: 'mailto:info@hotel-sept-iles.com',
                linkText: 'Envoyer un email'
              },
              {
                icon: Clock,
                title: 'Horaires',
                content: 'Réception 24h/24\n7 jours sur 7',
                link: null,
                linkText: null
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 mb-4">
                    <Icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm whitespace-pre-line mb-3">
                    {item.content}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      {item.linkText}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Formulaire et carte */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-neutral-600 mb-6">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </p>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="input-custom"
                      placeholder="Jean Tremblay"
                      required
                    />
                  </div>

                  {/* Email et Téléphone */}
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
                          placeholder="jean@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Téléphone
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
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      className="input-custom"
                      required
                    >
                      <option value="information">Demande d'information</option>
                      <option value="reservation">Question sur une réservation</option>
                      <option value="evenement">Événement / Groupe</option>
                      <option value="services">Services spa</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="input-custom resize-none"
                      placeholder="Écrivez votre message ici..."
                      required
                    />
                  </div>

                  {/* Bouton */}
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send className="h-5 w-5" />
                    Envoyer le message
                  </button>
                </form>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-700">
                    💡 Pour une réponse plus rapide, vous pouvez aussi nous appeler directement au{' '}
                    <a href="tel:+14185551234" className="font-semibold underline">
                      (418) 555-1234
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Carte et infos supplémentaires */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Carte Google Maps */}
              <div className="card overflow-hidden">
                <div className="aspect-video bg-neutral-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.935!2d-66.382!3d50.204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDEyJzE0LjQiTiA2NsKwMjInNTUuMiJX!5e0!3m2!1sfr!2sca!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                    Comment nous trouver
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Situé au cœur de Sept-Îles, notre hôtel est facilement accessible en voiture ou en transport en commun.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm inline-flex"
                  >
                    <MapPin className="h-4 w-4" />
                    Itinéraire
                  </a>
                </div>
              </div>

              {/* Chat en direct */}
              <div className="card p-6 bg-gradient-ocean text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Chat en direct</h3>
                    <p className="text-white/80 text-sm">Disponible 9h-21h</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Besoin d'une réponse immédiate ? Discutez avec notre équipe en temps réel.
                </p>
                <button className="btn-gold w-full justify-center bg-white text-primary-600 hover:bg-neutral-50">
                  <MessageCircle className="h-4 w-4" />
                  Démarrer le chat
                </button>
              </div>

              {/* Réseaux sociaux */}
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* FAQ rapide */}
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-4">
                  Questions fréquentes
                </h3>
                <div className="space-y-3">
                  {[
                    { q: 'Quelle est l\'heure d\'arrivée ?', a: 'À partir de 15h00' },
                    { q: 'Acceptez-vous les animaux ?', a: 'Oui, avec supplément de 25$/nuit' },
                    { q: 'Y a-t-il un parking ?', a: 'Oui, gratuit pour nos clients' }
                  ].map((faq, i) => (
                    <div key={i} className="pb-3 border-b border-neutral-100 last:border-0">
                      <p className="font-medium text-sm text-neutral-900 mb-1">
                        {faq.q}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
                <a href="/faq" className="text-sm text-primary-600 hover:underline mt-4 inline-block">
                  Voir toutes les FAQ →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}