'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Calendar, Phone, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/chambres', label: 'Chambres' },
  { href: '/services', label: 'Services Spa' },
  { href: '/avis', label: 'Avis' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Header avec fond sombre comme le Footer (toujours visible)
  const isDarkHeader = true

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-luxury shadow-md"
      >
        <nav className="container-custom">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-12 w-12 lg:h-14 lg:w-14 rounded-xl overflow-hidden shadow-md"
              >
                <Image
                  src="/images/hotel/logoH.jpg"
                  alt="Logo Hôtel Sept-Îles"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl lg:text-2xl font-bold text-white">
                  Sept-Îles
                </h1>
                <p className="text-xs text-white/70">
                  Hôtel Premium
                </p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Buttons Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/mon-compte"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                Mon compte
              </Link>
              <Link
                href="/chambres"
                className="btn-gold"
              >
                <Calendar className="h-4 w-4" />
                Réserver
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden safe-top safe-bottom"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/images/hotel/logoH.jpg"
                        alt="Logo Hôtel Sept-Îles"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-primary-900">
                        Sept-Îles
                      </h2>
                      <p className="text-xs text-neutral-600">Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                            pathname === link.href
                              ? 'bg-primary-50 text-primary-600'
                              : 'text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Contact rapide */}
                  <div className="mt-8 rounded-2xl bg-gradient-ocean p-6 text-white">
                    <h3 className="font-display text-lg font-bold mb-2">
                      Besoin d'aide ?
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      Notre équipe est là pour vous
                    </p>
                    <a
                      href="tel:+14185551234"
                      className="flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      +1 418 962-2581
                    </a>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-neutral-200 p-6 space-y-3">
                  <Link
                    href="/mon-compte"
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary w-full"
                  >
                    <User className="h-4 w-4" />
                    Mon compte
                  </Link>
                  <Link
                    href="/chambres"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full"
                  >
                    <Calendar className="h-4 w-4" />
                    Réserver maintenant
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}