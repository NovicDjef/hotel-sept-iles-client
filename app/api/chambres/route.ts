import { NextResponse } from 'next/server'
import { rooms } from '@/data/rooms'

// GET /api/chambres - R�cup�rer toutes les chambres
export async function GET() {
  try {
    // Simuler un d�lai r�seau
    await new Promise(resolve => setTimeout(resolve, 500))

    // Retourner les chambres
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la r�cup�ration des chambres' },
      { status: 500 }
    )
  }
}
