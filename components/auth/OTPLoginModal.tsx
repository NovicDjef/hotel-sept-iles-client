'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, KeyRound, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { requestGuestOTP, verifyGuestOTP } from '@/services/api/routeApi'
import { useAppDispatch } from '@/store/hooks'
import { loginSuccess } from '@/store/slices/authSlice'

interface OTPLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OTPLoginModal({ isOpen, onClose }: OTPLoginModalProps) {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await requestGuestOTP({ email })
      setStep('otp')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await verifyGuestOTP({ email, otp })
      const { user, accessToken, refreshToken } = response.data.data

      // Sauvegarder dans le store Redux et localStorage
      dispatch(loginSuccess({ user, accessToken, refreshToken }))

      setSuccess(true)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Code OTP invalide')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep('email')
    setEmail('')
    setOtp('')
    setError(null)
    setSuccess(false)
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-luxury text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-2xl font-bold">
                  Connexion rapide
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-white/80 text-sm">
                {step === 'email'
                  ? 'Entrez votre email pour recevoir un code de connexion'
                  : 'Entrez le code reçu par email'}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    Connexion réussie !
                  </h3>
                  <p className="text-neutral-600">
                    Bienvenue dans votre espace client
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Email Step */}
                  {step === 'email' && (
                    <form onSubmit={handleRequestOTP} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Adresse email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            className="input-custom pl-10"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-red-700">{error}</div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Mail className="h-5 w-5" />
                            Recevoir le code
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* OTP Step */}
                  {step === 'otp' && (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-blue-700">
                          Un code à 6 chiffres a été envoyé à <strong>{email}</strong>
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Code de vérification
                        </label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                          <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="123456"
                            className="input-custom pl-10 text-center text-2xl font-mono tracking-widest"
                            disabled={loading}
                            maxLength={6}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-red-700">{error}</div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setStep('email')
                            setOtp('')
                            setError(null)
                          }}
                          className="btn-secondary flex-1"
                        >
                          Modifier l'email
                        </button>
                        <button
                          type="submit"
                          disabled={loading || otp.length !== 6}
                          className="btn-primary flex-1"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Vérification...
                            </>
                          ) : (
                            'Connexion'
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRequestOTP({ preventDefault: () => {} } as any)}
                        disabled={loading}
                        className="text-sm text-primary-600 hover:underline w-full text-center"
                      >
                        Renvoyer le code
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
