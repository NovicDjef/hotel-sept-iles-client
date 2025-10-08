export interface Room {
  id: number
  nom: string
  categorie: 'Premium' | 'Standard' | 'Famille' | 'Business'
  description: string
  prix: number
  capacite: number
  superficie: number
  images: string[]
  equipements: string[]
  note: number
  avis: number
  disponible: boolean
}
