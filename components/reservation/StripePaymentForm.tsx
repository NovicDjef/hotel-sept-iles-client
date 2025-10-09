'use client'

import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react'

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
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error('Élément de carte non trouvé')
      }

      // Créer une méthode de paiement
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
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
        lineHeight: '48px',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true,
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message de sécurité */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-semibold text-blue-900 mb-1">
            Paiement 100% sécurisé
          </div>
          <div className="text-sm text-blue-700">
            Vos informations sont cryptées et protégées par Stripe
          </div>
        </div>
      </div>

      {/* Carte de crédit */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Informations de carte
        </label>
        <div className="relative">
          <div className="input-custom">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          Cartes de test : 4242 4242 4242 4242 (Succès) • 4000 0000 0000 0002 (Refusée)
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
