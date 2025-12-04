#!/bin/bash

echo "🚀 Création du package VPS..."

# Supprimer l'ancien package
rm -rf vps-deploy
rm -f vps-deploy.tar.gz

# Créer la structure
mkdir -p vps-deploy

echo "📦 Copie des fichiers..."

# Copier les fichiers essentiels
cp -r .next vps-deploy/
cp -r public vps-deploy/
cp -r node_modules vps-deploy/ 2>/dev/null || echo "⚠️  node_modules non copié (sera installé sur le serveur)"
cp package.json vps-deploy/
cp package-lock.json vps-deploy/
cp next.config.ts vps-deploy/

# Créer un serveur custom simple
cat > vps-deploy/server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

// when using middleware `hostname` and `port` must be provided below
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

# Créer package.json pour production
cat > vps-deploy/package-production.json << 'EOF'
{
  "name": "hotel-sept-iles-vps",
  "version": "1.0.0",
  "scripts": {
    "start": "NODE_ENV=production node server.js"
  },
  "dependencies": {
    "next": "15.5.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
EOF

# Créer .env.production
cat > vps-deploy/.env.production << 'EOF'
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
EOF

# Créer script de démarrage
cat > vps-deploy/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Démarrage de l'application..."
NODE_ENV=production PORT=3000 node server.js
EOF

chmod +x vps-deploy/start.sh

# Créer README
cat > vps-deploy/README-VPS.md << 'EOF'
# Déploiement sur VPS

## Installation

1. **Uploader le dossier sur votre VPS** :
   ```bash
   scp -r vps-deploy/* user@votre-vps:/var/www/hotel-sept-iles/
   ```

2. **Sur le VPS, installer les dépendances** :
   ```bash
   cd /var/www/hotel-sept-iles
   npm install --production
   ```

3. **Démarrer avec PM2** :
   ```bash
   npm install -g pm2
   pm2 start server.js --name hotel-sept-iles
   pm2 save
   pm2 startup
   ```

## Configuration Nginx

Créer `/etc/nginx/sites-available/hotel-sept-iles` :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activer :
```bash
sudo ln -s /etc/nginx/sites-available/hotel-sept-iles /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL avec Certbot

```bash
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

## Commandes utiles

```bash
pm2 status                    # État
pm2 logs hotel-sept-iles      # Logs
pm2 restart hotel-sept-iles   # Redémarrer
pm2 stop hotel-sept-iles      # Arrêter
```
EOF

# Créer l'archive
echo "📦 Création de l'archive..."
tar -czf vps-deploy.tar.gz vps-deploy/

echo "✅ Package créé: vps-deploy.tar.gz ($(du -h vps-deploy.tar.gz | cut -f1))"
echo ""
echo "📝 Pour déployer:"
echo "1. Transférez vps-deploy.tar.gz sur votre VPS"
echo "2. Décompressez: tar -xzf vps-deploy.tar.gz"
echo "3. Suivez les instructions dans vps-deploy/README-VPS.md"
