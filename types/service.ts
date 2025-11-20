// API Response Types (from backend)

// Catégorie spa depuis l'API
export interface ApiSpaCategory {
  id: string
  name: string
  slug: string
  servicesCount: number
}

export interface ApiService {
  id: string
  hotelId: string
  nom: string
  description: string
  descriptionLongue: string
  categorie: 'SPA' | 'MASSAGE' | 'SOINS'
  durees: number[]
  prix: { [key: string]: number }
  image: string
  bienfaits: string[]
  inclus: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiServiceInForfait {
  id: string
  forfaitId: string
  serviceId: string
  service: {
    id: string
    nom: string
    description: string
    categorie: string
    durees: number[]
    prix: { [key: string]: number }
  }
}

export interface ApiForfait {
  id: string
  hotelId: string
  nom: string
  description: string
  prixIndividuel: number
  prixDuo: number
  economieIndividuel: number
  economieDuo: number
  isActive: boolean
  services: ApiServiceInForfait[]
  createdAt: string
  updatedAt: string
}

export interface ApiCertificatCadeau {
  id: string
  hotelId: string
  code: string
  montant: number
  acheteurNom?: string
  acheteurEmail?: string
  acheteurPhone?: string
  beneficiaireNom?: string
  beneficiaireEmail?: string
  message?: string
  isUtilise: boolean
  dateUtilisation?: string | null
  utiliseParId?: string | null
  dateExpiration: string
  estPaye: boolean
  transactionId?: string | null
  createdAt: string
  updatedAt: string
}

export interface ApiSpaReservation {
  id: string
  hotelId: string
  guestId: string
  type: 'SERVICE' | 'FORFAIT'
  serviceId?: string | null
  forfaitId?: string | null
  date: string
  heure: string
  duree?: number
  nombrePersonnes: number
  prixTotal: number
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes?: string
  guest?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  service?: ApiService | null
  forfait?: ApiForfait | null
  createdAt: string
  updatedAt: string
}

// UI Types (used throughout the application)

export interface SpaCategory {
  id: string
  name: string
  slug: string
  servicesCount: number
}

export interface Service {
  id: string
  nom: string
  description: string
  descriptionLongue: string
  categorie: 'Massage' | 'Spa' | 'Soins'
  duree: number[]
  prix: { [key: number]: number }
  image: string
  bienfaits: string[]
  inclus: string[]
  isActive: boolean
}

export interface Forfait {
  id: string
  nom: string
  description: string
  prixIndividuel: number
  prixDuo: number
  economieIndividuel: number
  economieDuo: number
  services: Array<{
    id: string
    nom: string
    description: string
    categorie: string
  }>
  isActive: boolean
}

export interface CertificatCadeau {
  id: string
  code: string
  montant: number
  populaire: boolean
  disponible: boolean
  isUtilise: boolean
  dateExpiration: string
}

export interface SpaReservation {
  id: string
  type: 'SERVICE' | 'FORFAIT'
  serviceId?: string
  forfaitId?: string
  date: string
  heure: string
  duree?: number
  nombrePersonnes: number
  prixTotal: number
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes?: string
}

// Transformers: API -> UI
export function transformApiServiceToService(apiService: ApiService): Service {
  // Map category to UI category
  const categoryMap: { [key: string]: Service['categorie'] } = {
    'MASSAGE': 'Massage',
    'SPA': 'Spa',
    'SOINS': 'Soins',
  }

  // Convertir les prix de { "50": 75 } vers { 50: 75 }
  const prix: { [key: number]: number } = {}
  Object.entries(apiService.prix).forEach(([key, value]) => {
    prix[parseInt(key)] = value
  })

  return {
    id: apiService.id,
    nom: apiService.nom,
    description: apiService.description,
    descriptionLongue: apiService.descriptionLongue,
    categorie: categoryMap[apiService.categorie] || 'Soins',
    duree: apiService.durees,
    prix: prix,
    image: apiService.image,
    bienfaits: apiService.bienfaits,
    inclus: apiService.inclus,
    isActive: apiService.isActive,
  }
}

export function transformApiForfaitToForfait(apiForfait: ApiForfait): Forfait {
  return {
    id: apiForfait.id,
    nom: apiForfait.nom,
    description: apiForfait.description,
    prixIndividuel: apiForfait.prixIndividuel,
    prixDuo: apiForfait.prixDuo,
    economieIndividuel: apiForfait.economieIndividuel,
    economieDuo: apiForfait.economieDuo,
    services: apiForfait.services.map(s => ({
      id: s.service.id,
      nom: s.service.nom,
      description: s.service.description,
      categorie: s.service.categorie,
    })),
    isActive: apiForfait.isActive,
  }
}

export function transformApiCertificatToCertificat(apiCertificat: ApiCertificatCadeau): CertificatCadeau {
  // Déterminer si le montant est populaire (selon la liste fournie)
  const montantsPopulaires = [50, 100, 200, 500]
  const populaire = montantsPopulaires.includes(apiCertificat.montant)

  // Vérifier si le certificat est disponible (non utilisé et non expiré)
  const dateExpiration = new Date(apiCertificat.dateExpiration)
  const maintenant = new Date()
  const disponible = !apiCertificat.isUtilise && dateExpiration > maintenant && apiCertificat.estPaye

  return {
    id: apiCertificat.id,
    code: apiCertificat.code,
    montant: apiCertificat.montant,
    populaire,
    disponible,
    isUtilise: apiCertificat.isUtilise,
    dateExpiration: apiCertificat.dateExpiration,
  }
}

/**
 * Transformer pour les montants de certificats depuis /api/v1/spa/certificats/amounts
 * Format API: { montant: number, label: string, isPopular: boolean }
 */
export function transformCertificatAmountToCertificat(apiAmount: { montant: number, label: string, isPopular: boolean }): CertificatCadeau {
  return {
    id: `amount-${apiAmount.montant}`,
    code: '',
    montant: apiAmount.montant,
    populaire: apiAmount.isPopular,
    disponible: true, // Les montants sont toujours disponibles
    isUtilise: false,
    dateExpiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an dans le futur
  }
}
