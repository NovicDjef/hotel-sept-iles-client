/**
 * Utilitaires pour le calcul des prix avec gestion des tarifs weekend
 */

/**
 * Vérifie si une date est un weekend (vendredi soir, samedi ou dimanche)
 */
export function isWeekendDay(date: Date): boolean {
  const day = date.getDay()
  // 5 = Vendredi, 6 = Samedi, 0 = Dimanche
  return day === 5 || day === 6 || day === 0
}

/**
 * Compte le nombre de nuits de weekend dans une période
 * Les nuits de weekend sont: Vendredi soir, Samedi soir, Dimanche soir
 */
export function countWeekendNights(checkIn: Date, checkOut: Date): number {
  let weekendNights = 0
  const currentDate = new Date(checkIn)

  while (currentDate < checkOut) {
    if (isWeekendDay(currentDate)) {
      weekendNights++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return weekendNights
}

/**
 * Calcule le nombre total de nuits
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Calcule le prix total d'une réservation avec tarifs weekend
 */
export function calculateTotalPrice(
  checkIn: Date,
  checkOut: Date,
  basePrice: number,
  weekendPrice: number
): {
  totalNights: number
  weekdayNights: number
  weekendNights: number
  weekdayTotal: number
  weekendTotal: number
  totalPrice: number
  hasWeekend: boolean
} {
  const totalNights = calculateNights(checkIn, checkOut)
  const weekendNights = countWeekendNights(checkIn, checkOut)
  const weekdayNights = totalNights - weekendNights

  const weekdayTotal = weekdayNights * basePrice
  const weekendTotal = weekendNights * weekendPrice
  const totalPrice = weekdayTotal + weekendTotal

  return {
    totalNights,
    weekdayNights,
    weekendNights,
    weekdayTotal,
    weekendTotal,
    totalPrice,
    hasWeekend: weekendNights > 0
  }
}

/**
 * Calcule le prix moyen par nuit (pour affichage)
 */
export function calculateAverageNightPrice(
  checkIn: Date,
  checkOut: Date,
  basePrice: number,
  weekendPrice: number
): number {
  const { totalPrice, totalNights } = calculateTotalPrice(checkIn, checkOut, basePrice, weekendPrice)
  return totalNights > 0 ? Math.round(totalPrice / totalNights) : basePrice
}

/**
 * Formate une date en ISO (YYYY-MM-DD) pour l'API
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Parse une date ISO (YYYY-MM-DD) en Date
 */
export function parseDateISO(dateString: string): Date {
  return new Date(dateString + 'T00:00:00')
}
