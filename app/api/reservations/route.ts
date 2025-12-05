import { NextResponse } from 'next/server'

// GET /api/reservations - Recuperer les reservations
export async function GET() {
  try {
    // Cette route est pour la compatibilite, les vraies donnees viennent du backend
    return NextResponse.json({ message: 'Utilisez API backend pour les reservations' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation des reservations' },
      { status: 500 }
    )
  }
}
