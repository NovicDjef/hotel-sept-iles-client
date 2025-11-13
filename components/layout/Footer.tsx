'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Sparkles,
  Clock,
  Award
} from 'lucide-react'

const footerLinks = {
  hotel: [
    { label: 'Chambres', href: '/chambres' },
    { label: 'Services Spa', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Carrières', href: '/carrieres' },
  ],
  services: [
    { label: 'Massage', href: '/services#massage' },
    { label: 'Hammam', href: '/services#hammam' },
    { label: 'Pédicure', href: '/services#pedicure' },
    { label: 'Manucure', href: '/services#manucure' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Avis clients', href: '/avis' },
    { label: 'Mon compte', href: '/mon-compte' },
  ],
  legal: [
    { label: 'Conditions générales', href: '/conditions' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Politique d\'annulation', href: '/annulation' },
    { label: 'Mentions légales', href: '/mentions-legales' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-luxury text-white">
      {/* Section principale */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Colonne 1 - À propos */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/hotel/logoH.jpg"
                  alt="Logo Hôtel Sept-Îles"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Sept-Îles</h2>
                <p className="text-sm text-white/70">Hôtel Premium</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Découvrez l'excellence de l'hospitalité sur la Côte-Nord. 
              Un havre de paix alliant luxe, confort et services spa premium.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Award className="h-4 w-4 text-accent-gold" />
                <span className="text-xs font-medium">5 étoiles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Sparkles className="h-4 w-4 text-accent-gold" />
                <span className="text-xs font-medium">Spa Premium</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/hotel7iles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 - Hôtel */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Hôtel</h3>
            <ul className="space-y-3">
              {footerLinks.hotel.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Services Spa</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Support */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 5 - Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  451, avenue Arnaud<br />
                  Sept-Îles, Québec G4R 3B3
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/70 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+14189622581"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    418 962-2581
                  </a>
                  <a
                    href="tel:+18004631753"
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Sans frais : 1 800 463-1753
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/70 flex-shrink-0" />
                <a
                  href="mailto:info@hotel-sept-iles.com"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  info@hotel-sept-iles.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  Réception 24h/24<br />
                  7 jours / 7
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="container-custom">
        <div className="h-px bg-white/10" />
      </div>

      {/* Section légale */}
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-white/60 text-center md:text-left">
            © {currentYear} Hôtel Sept-Îles. Tous droits réservés.
          </p>

          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.legal.map((link, index) => (
              <span key={link.href} className="flex items-center gap-2">
                <Link
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-white/30">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PWA Installation prompt (optionnel) */}
      <div className="container-custom pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 text-center"
        >
          <p className="text-xs text-white/80">
            💡 Installez notre application pour une expérience optimale sur mobile
          </p>
        </motion.div>
      </div>
    </footer>
  )
}