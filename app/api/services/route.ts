import { NextResponse } from 'next/server'

// GET /api/services - Recuperer les services
export async function GET() {
  try {
    // Cette route est pour la compatibilite, les vraies donnees viennent du backend
    return NextResponse.json({ message: 'Utilisez API backend pour les services' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation des services' },
      { status: 500 }
    )
  }
}
