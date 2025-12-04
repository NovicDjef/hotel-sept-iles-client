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
