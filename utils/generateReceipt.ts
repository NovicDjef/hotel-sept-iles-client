// @ts-nocheck

interface ReservationData {
  reservationNumber: string
  guestId: string  // ID unique du client pour recherche
  date: string
  chambre: {
    nom: string
    categorie: string
    prix: number
  }
  dateDebut: string
  dateFin: string
  nombreNuits: number
  nombrePersonnes: number
  client: {
    nom: string
    prenom: string
    email: string
    telephone: string
  }
  services?: Array<{
    nom: string
    prix: number
    prixOriginal?: number
    duree?: number
    nombrePersonnes?: number
  }>
  subtotal: number
  tps: number
  tvq: number
  total: number
}

const loadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg'))
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = url
  })
}

export const generateReceiptPDF = async (data: ReservationData) => {
  if (typeof window === 'undefined') {
    console.warn('generateReceiptPDF appelé côté serveur, ignoré')
    return
  }

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  // Charger le logo
  let logoBase64: string | null = null
  try {
    logoBase64 = await loadImage('/images/hotel/logoH.jpg')
  } catch (error) {
    console.warn('Impossible de charger le logo:', error)
  }

  // Palette de couleurs modernes
  const navy = [13, 71, 161]
  const gold = [218, 165, 32]
  const darkGray = [51, 65, 85]
  const mediumGray = [100, 116, 139]
  const lightGray = [148, 163, 184]
  const veryLightGray = [241, 245, 249]

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  let y = 20

  // ============ EN-TÊTE SIMPLE ============
  // Logo
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'JPEG', 20, y, 30, 22)
    } catch (error) {
      console.warn('Erreur logo:', error)
    }
  }

  // Nom de l'hôtel
  doc.setTextColor(...navy)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('HÔTEL SEPT-ÎLES', pageWidth / 2, y + 8, { align: 'center' })

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text('Sept-Îles, Québec  •  (418) 962-2581', pageWidth / 2, y + 15, { align: 'center' })

  y += 35

  // Ligne de séparation
  doc.setDrawColor(...gold)
  doc.setLineWidth(0.5)
  doc.line(20, y, pageWidth - 20, y)

  y += 15

  // ============ TITRE ============
  doc.setTextColor(...darkGray)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('REÇU DE RÉSERVATION', pageWidth / 2, y, { align: 'center' })

  y += 12

  // ============ NUMÉROS DE RÉFÉRENCE ============
  // Fond gris léger
  doc.setFillColor(...veryLightGray)
  doc.rect(20, y - 3, pageWidth - 40, 18, 'F')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text('N° Réservation', 25, y + 3)
  doc.text('ID Client', 25, y + 10)

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.setFontSize(10)
  doc.text(data.reservationNumber, 65, y + 3)
  doc.text(data.guestId, 65, y + 10)

  // Date à droite
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...mediumGray)
  doc.text('Date d\'émission', pageWidth - 25, y + 3, { align: 'right' })
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text(data.date, pageWidth - 25, y + 10, { align: 'right' })

  y += 25

  // ============ INFORMATIONS CLIENT ============
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.text('CLIENT', 20, y)

  y += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text(`${data.client.prenom} ${data.client.nom}`, 20, y)

  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...mediumGray)
  doc.text(data.client.email, 20, y)

  y += 5
  doc.text(data.client.telephone, 20, y)

  y += 15

  // ============ DÉTAILS DE LA RÉSERVATION ============
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.text('DÉTAILS DE LA RÉSERVATION', 20, y)

  y += 8

  // Fond gris léger
  doc.setFillColor(...veryLightGray)
  doc.rect(20, y - 3, pageWidth - 40, 30, 'F')

  // Chambre
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text('Chambre', 25, y + 3)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.setFontSize(10)
  doc.text(`${data.chambre.nom}`, 25, y + 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...lightGray)
  doc.text(`(${data.chambre.categorie})`, 25, y + 14)

  // Dates (en deux colonnes)
  const colX = pageWidth / 2 + 10
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text('Arrivée', colX, y + 3)
  doc.text('Départ', colX + 40, y + 3)

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.setFontSize(9)
  doc.text(new Date(data.dateDebut).toLocaleDateString('fr-CA'), colX, y + 9)
  doc.text(new Date(data.dateFin).toLocaleDateString('fr-CA'), colX + 40, y + 9)

  // Nuits et personnes
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...mediumGray)
  doc.text('Nuits', colX, y + 16)
  doc.text('Personnes', colX + 40, y + 16)

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text(String(data.nombreNuits), colX, y + 22)
  doc.text(String(data.nombrePersonnes), colX + 40, y + 22)

  y += 38

  // ============ SERVICES SPA (si présents) ============
  if (data.services && data.services.length > 0) {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...navy)
    doc.text('SERVICES SPA', 20, y)

    y += 8

    data.services.forEach((service) => {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkGray)
      
      let serviceName = service.nom
      if (service.duree) serviceName += ` (${service.duree}min)`
      if (service.nombrePersonnes && service.nombrePersonnes > 1) {
        serviceName += ` - ${service.nombrePersonnes} pers.`
      }
      
      doc.text(serviceName, 20, y)

      // Prix
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...gold)
      doc.text(`${service.prix.toFixed(2)} $`, pageWidth - 20, y, { align: 'right' })

      y += 6
    })

    y += 10
  }

  // ============ RÉSUMÉ FINANCIER ============
  y += 5

  // Ligne de séparation
  doc.setDrawColor(...lightGray)
  doc.setLineWidth(0.3)
  doc.line(20, y, pageWidth - 20, y)

  y += 10

  // Sous-total
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)
  doc.text('Sous-total', 20, y)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.subtotal.toFixed(2)} $`, pageWidth - 20, y, { align: 'right' })

  y += 7

  // TPS
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.setFontSize(9)
  doc.text('TPS (5%)', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text(`${data.tps.toFixed(2)} $`, pageWidth - 20, y, { align: 'right' })

  y += 6

  // TVQ
  doc.text('TVQ (9,975%)', 20, y)
  doc.text(`${data.tvq.toFixed(2)} $`, pageWidth - 20, y, { align: 'right' })

  y += 10

  // Ligne épaisse
  doc.setDrawColor(...gold)
  doc.setLineWidth(1)
  doc.line(20, y, pageWidth - 20, y)

  y += 10

  // TOTAL
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.text('TOTAL', 20, y)

  doc.setFontSize(16)
  doc.setTextColor(...gold)
  doc.text(`${data.total.toFixed(2)} $ CAD`, pageWidth - 20, y, { align: 'right' })

  // ============ PIED DE PAGE ============
  const footerY = pageHeight - 30

  // Ligne de séparation
  doc.setDrawColor(...lightGray)
  doc.setLineWidth(0.3)
  doc.line(20, footerY, pageWidth - 20, footerY)

  // Message
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.text('Merci de votre confiance !', pageWidth / 2, footerY + 8, { align: 'center' })

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text('Pour toute question : info@hotel-sept-iles.ca  •  (418) 962-2581', pageWidth / 2, footerY + 14, { align: 'center' })

  // Téléchargement
  const fileName = `Recu_${data.guestId}_${data.reservationNumber}.pdf`
  doc.save(fileName)
}