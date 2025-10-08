import { NextRequest, NextResponse } from 'next/server'

// POST /api/chambres/availability - Vérifier la disponibilité d'une chambre
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, checkIn, checkOut } = body

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 300))

    // TODO: Implémenter la vraie logique de vérification avec la base de données
    // Pour l'instant, on simule une disponibilité aléatoire
    const available = Math.random() > 0.3 // 70% de disponibilité

    return NextResponse.json({ available, roomId })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de disponibilité' },
      { status: 500 }
    )
  }
}
