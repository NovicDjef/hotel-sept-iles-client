import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export const getStripe = () => {
  // Ne charger Stripe que côté client
  if (typeof window === 'undefined') {
    return null
  }

  if (!stripePromise) {
    // Remplacez par votre clé publique Stripe
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

    if (!publishableKey) {
      console.warn('⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY n\'est pas défini')
    }

    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}
