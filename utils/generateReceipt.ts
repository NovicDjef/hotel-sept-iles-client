import { jsPDF } from 'jspdf'

interface ReservationData {
  reservationNumber: string
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
    adresse?: string
  }
  services?: Array<{
    nom: string
    prix: number
    date?: string
  }>
  subtotal: number
  tps: number
  tvq: number
  total: number
}

export const generateReceiptPDF = (data: ReservationData) => {
  const doc = new jsPDF()

  // Couleurs de l'hôtel
  const primaryColor = [13, 71, 161] // Bleu primary
  const goldColor = [234, 179, 8] // Or accent
  const grayColor = [107, 114, 128]

  // === FILIGRANE ===
  doc.saveGraphicsState()
  doc.setGState(new doc.GState({ opacity: 0.1 }))
  doc.setFontSize(60)
  doc.setTextColor(150, 150, 150)

  // Rotation et positionnement du filigrane
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.text('HOTEL SEPT-ILES', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45
  })
  doc.restoreGraphicsState()

  // === EN-TÊTE ===
  // Rectangle bleu en haut
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 40, 'F')

  // Nom de l'hôtel
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('HÔTEL SEPT-ÎLES', 20, 18)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Sept-Îles, Québec, Canada', 20, 26)
  doc.text('Tél: (418) 962-2581', 20, 32)

  // Logo/Icône (si vous avez un logo, vous pouvez l'ajouter ici)
  doc.setFillColor(...goldColor)
  doc.circle(pageWidth - 25, 20, 12, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('H', pageWidth - 28, 24)

  // === TITRE DU DOCUMENT ===
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('REÇU DE RÉSERVATION', pageWidth / 2, 55, { align: 'center' })

  // === INFORMATIONS DE RÉSERVATION ===
  let yPos = 70

  // Numéro de réservation et date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...grayColor)
  doc.text(`Numéro de réservation: ${data.reservationNumber}`, 20, yPos)
  doc.text(`Date d'émission: ${data.date}`, pageWidth - 20, yPos, { align: 'right' })

  yPos += 15

  // === INFORMATIONS CLIENT ===
  doc.setFillColor(245, 245, 245)
  doc.rect(20, yPos, pageWidth - 40, 35, 'F')

  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('INFORMATIONS CLIENT', 25, yPos)

  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(`${data.client.prenom} ${data.client.nom}`, 25, yPos)
  doc.text(`Email: ${data.client.email}`, 25, yPos + 5)
  doc.text(`Téléphone: ${data.client.telephone}`, 25, yPos + 10)
  if (data.client.adresse) {
    doc.text(`Adresse: ${data.client.adresse}`, 25, yPos + 15)
  }

  yPos += 35

  // === DÉTAILS DE LA RÉSERVATION ===
  doc.setFillColor(245, 245, 245)
  doc.rect(20, yPos, pageWidth - 40, 40, 'F')

  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('DÉTAILS DE LA RÉSERVATION', 25, yPos)

  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(`Chambre: ${data.chambre.nom} (${data.chambre.categorie})`, 25, yPos)
  doc.text(`Prix par nuit: ${data.chambre.prix.toFixed(2)} $`, 25, yPos + 5)
  doc.text(`Date d'arrivée: ${new Date(data.dateDebut).toLocaleDateString('fr-CA')}`, 25, yPos + 10)
  doc.text(`Date de départ: ${new Date(data.dateFin).toLocaleDateString('fr-CA')}`, 25, yPos + 15)
  doc.text(`Nombre de nuits: ${data.nombreNuits}`, 25, yPos + 20)
  doc.text(`Nombre de personnes: ${data.nombrePersonnes}`, 25, yPos + 25)

  yPos += 45

  // === SERVICES ADDITIONNELS ===
  if (data.services && data.services.length > 0) {
    doc.setFillColor(245, 245, 245)
    const servicesHeight = 8 + (data.services.length * 5) + 5
    doc.rect(20, yPos, pageWidth - 40, servicesHeight, 'F')

    yPos += 8
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('SERVICES ADDITIONNELS', 25, yPos)

    yPos += 8
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    data.services.forEach((service) => {
      doc.text(`• ${service.nom}`, 25, yPos)
      doc.text(`${service.prix.toFixed(2)} $`, pageWidth - 25, yPos, { align: 'right' })
      yPos += 5
    })

    yPos += 10
  }

  // === LIGNE DE SÉPARATION ===
  doc.setDrawColor(...grayColor)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, pageWidth - 20, yPos)

  yPos += 10

  // === RÉSUMÉ FINANCIER ===
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  // Sous-total
  doc.text('Sous-total:', pageWidth - 80, yPos)
  doc.text(`${data.subtotal.toFixed(2)} $`, pageWidth - 25, yPos, { align: 'right' })
  yPos += 6

  // TPS
  doc.text('T.P.S (5%):', pageWidth - 80, yPos)
  doc.text(`${data.tps.toFixed(2)} $`, pageWidth - 25, yPos, { align: 'right' })
  yPos += 6

  // TVQ
  doc.text('T.V.Q (9,975%):', pageWidth - 80, yPos)
  doc.text(`${data.tvq.toFixed(2)} $`, pageWidth - 25, yPos, { align: 'right' })
  yPos += 10

  // Ligne de séparation
  doc.setLineWidth(1)
  doc.line(pageWidth - 80, yPos - 2, pageWidth - 20, yPos - 2)

  yPos += 5

  // TOTAL
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('TOTAL:', pageWidth - 80, yPos)
  doc.setTextColor(...goldColor)
  doc.text(`${data.total.toFixed(2)} $ CAD`, pageWidth - 25, yPos, { align: 'right' })

  yPos += 15

  // === PIED DE PAGE ===
  const footerY = pageHeight - 30

  doc.setFillColor(...primaryColor)
  doc.rect(0, footerY, pageWidth, 30, 'F')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(255, 255, 255)
  doc.text('Merci d\'avoir choisi l\'Hôtel Sept-Îles', pageWidth / 2, footerY + 10, { align: 'center' })
  doc.text('Pour toute question, contactez-nous au (418) 962-2581 ou info@hotel-sept-iles.ca', pageWidth / 2, footerY + 16, { align: 'center' })
  doc.text('www.hotel-sept-iles.ca', pageWidth / 2, footerY + 22, { align: 'center' })

  // === TÉLÉCHARGEMENT DU PDF ===
  const fileName = `Recu_Reservation_${data.reservationNumber}_${new Date().getTime()}.pdf`
  doc.save(fileName)
}
