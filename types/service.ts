// API Response Types (from backend)
export interface ApiService {
  id: string
  nom: string
  description: string
  descriptionLongue: string
  categorie: string
  duree: number[]
  prix: { [key: number]: number }
  image: string
  bienfaits: string[]
  inclus: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ApiForfait {
  id: string
  nom: string
  description: string
  prixIndividuel: number
  prixDuo: number
  economieIndividuel: number
  economieDuo: number
  services: string[] // IDs des services inclus
  createdAt?: string
  updatedAt?: string
}

export interface ApiCertificatCadeau {
  id: string
  montant: number
  populaire: boolean
  disponible: boolean
  createdAt?: string
  updatedAt?: string
}

// UI Types (used throughout the application)
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
}

export interface Forfait {
  id: string
  nom: string
  description: string
  prixIndividuel: number
  prixDuo: number
  economieIndividuel: number
  economieDuo: number
  services: string[] // IDs des services inclus
}

export interface CertificatCadeau {
  id: string
  montant: number
  populaire: boolean
  disponible: boolean
}

// Transformers: API -> UI
export function transformApiServiceToService(apiService: ApiService): Service {
  // Map category to UI category
  const categoryMap: { [key: string]: Service['categorie'] } = {
    'massage': 'Massage',
    'spa': 'Spa',
    'soins': 'Soins',
    'Massage': 'Massage',
    'Spa': 'Spa',
    'Soins': 'Soins',
  }

  return {
    id: apiService.id,
    nom: apiService.nom,
    description: apiService.description,
    descriptionLongue: apiService.descriptionLongue,
    categorie: categoryMap[apiService.categorie] || 'Soins',
    duree: apiService.duree,
    prix: apiService.prix,
    image: apiService.image,
    bienfaits: apiService.bienfaits,
    inclus: apiService.inclus,
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
    services: apiForfait.services,
  }
}

export function transformApiCertificatToCertificat(apiCertificat: ApiCertificatCadeau): CertificatCadeau {
  return {
    id: apiCertificat.id,
    montant: apiCertificat.montant,
    populaire: apiCertificat.populaire,
    disponible: apiCertificat.disponible,
  }
}
