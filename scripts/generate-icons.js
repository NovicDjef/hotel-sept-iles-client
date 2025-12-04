/**
 * Script pour générer toutes les tailles d'icônes à partir du logo de l'hôtel
 * Usage: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputLogo = path.join(__dirname, '../public/images/hotel/logoH.jpg');
const outputDir = path.join(__dirname, '../public/icons');

// Créer le dossier icons s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Tailles d'icônes nécessaires
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
];

async function generateIcons() {
  console.log('🎨 Génération des icônes à partir de:', inputLogo);
  console.log('📁 Destination:', outputDir);
  console.log('');

  try {
    // Vérifier que le fichier source existe
    if (!fs.existsSync(inputLogo)) {
      throw new Error(`Le fichier ${inputLogo} n'existe pas`);
    }

    // Générer chaque taille
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);

      await sharp(inputLogo)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png({
          quality: 100,
          compressionLevel: 9
        })
        .toFile(outputPath);

      console.log(`✅ Généré: ${name} (${size}x${size})`);
    }

    // Générer aussi un favicon.ico multi-résolution
    console.log('');
    console.log('🔄 Génération du favicon.ico...');

    // Créer les images temporaires pour le favicon
    const favicon16 = path.join(outputDir, 'temp-16.png');
    const favicon32 = path.join(outputDir, 'temp-32.png');
    const favicon48 = path.join(outputDir, 'temp-48.png');

    await sharp(inputLogo).resize(16, 16).png().toFile(favicon16);
    await sharp(inputLogo).resize(32, 32).png().toFile(favicon32);
    await sharp(inputLogo).resize(48, 48).png().toFile(favicon48);

    // Note: La conversion en .ico nécessite un outil supplémentaire
    // Pour l'instant, on utilise le PNG 32x32 comme favicon
    await sharp(inputLogo)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon.png'));

    // Nettoyer les fichiers temporaires
    fs.unlinkSync(favicon16);
    fs.unlinkSync(favicon32);
    fs.unlinkSync(favicon48);

    console.log('✅ Favicon généré');
    console.log('');
    console.log('🎉 Toutes les icônes ont été générées avec succès!');
    console.log('');
    console.log('📝 Note: Pour un vrai favicon.ico, utilisez un outil en ligne:');
    console.log('   - https://favicon.io/');
    console.log('   - https://realfavicongenerator.net/');

  } catch (error) {
    console.error('❌ Erreur lors de la génération des icônes:', error.message);
    process.exit(1);
  }
}

// Exécuter la génération
generateIcons();
