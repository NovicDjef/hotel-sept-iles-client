#!/bin/bash

echo "🚀 Création du package VPS optimisé..."

# Supprimer l'ancien package
rm -rf vps-deploy
rm -f vps-deploy.tar.gz

# Créer la structure
mkdir -p vps-deploy

echo "📦 Copie des fichiers essentiels..."

# Copier .next SANS le cache
echo "  → Copie de .next (sans cache)..."
mkdir -p vps-deploy/.next
cp -r .next/static vps-deploy/.next/ 2>/dev/null || echo "  ⚠️  .next/static non trouvé"
cp -r .next/server vps-deploy/.next/ 2>/dev/null || echo "  ⚠️  .next/server non trouvé"
cp .next/*.json vps-deploy/.next/ 2>/dev/null || echo "  ⚠️  Pas de fichiers JSON"
cp .next/BUILD_ID vps-deploy/.next/ 2>/dev/null || echo "  ⚠️  BUILD_ID non trouvé"

# Copier public
echo "  → Copie de public/..."
cp -r public vps-deploy/

# Copier les fichiers de configuration essentiels
echo "  → Copie des fichiers de config..."
cp package.json vps-deploy/
cp package-lock.json vps-deploy/ 2>/dev/null || cp yarn.lock vps-deploy/ 2>/dev/null || echo "  ⚠️  Pas de lockfile"
cp next.config.ts vps-deploy/ 2>/dev/null || cp next.config.js vps-deploy/ 2>/dev/null || echo "  ⚠️  next.config non trouvé"
cp tsconfig.json vps-deploy/ 2>/dev/null || echo "  ⚠️  tsconfig.json non trouvé"

# Créer un serveur custom simple
echo "  → Création de server.js..."
cat > vps-deploy/server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`✅ Serveur démarré sur http://${hostname}:${port}`)
    })
})
EOF

# Créer .env.production
echo "  → Création de .env.production..."
cat > vps-deploy/.env.production << 'EOF'
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
EOF

# Créer script de démarrage
echo "  → Création de start.sh..."
cat > vps-deploy/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Démarrage de l'application..."

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install --production
fi

# Démarrer l'application
NODE_ENV=production PORT=3000 node server.js
EOF

chmod +x vps-deploy/start.sh

# Créer README
echo "  → Création de README-VPS.md..."
cat > vps-deploy/README-VPS.md << 'EOF'
# Déploiement sur VPS - Instructions

## 🚀 Installation Rapide

### 1. Sur le VPS, arrêter l'ancienne application
```bash
pm2 stop hotel-sept-iles
pm2 delete hotel-sept-iles
```

### 2. Sauvegarder l'ancien déploiement (optionnel)
```bash
cd /var/www  # ou votre chemin
mv hotel-sept-iles hotel-sept-iles-backup-$(date +%Y%m%d)
```

### 3. Extraire et installer la nouvelle version
```bash
cd /var/www
mkdir -p hotel-sept-iles
cd hotel-sept-iles
tar -xzf /tmp/vps-deploy.tar.gz --strip-components=1

# Installer les dépendances
npm install --production
```

### 4. Vérifier la configuration
```bash
cat .env.production
# Devrait afficher :
# NODE_ENV=production
# PORT=3000
# NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
```

### 5. Démarrer l'application
```bash
pm2 start server.js --name hotel-sept-iles
pm2 save
```

### 6. Vérifier les logs
```bash
pm2 logs hotel-sept-iles --lines 50
```

## ✅ Vérification

Dans les logs, vous devriez voir :
```
baseURL: "https://apihotel.novic.dev"
```

Et NON :
```
baseURL: "http://localhost:5001"  ❌
```

## 🔄 Redémarrage

Si besoin de redémarrer :
```bash
pm2 restart hotel-sept-iles
```

## 🔍 Debugging

Voir les logs en temps réel :
```bash
pm2 logs hotel-sept-iles
```

Tester l'accès à l'API :
```bash
curl https://apihotel.novic.dev/api/v1/room-types
```
EOF

# Créer l'archive
echo "📦 Création de l'archive..."
tar -czf vps-deploy.tar.gz vps-deploy/

FILESIZE=$(du -h vps-deploy.tar.gz | cut -f1)
echo ""
echo "✅ Package créé avec succès !"
echo "📦 Fichier: vps-deploy.tar.gz ($FILESIZE)"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Transférez vps-deploy.tar.gz sur votre VPS"
echo "   scp vps-deploy.tar.gz user@vps:/tmp/"
echo ""
echo "2. Sur le VPS, extrayez et installez:"
echo "   cd /var/www/hotel-sept-iles"
echo "   tar -xzf /tmp/vps-deploy.tar.gz --strip-components=1"
echo "   npm install --production"
echo "   pm2 restart hotel-sept-iles"
echo ""
echo "3. Consultez SOLUTION-PROBLEME-VPS.md pour les détails complets"
