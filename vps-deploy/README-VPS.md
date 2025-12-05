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
