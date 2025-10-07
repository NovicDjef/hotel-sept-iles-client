// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// ============================================
// hooks/useChambres.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chambresApi } from '@/lib/api'

export function useChambres(filters?: any) {
  return useQuery({
    queryKey: ['chambres', filters],
    queryFn: () => chambresApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useChambre(id: string) {
  return useQuery({
    queryKey: ['chambre', id],
    queryFn: () => chambresApi.getById(id),
    enabled: !!id,
  })
}

export function useDisponibiliteChambre() {
  return useMutation({
    mutationFn: ({ chambreId, dateArrivee, dateDepart }: {
      chambreId: number
      dateArrivee: string
      dateDepart: string
    }) => chambresApi.checkDisponibilite(chambreId, dateArrivee, dateDepart),
  })
}

// ============================================
// hooks/useServices.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'

export function useServices(categorie?: string) {
  return useQuery({
    queryKey: ['services', categorie],
    queryFn: () => servicesApi.getAll(categorie),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useService(id: number) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreneauDisponible() {
  return useMutation({
    mutationFn: ({ serviceId, date, heure }: {
      serviceId: number
      date: string
      heure: string
    }) => servicesApi.checkCreneauDisponible(serviceId, date, heure),
  })
}

// ============================================
// hooks/useReservation.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reservationsApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import type { Reservation } from '@/types'

export function useCreateReservation() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: reservationsApi.create,
    onSuccess: (data: Reservation) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      router.push(`/reservation/confirmation/${data.id}`)
    },
    onError: (error: any) => {
      console.error('Erreur lors de la création de la réservation:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    }
  })
}

export function useMesReservations() {
  return useQuery({
    queryKey: ['reservations', 'mes-reservations'],
    queryFn: reservationsApi.getMesReservations,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useReservation(id: number) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: () => reservationsApi.getById(id),
    enabled: !!id,
  })
}

export function useAnnulerReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => reservationsApi.annuler(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      alert('Réservation annulée avec succès')
    },
  })
}

export function useCalculerPrix() {
  return useMutation({
    mutationFn: reservationsApi.calculerPrix,
  })
}

// ============================================
// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, motDePasse }: { email: string; motDePasse: string }) =>
      authApi.login(email, motDePasse),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.client)
      router.push('/mon-compte')
    },
    onError: () => {
      alert('Email ou mot de passe incorrect')
    }
  })
}

export function useRegister() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.client)
      router.push('/mon-compte')
    },
    onError: () => {
      alert('Une erreur est survenue lors de l\'inscription')
    }
  })
}

export function useProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: authApi.getProfile,
    retry: false,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'profile'], data)
      alert('Profil mis à jour avec succès')
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return () => {
    authApi.logout()
    queryClient.clear()
    router.push('/')
  }
}

// ============================================
// hooks/useAvis.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { avisApi } from '@/lib/api'

export function useAvisChambre(chambreId: number, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['avis', 'chambre', chambreId, page],
    queryFn: () => avisApi.getByChambre(chambreId, page, limit),
    enabled: !!chambreId,
  })
}

export function useCreateAvis() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: avisApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avis'] })
      alert('Merci pour votre avis !')
    },
  })
}

// ============================================
// hooks/usePaiement.ts
import { useMutation } from '@tanstack/react-query'
import { paiementApi } from '@/lib/api'

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (reservationId: number) => 
      paiementApi.createPaymentIntent(reservationId),
  })
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: ({ reservationId, paymentIntentId }: {
      reservationId: number
      paymentIntentId: string
    }) => paiementApi.confirmPayment(reservationId, paymentIntentId),
    onSuccess: () => {
      alert('Paiement confirmé avec succès !')
    },
  })
}

// ============================================
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Exemples d'utilisation
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')

// ============================================
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ============================================
// hooks/useOnClickOutside.ts
import { RefObject, useEffect } from 'react'

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// ============================================
// hooks/useScrollPosition.ts
import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

// ============================================
// hooks/useIntersectionObserver.ts
import { RefObject, useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return entry
}

// ============================================
// hooks/useFavoris.ts
import { useLocalStorage } from './useLocalStorage'

export function useFavoris() {
  const [favoris, setFavoris] = useLocalStorage<number[]>('favoris', [])

  const toggleFavori = (chambreId: number) => {
    setFavoris(prev => 
      prev.includes(chambreId)
        ? prev.filter(id => id !== chambreId)
        : [...prev, chambreId]
    )
  }

  const isFavori = (chambreId: number) => favoris.includes(chambreId)

  return {
    favoris,
    toggleFavori,
    isFavori,
    count: favoris.length
  }
}

// ============================================
// hooks/useWindowSize.ts
import { useState, useEffect } from 'react'

interface WindowSize {
  width: number | undefined
  height: number | undefined
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// ============================================
// hooks/useKeyPress.ts
import { useState, useEffect } from 'react'

export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

// ============================================
// hooks/useForm.ts
import { useState, ChangeEvent, FormEvent } from 'react'

interface UseFormProps<T> {
  initialValues: T
  onSubmit: (values: T) => void
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values)
      }
    } else {
      onSubmit(values)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  }
}

// ============================================
// hooks/useCopyToClipboard.ts
import { useState } from 'react'

export function useCopyToClipboard(): [string | null, (text: string) => Promise<void>] {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
    }
  }

  return [copiedText, copy]
}