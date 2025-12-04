# 🚀 Guide de Déploiement - Hôtel Sept-Îles

## 📦 Fichiers Générés

Deux packages sont disponibles :
- `deployment.tar.gz` (71 MB) - Package complet pour serveur Node.js
- `deployment-package/` - Dossier contenant tous les fichiers

## 🎯 Options de Déploiement

### Option 1 : Vercel (Recommandé ✨ - Le plus simple)

**Avantages :**
- ✅ Déploiement en 1 clic
- ✅ HTTPS gratuit
- ✅ CDN mondial
- ✅ Gratuit pour les projets personnels
- ✅ Pas de configuration serveur

**Étapes :**
1. Créez un compte sur [Vercel](https://vercel.com)
2. Installez Vercel CLI :
   ```bash
   npm install -g vercel
   ```
3. Dans votre projet, exécutez :
   ```bash
   vercel
   ```
4. Suivez les instructions à l'écran
5. Votre site sera déployé sur : `votre-projet.vercel.app`

**Configuration des variables d'environnement sur Vercel :**
1. Allez dans Project Settings > Environment Variables
2. Ajoutez :
   - `NEXT_PUBLIC_API_URL` = `https://apihotel.novic.dev`
   - `NODE_ENV` = `production`

---

### Option 2 : Serveur Node.js (cPanel, VPS, etc.)

**Prérequis :**
- Node.js 18+ installé
- Accès SSH au serveur
- PM2 pour gérer l'application

#### A. Upload des fichiers

1. **Téléchargez le package :**
   ```bash
   scp deployment.tar.gz user@votre-serveur.com:/home/user/
   ```

2. **Sur le serveur, décompressez :**
   ```bash
   cd /home/user/
   tar -xzf deployment.tar.gz
   cd deployment-package
   ```

#### B. Configuration

1. **Modifiez `.env.production` :**
   ```env
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
   ```

2. **Installez les dépendances (si nécessaire) :**
   ```bash
   npm install --production
   ```

#### C. Démarrage avec PM2

1. **Installez PM2 :**
   ```bash
   npm install -g pm2
   ```

2. **Démarrez l'application :**
   ```bash
   pm2 start npm --name "hotel-sept-iles" -- start
   ```

3. **Configurez le démarrage automatique :**
   ```bash
   pm2 save
   pm2 startup
   ```

4. **Vérifiez les logs :**
   ```bash
   pm2 logs hotel-sept-iles
   ```

#### D. Configuration du serveur web

##### Avec Nginx (Recommandé)

Créez `/etc/nginx/sites-available/hotel-sept-iles` :

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

    # Fichiers statiques (optionnel)
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Activez le site :
```bash
sudo ln -s /etc/nginx/sites-available/hotel-sept-iles /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

##### Avec Apache (cPanel)

Créez `.htaccess` à la racine de `public_html` :

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</IfModule>
```

**Note :** Vous devez activer les modules Apache `mod_proxy` et `mod_proxy_http`

#### E. SSL/HTTPS avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

---

### Option 3 : Docker (Pour les pros 🐳)

Créez un `Dockerfile` :

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY deployment-package/package.json ./
RUN npm install --production

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY deployment-package/ .

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

Construire et lancer :
```bash
docker build -t hotel-sept-iles .
docker run -p 3000:3000 hotel-sept-iles
```

---

## 🔧 Configuration Post-Déploiement

### 1. Vérifier que le backend CORS est configuré

Le backend doit autoriser votre domaine. Dans `/hotel-management-backend/src/app.ts` :

```typescript
origin: [
  'https://votre-domaine.com',
  'https://www.votre-domaine.com',
  'https://apihotel.novic.dev'
]
```

### 2. Mettre à jour l'URL de l'API

Dans le frontend, assurez-vous que `services/api/Api.ts` pointe vers :
```typescript
const BASE_URL = 'https://apihotel.novic.dev'
```

### 3. Tester le site

Visitez : `https://votre-domaine.com`

Vérifiez :
- ✅ Page d'accueil charge
- ✅ Navigation fonctionne
- ✅ Réservations fonctionnent
- ✅ Avis s'affichent
- ✅ Pas d'erreurs dans la console

---

## 📊 Monitoring et Maintenance

### Commandes utiles avec PM2

```bash
# Voir l'état
pm2 status

# Voir les logs
pm2 logs hotel-sept-iles

# Redémarrer
pm2 restart hotel-sept-iles

# Arrêter
pm2 stop hotel-sept-iles

# Supprimer
pm2 delete hotel-sept-iles

# Monitoring en temps réel
pm2 monit
```

### Mise à jour du site

1. Reconstruisez le projet localement
2. Régénérez le package de déploiement
3. Uploadez sur le serveur
4. Redémarrez avec PM2 :
   ```bash
   pm2 restart hotel-sept-iles
   ```

---

## ⚠️ Dépannage

### Le site ne charge pas

1. Vérifiez que Node.js tourne :
   ```bash
   pm2 status
   ```

2. Vérifiez les logs :
   ```bash
   pm2 logs hotel-sept-iles
   ```

3. Vérifiez le port :
   ```bash
   netstat -tulpn | grep :3000
   ```

### Erreurs CORS

- Vérifiez que le backend autorise votre domaine
- Vérifiez l'URL de l'API dans `.env.production`

### Erreur 502 Bad Gateway

- Le serveur Node.js n'est pas démarré
- Mauvaise configuration du proxy Nginx/Apache

---

## 📞 Support

Pour toute question :
- Documentation Next.js : https://nextjs.org/docs
- Documentation PM2 : https://pm2.keymetrics.io/
- Documentation Nginx : https://nginx.org/en/docs/

---

## 🎉 Félicitations !

Votre site Hôtel Sept-Îles est maintenant en ligne! 🏨✨
