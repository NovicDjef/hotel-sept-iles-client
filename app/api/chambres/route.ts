import { NextResponse } from 'next/server'
import { rooms } from '@/data/rooms'

// GET /api/chambres - Récupérer toutes les chambres
export async function GET() {
  try {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500))

    // Retourner les chambres
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chambres' },
      { status: 500 }
    )
  }
}
