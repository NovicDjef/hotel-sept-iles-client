'use client'

import { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { ShieldCheck, Loader2, AlertCircle, CreditCard, Calendar, Lock } from 'lucide-react'

interface StripePaymentFormProps {
  amount: number
  onSuccess: (paymentMethodId: string) => void
  onError: (error: string) => void
  loading?: boolean
}

export function StripePaymentForm({ amount, onSuccess, onError, loading = false }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !acceptedTerms) {
      setError('Veuillez accepter les conditions générales')
      return
    }

    setProcessing(true)
    setError(null)

    try {
      const cardNumberElement = elements.getElement(CardNumberElement)

      if (!cardNumberElement) {
        throw new Error('Élément de carte non trouvé')
      }

      // Créer une méthode de paiement
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
      })

      if (stripeError) {
        throw new Error(stripeError.message || 'Erreur de paiement')
      }

      if (!paymentMethod) {
        throw new Error('Impossible de créer la méthode de paiement')
      }

      // Appeler le callback de succès avec l'ID de la méthode de paiement
      onSuccess(paymentMethod.id)
    } catch (err: any) {
      const errorMessage = err.message || 'Une erreur est survenue lors du paiement'
      setError(errorMessage)
      onError(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        '::placeholder': {
          color: '#9ca3af',
        },
        lineHeight: '24px',
        padding: '12px 0',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
      complete: {
        color: '#059669',
        iconColor: '#059669',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message de sécurité et logos des cartes */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-blue-900 mb-1">
              Paiement 100% sécurisé
            </div>
            <div className="text-sm text-blue-700">
              Vos informations sont cryptées et protégées par Stripe
            </div>
          </div>
        </div>

        {/* Cartes acceptées */}
        <div className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
          <span className="text-sm text-neutral-600 font-medium">Cartes acceptées :</span>
          <div className="flex items-center gap-2">
            <div className="bg-white rounded border border-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-700">
              VISA
            </div>
            <div className="bg-white rounded border border-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-700">
              Mastercard
            </div>
            <div className="bg-white rounded border border-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-700">
              AMEX
            </div>
          </div>
        </div>
      </div>

      {/* Informations de carte */}
      <div className="space-y-4">
        {/* Numéro de carte */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Numéro de carte
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none z-10" />
            <div className="input-custom pl-10">
              <CardNumberElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        {/* Date d'expiration et CVV */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date d'expiration */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Date d'expiration
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none z-10" />
              <div className="input-custom pl-10">
                <CardExpiryElement options={cardElementOptions} />
              </div>
            </div>
          </div>

          {/* Code de sécurité (CVV) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
              CVV
              <span className="text-xs text-neutral-500 font-normal">(3 chiffres au dos)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none z-10" />
              <div className="input-custom pl-10">
                <CardCvcElement options={cardElementOptions} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-500 mt-2">
          💳 Cartes de test : <span className="font-mono">4242 4242 4242 4242</span> (Succès) • <span className="font-mono">4000 0000 0000 0002</span> (Refusée)
        </p>
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-red-900 mb-1">Erreur de paiement</div>
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* Conditions générales */}
      <label className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 cursor-pointer">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1 rounded text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-neutral-700">
          J'accepte les{' '}
          <a href="/conditions" target="_blank" className="text-primary-600 hover:underline">
            conditions générales
          </a>{' '}
          et la{' '}
          <a href="/confidentialite" target="_blank" className="text-primary-600 hover:underline">
            politique de confidentialité
          </a>
        </span>
      </label>

      {/* Bouton de paiement */}
      <button
        type="submit"
        disabled={!stripe || processing || loading || !acceptedTerms}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing || loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <ShieldCheck className="h-5 w-5" />
            Confirmer et payer {amount.toFixed(2)}$
          </>
        )}
      </button>
    </form>
  )
}
