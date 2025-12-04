# Génération des icônes du site

Ce guide explique comment regénérer les icônes du site à partir du logo de l'hôtel.

## Logo source

Le logo de l'hôtel est situé à : `/public/images/hotel/logoH.jpg`

## Icônes générées

Le script `generate-icons.js` génère automatiquement toutes les tailles d'icônes nécessaires :

### Favicons (navigateurs)
- `favicon-16x16.png` - Favicon petite taille
- `favicon-32x32.png` - Favicon taille standard
- `favicon-48x48.png` - Favicon grande taille

### Apple Touch Icons (iOS/iPad)
- `apple-touch-icon-152x152.png` - iPad
- `apple-touch-icon-180x180.png` - iPhone

### Android/Progressive Web App
- `android-chrome-192x192.png` - Android petit
- `android-chrome-512x512.png` - Android grand
- `icon-192x192.png` - PWA petit
- `icon-512x512.png` - PWA grand

## Comment regénérer les icônes

Si vous changez le logo de l'hôtel (`logoH.jpg`), suivez ces étapes :

### 1. Assurez-vous que Sharp est installé
```bash
npm install
```

### 2. Exécutez le script de génération
```bash
node scripts/generate-icons.js
```

### 3. Vérifiez les icônes générées
```bash
ls -lh public/icons/
```

## Fichiers utilisés par le site

Les icônes sont référencées dans :

- `app/layout.tsx` - Configuration des métadonnées et liens
- `public/manifest.json` - Configuration PWA
- `public/favicon.ico` - Favicon racine

## Format du logo source

Pour de meilleurs résultats, le logo source (`logoH.jpg`) devrait :
- Être carré (ratio 1:1) ou avoir le sujet principal centré
- Avoir une résolution d'au moins 512x512 pixels
- Être en haute qualité (pas de compression excessive)
- Avoir un fond qui contraste bien avec le sujet

## Outils en ligne (optionnel)

Pour créer un véritable fichier `.ico` multi-résolution, utilisez :
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

Ces outils vous permettent de :
- Uploader votre logo
- Générer toutes les icônes nécessaires
- Télécharger un package complet avec le code HTML

## Dépannage

### Le script échoue avec une erreur Sharp
```bash
npm rebuild sharp
```

### Les icônes ne s'affichent pas
1. Videz le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
2. Vérifiez que les chemins dans `layout.tsx` sont corrects
3. Vérifiez que les fichiers existent dans `/public/icons/`

### Les icônes sont floues
- Utilisez un logo source de plus haute résolution
- Assurez-vous que le logo est net et non compressé
