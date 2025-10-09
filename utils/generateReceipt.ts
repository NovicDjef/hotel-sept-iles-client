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

  // Couleurs élégantes de l'hôtel
  const primaryColor = [13, 71, 161] // Bleu navy élégant
  const goldColor = [218, 165, 32] // Or luxueux
  const darkGold = [184, 134, 11] // Or foncé
  const lightGray = [248, 250, 252]
  const mediumGray = [148, 163, 184]
  const darkGray = [51, 65, 85]
  const accentBlue = [59, 130, 246]

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginBottom = 40 // Marge pour le footer

  // Fonction pour vérifier si on doit ajouter une nouvelle page
  const checkPageBreak = (currentY: number, neededSpace: number) => {
    if (currentY + neededSpace > pageHeight - marginBottom) {
      doc.addPage()
      return 20 // Retourner à la position du haut de la nouvelle page
    }
    return currentY
  }

  // === FILIGRANE ÉLÉGANT ===
  doc.saveGraphicsState()
  doc.setGState(new doc.GState({ opacity: 0.03 }))
  doc.setFontSize(80)
  doc.setTextColor(100, 100, 100)

  // Filigrane diagonal (sans caractères spéciaux)
  doc.text('HOTEL SEPT-ILES', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45
  })

  // Motifs décoratifs subtils
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  for (let i = 0; i < 5; i++) {
    doc.circle(20 + i * 40, 20, 3)
    doc.circle(pageWidth - 20 - i * 40, pageHeight - 20, 3)
  }

  doc.restoreGraphicsState()

  // === EN-TÊTE PREMIUM ===
  // Gradient effect avec deux rectangles
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 50, 'F')

  // Bande dorée décorative
  doc.setFillColor(...goldColor)
  doc.rect(0, 48, pageWidth, 2, 'F')

  // Nom de l'hôtel avec style élégant (sans accents)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('HOTEL SEPT-ILES', 20, 22)

  // Sous-titre élégant (sans accents)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(220, 220, 220)
  doc.text('Luxe & Raffinement au Coeur de la Cote-Nord', 20, 30)

  // Coordonnées (sans emojis)
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 200)
  doc.text('Sept-Iles, Quebec, Canada', 20, 38)
  doc.text('Tel: (418) 962-2581', 20, 42)

  // Logo de l'hôtel
  // Fond blanc circulaire pour le logo
  doc.setFillColor(255, 255, 255)
  doc.circle(pageWidth - 30, 25, 15, 'F')

  // Bordure dorée
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(1.5)
  doc.circle(pageWidth - 30, 25, 15)

  // Texte du logo (H dans un cercle)
  doc.setTextColor(...goldColor)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('H', pageWidth - 33.5, 30)

  // === TITRE DU DOCUMENT ÉLÉGANT ===
  let yPos = 70

  // Encadré pour le titre
  doc.setFillColor(...lightGray)
  doc.roundedRect(15, yPos - 8, pageWidth - 30, 22, 3, 3, 'F')

  doc.setTextColor(...primaryColor)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('CONFIRMATION DE RÉSERVATION', pageWidth / 2, yPos + 4, { align: 'center' })

  yPos += 30

  // === INFORMATIONS DE RÉSERVATION AVEC ENCADRÉ ===
  // Numéro de réservation stylisé
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(0.5)
  doc.roundedRect(20, yPos, (pageWidth - 40) / 2 - 5, 14, 2, 2, 'S')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('N° RÉSERVATION', 25, yPos + 5)

  doc.setFontSize(11)
  doc.setTextColor(...primaryColor)
  doc.text(data.reservationNumber, 25, yPos + 11)

  // Date d'émission
  doc.setDrawColor(...goldColor)
  doc.roundedRect(pageWidth / 2 + 5, yPos, (pageWidth - 40) / 2 - 5, 14, 2, 2, 'S')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('DATE D\'ÉMISSION', pageWidth / 2 + 10, yPos + 5)

  doc.setFontSize(11)
  doc.setTextColor(...primaryColor)
  doc.text(data.date, pageWidth / 2 + 10, yPos + 11)

  yPos += 22

  // === INFORMATIONS CLIENT (STYLE PREMIUM) ===
  // Bordure dorée
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(1)
  doc.roundedRect(20, yPos, pageWidth - 40, 42, 3, 3, 'S')

  // Fond dégradé (simulé)
  doc.setFillColor(252, 252, 253)
  doc.roundedRect(20, yPos, pageWidth - 40, 42, 3, 3, 'F')

  // Icône client (cercle)
  doc.setFillColor(...accentBlue)
  doc.circle(28, yPos + 10, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text('👤', 26, yPos + 11)

  yPos += 8
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('INFORMATIONS CLIENT', 38, yPos)

  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text(`${data.client.prenom} ${data.client.nom}`, 25, yPos)

  yPos += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...mediumGray)
  doc.text(`Email: ${data.client.email}`, 25, yPos)

  yPos += 6
  doc.text(`Tel: ${data.client.telephone}`, 25, yPos)

  if (data.client.adresse) {
    yPos += 6
    doc.text(`Adresse: ${data.client.adresse}`, 25, yPos)
  }

  yPos += 20

  // Vérifier si on a besoin d'une nouvelle page
  yPos = checkPageBreak(yPos, 60)

  // === DETAILS DE LA RESERVATION (STYLE ELEGANT) ===
  // Bordure avec gradient
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(1)
  doc.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'S')

  // Fond avec légère teinte
  doc.setFillColor(247, 250, 252)
  doc.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F')

  // Icône chambre
  doc.setFillColor(...goldColor)
  doc.circle(28, yPos + 10, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('CH', 24.5, yPos + 12)

  yPos += 8
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('DETAILS DE LA RESERVATION', 38, yPos)

  yPos += 9

  // Grille d'informations avec icônes
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Chambre:', 25, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text(`${data.chambre.nom} (${data.chambre.categorie})`, 55, yPos)

  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Prix/nuit:', 25, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...goldColor)
  doc.text(`${data.chambre.prix.toFixed(2)} $ CAD`, 55, yPos)

  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Arrivee:', 25, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text(`${new Date(data.dateDebut).toLocaleDateString('fr-CA')}`, 55, yPos)

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Depart:', 110, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text(`${new Date(data.dateFin).toLocaleDateString('fr-CA')}`, 135, yPos)

  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Nuits:', 25, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text(`${data.nombreNuits}`, 55, yPos)

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Personnes:', 110, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mediumGray)
  doc.text(`${data.nombrePersonnes}`, 135, yPos)

  yPos += 22

  // Vérifier si on a besoin d'une nouvelle page
  yPos = checkPageBreak(yPos, 40)

  // === SERVICES ADDITIONNELS (STYLE PREMIUM) ===
  if (data.services && data.services.length > 0) {
    const servicesHeight = 18 + (data.services.length * 8) + 5

    // Vérifier si on a besoin d'une nouvelle page pour les services
    yPos = checkPageBreak(yPos, servicesHeight)

    // Bordure élégante
    doc.setDrawColor(...accentBlue)
    doc.setLineWidth(0.8)
    doc.roundedRect(20, yPos, pageWidth - 40, servicesHeight, 3, 3, 'S')

    // Fond
    doc.setFillColor(250, 252, 255)
    doc.roundedRect(20, yPos, pageWidth - 40, servicesHeight, 3, 3, 'F')

    // Icône services (texte au lieu d'emoji)
    doc.setFillColor(...accentBlue)
    doc.circle(28, yPos + 9, 3.5, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('S', 26, yPos + 11)

    yPos += 8
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...accentBlue)
    doc.text('SERVICES ADDITIONNELS', 38, yPos)

    yPos += 9
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...darkGray)

    data.services.forEach((service, index) => {
      // Alternance de fond subtile
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255)
        doc.roundedRect(23, yPos - 2, pageWidth - 46, 7, 1, 1, 'F')
      }

      doc.setTextColor(...darkGray)
      doc.text(`- ${service.nom}`, 26, yPos)
      doc.setTextColor(...goldColor)
      doc.setFont('helvetica', 'bold')
      doc.text(`${service.prix.toFixed(2)} $ CAD`, pageWidth - 26, yPos, { align: 'right' })
      doc.setFont('helvetica', 'normal')
      yPos += 8
    })

    yPos += 10
  }

  // === RESUME FINANCIER PREMIUM ===
  yPos += 5

  // Vérifier si on a besoin d'une nouvelle page pour le résumé
  yPos = checkPageBreak(yPos, 60)

  // Encadré élégant pour le résumé financier
  const summaryBoxHeight = 55
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(1.5)
  doc.roundedRect(20, yPos, pageWidth - 40, summaryBoxHeight, 3, 3, 'S')

  // Fond dégradé (simulé)
  doc.setFillColor(255, 253, 245)
  doc.roundedRect(20, yPos, pageWidth - 40, summaryBoxHeight, 3, 3, 'F')

  // Titre du résumé (sans accents)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('RESUME FINANCIER', pageWidth / 2, yPos + 8, { align: 'center' })

  yPos += 14

  // Ligne de séparation dorée
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(0.5)
  doc.line(25, yPos, pageWidth - 25, yPos)

  yPos += 8

  // Sous-total
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)
  doc.text('Sous-total', 30, yPos)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.subtotal.toFixed(2)} $ CAD`, pageWidth - 30, yPos, { align: 'right' })

  yPos += 7

  // TPS
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)
  doc.text('T.P.S (5%)', 30, yPos)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.tps.toFixed(2)} $ CAD`, pageWidth - 30, yPos, { align: 'right' })

  yPos += 7

  // TVQ
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)
  doc.text('T.V.Q (9,975%)', 30, yPos)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.tvq.toFixed(2)} $ CAD`, pageWidth - 30, yPos, { align: 'right' })

  yPos += 10

  // Ligne de séparation épaisse
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(1.2)
  doc.line(25, yPos - 2, pageWidth - 25, yPos - 2)

  yPos += 6

  // TOTAL avec fond doré
  doc.setFillColor(...goldColor)
  doc.roundedRect(25, yPos - 5, pageWidth - 50, 12, 2, 2, 'F')

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('TOTAL', 35, yPos + 2)

  doc.setFontSize(15)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.total.toFixed(2)} $ CAD`, pageWidth - 35, yPos + 2, { align: 'right' })

  yPos += 20

  // === PIED DE PAGE ÉLÉGANT ===
  const footerY = pageHeight - 35

  // Bande dorée décorative en haut du footer
  doc.setFillColor(...goldColor)
  doc.rect(0, footerY - 2, pageWidth, 2, 'F')

  // Fond principal du footer avec dégradé (simulé)
  doc.setFillColor(...primaryColor)
  doc.rect(0, footerY, pageWidth, 35, 'F')

  // Ligne décorative dorée
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(0.5)
  doc.line(30, footerY + 18, pageWidth - 30, footerY + 18)

  // Message de remerciement (sans accents)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('Merci d\'avoir choisi l\'Hotel Sept-Iles', pageWidth / 2, footerY + 8, { align: 'center' })

  // Informations de contact (sans emojis)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(220, 220, 220)
  doc.text('Tel: (418) 962-2581  |  Email: info@hotel-sept-iles.ca  |  Web: www.hotel-sept-iles.ca', pageWidth / 2, footerY + 13, { align: 'center' })

  // Texte final (sans accents)
  doc.setFontSize(7)
  doc.setTextColor(200, 200, 200)
  doc.text('Sept-Iles, Quebec, Canada - Au service de votre confort depuis 1985', pageWidth / 2, footerY + 23, { align: 'center' })

  // Certification / Badge (sans accents)
  doc.setFontSize(6)
  doc.setTextColor(180, 180, 180)
  doc.text('***** Hotel Certifie Excellence 2024', pageWidth / 2, footerY + 28, { align: 'center' })

  // === TÉLÉCHARGEMENT DU PDF ===
  const fileName = `Recu_Reservation_${data.reservationNumber}_${new Date().getTime()}.pdf`
  doc.save(fileName)
}
