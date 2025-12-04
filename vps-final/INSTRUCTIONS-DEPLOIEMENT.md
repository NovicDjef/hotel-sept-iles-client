# 🚀 Instructions de Déploiement VPS

## 📦 Ce que vous avez

Cette archive contient tout le nécessaire pour déployer votre site sur votre VPS.

## 🔧 Installation sur votre VPS

### 1. Transférer les fichiers

```bash
# Sur votre machine locale
scp vps-deploy.tar.gz user@votre-vps-ip:/var/www/

# Sur votre VPS
cd /var/www/
tar -xzf vps-deploy.tar.gz
cd hotel-sept-iles/
```

### 2. Installer Node.js (si pas déjà fait)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Devrait afficher v18.x ou plus
```

### 3. Installer les dépendances

```bash
npm install --production
```

### 4. Installer PM2 (gestionnaire de processus)

```bash
sudo npm install -g pm2
```

### 5. Démarrer l'application

```bash
pm2 start server.js --name hotel-sept-iles
pm2 save
pm2 startup  # Suivez les instructions affichées
```

## 🌐 Configuration Nginx

### 1. Installer Nginx (si pas déjà fait)

```bash
sudo apt update
sudo apt install nginx
```

### 2. Créer la configuration

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

    # Fichiers statiques
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

### 3. Activer le site

```bash
sudo ln -s /etc/nginx/sites-available/hotel-sept-iles /etc/nginx/sites-enabled/
sudo nginx -t  # Vérifier la configuration
sudo systemctl reload nginx
```

## 🔒 SSL/HTTPS avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

Certbot configurera automatiquement HTTPS!

## 📊 Commandes Utiles

```bash
# Voir l'état
pm2 status

# Voir les logs en temps réel
pm2 logs hotel-sept-iles

# Redémarrer
pm2 restart hotel-sept-iles

# Arrêter
pm2 stop hotel-sept-iles

# Monitoring
pm2 monit
```

## 🔄 Mise à jour du site

1. Construisez localement : `npm run build`
2. Créez le package VPS
3. Transférez sur le serveur
4. Extrayez et remplacez les fichiers
5. Redémarrez : `pm2 restart hotel-sept-iles`

## ⚠️ Dépannage

### Le site ne répond pas

```bash
# Vérifier que Node.js tourne
pm2 status

# Vérifier les logs
pm2 logs hotel-sept-iles

# Redémarrer
pm2 restart hotel-sept-iles
```

### Erreur 502 Bad Gateway

```bash
# Vérifier que l'app écoute sur le bon port
pm2 logs hotel-sept-iles

# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx
```

### Port déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus
pm2 delete hotel-sept-iles
pm2 start server.js --name hotel-sept-iles
```

## 🎉 C'est tout!

Votre site sera accessible sur : `http://votre-domaine.com` (ou `https://` après Certbot)

Pour toute question, consultez :
- Documentation PM2 : https://pm2.keymetrics.io/
- Documentation Nginx : https://nginx.org/en/docs/
