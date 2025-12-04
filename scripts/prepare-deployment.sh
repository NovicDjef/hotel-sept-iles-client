#!/bin/bash

# Script de préparation pour le déploiement
# Ce script prépare tous les fichiers nécessaires pour le déploiement

echo "🚀 Préparation du déploiement..."

# Créer le dossier de déploiement
DEPLOY_DIR="deployment-package"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "📦 Copie des fichiers..."

# Copier le dossier standalone
cp -r .next/standalone/* $DEPLOY_DIR/

# Copier les fichiers statiques
mkdir -p $DEPLOY_DIR/.next/static
cp -r .next/static $DEPLOY_DIR/.next/

# Copier le dossier public
cp -r public $DEPLOY_DIR/

# Créer le fichier package.json pour le déploiement
cat > $DEPLOY_DIR/package.json << 'EOF'
{
  "name": "hotel-sept-iles-production",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Créer le fichier de variables d'environnement
cat > $DEPLOY_DIR/.env.production << 'EOF'
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
EOF

# Créer un fichier README pour le déploiement
cat > $DEPLOY_DIR/README-DEPLOY.md << 'EOF'
# Déploiement Hôtel Sept-Îles

## Prérequis
- Node.js version 18 ou supérieure
- npm ou yarn

## Installation sur le serveur

1. Uploader tous les fichiers de ce dossier sur votre serveur
2. Se connecter au serveur via SSH
3. Naviguer vers le dossier du site
4. Installer les dépendances (si nécessaire) :
   ```bash
   npm install
   ```

5. Démarrer l'application :
   ```bash
   npm start
   ```

## Configuration du serveur web

### Avec Nginx (recommandé)
Ajoutez cette configuration à votre nginx.conf :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

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

### Avec Apache + mod_proxy
Ajoutez dans votre .htaccess ou VirtualHost :

```apache
<VirtualHost *:80>
    ServerName votre-domaine.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

## Démarrage automatique avec PM2 (recommandé)

1. Installer PM2 :
   ```bash
   npm install -g pm2
   ```

2. Démarrer l'application :
   ```bash
   pm2 start npm --name "hotel-sept-iles" -- start
   ```

3. Sauvegarder la configuration :
   ```bash
   pm2 save
   pm2 startup
   ```

## Variables d'environnement

Modifiez le fichier `.env.production` selon votre configuration :
- `PORT` : Port sur lequel l'application écoute (par défaut 3000)
- `NEXT_PUBLIC_API_URL` : URL de votre API backend

## Monitoring

Vérifier les logs avec PM2 :
```bash
pm2 logs hotel-sept-iles
```

Redémarrer l'application :
```bash
pm2 restart hotel-sept-iles
```

## Support

Pour toute question, consultez la documentation Next.js : https://nextjs.org/docs
EOF

# Créer un script de démarrage simple
cat > $DEPLOY_DIR/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Démarrage de l'application Hôtel Sept-Îles..."
NODE_ENV=production PORT=3000 node server.js
EOF

chmod +x $DEPLOY_DIR/start.sh

# Créer un fichier .htaccess pour Apache (si nécessaire)
cat > $DEPLOY_DIR/.htaccess << 'EOF'
# Redirection vers le serveur Node.js
RewriteEngine On
RewriteBase /

# Ne pas rediriger les fichiers statiques
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Proxy vers Node.js
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de sécurité
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
EOF

echo "✅ Package de déploiement créé dans le dossier: $DEPLOY_DIR"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Compresser le dossier: zip -r deployment.zip $DEPLOY_DIR"
echo "2. Uploader deployment.zip sur votre serveur"
echo "3. Décompresser sur le serveur: unzip deployment.zip"
echo "4. Suivre les instructions dans README-DEPLOY.md"
echo ""
echo "🎉 Prêt pour le déploiement!"
