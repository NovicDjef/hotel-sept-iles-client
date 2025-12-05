# ✅ Solution au Problème de Maintenance

## 🎯 Problème Identifié

Votre site affichait "Site en maintenance" car **le code déployé utilisait `localhost:5001` au lieu de `https://apihotel.novic.dev`**.

### Preuve dans les logs :
```
🔵 API Request:
Object { baseURL: "http://localhost:5001", url: "/api/v1/room-types/..."
```

### Erreur résultante :
```
Blocage d'une requête multiorigine (Cross-Origin Request) :
la politique « Same Origin » ne permet pas de consulter la ressource
distante située sur http://localhost:5001/...
```

**Explication :** Le navigateur de vos visiteurs ne peut pas accéder à `localhost:5001` car ce serveur n'existe que sur votre machine locale, pas sur Internet.

---

## 🛠️ Solution Appliquée

### 1. ✅ Vérification du code source
Le fichier `services/api/Api.ts` ligne 3 est correct :
```typescript
const BASE_URL = 'https://apihotel.novic.dev'
// const BASE_URL = `http://localhost:5001`  // ✅ Cette ligne est bien commentée
```

### 2. ✅ Rebuild de l'application
Nous avons reconstruit l'application avec la bonne configuration pour générer un nouveau build de production.

### 3. 🔄 Création du package de déploiement
Le script `create-vps-package.sh` est en cours d'exécution pour créer le package `vps-deploy.tar.gz` avec le nouveau build.

---

## 📦 Prochaines Étapes - Déploiement sur VPS

### Étape 1 : Attendre la fin de la création du package

Le script va créer un fichier `vps-deploy.tar.gz` dans votre projet.

### Étape 2 : Transférer le package sur votre VPS

```bash
# Option 1 : Via SCP
scp vps-deploy.tar.gz votre-utilisateur@votre-vps-ip:/tmp/

# Option 2 : Via votre interface de gestion VPS (cPanel, Plesk, etc.)
# Uploadez le fichier vps-deploy.tar.gz
```

### Étape 3 : Sur le VPS, arrêter l'ancienne application

```bash
# Se connecter en SSH
ssh votre-utilisateur@votre-vps-ip

# Arrêter l'application (avec PM2)
pm2 stop hotel-sept-iles
pm2 delete hotel-sept-iles

# OU arrêter le processus Node.js
pkill -f "node server.js"
```

### Étape 4 : Sauvegarder l'ancien déploiement (optionnel mais recommandé)

```bash
cd /var/www  # ou votre chemin d'installation
mv hotel-sept-iles hotel-sept-iles-backup-$(date +%Y%m%d)
```

### Étape 5 : Déployer la nouvelle version

```bash
# Créer le répertoire de destination
mkdir -p /var/www/hotel-sept-iles

# Extraire le package
cd /tmp
tar -xzf vps-deploy.tar.gz

# Déplacer les fichiers
mv vps-deploy/* /var/www/hotel-sept-iles/
cd /var/www/hotel-sept-iles
```

### Étape 6 : Installer les dépendances (si nécessaire)

```bash
# Si node_modules n'est pas dans le package ou est incomplet
npm install --production

# Vérifier que .env.production existe
cat .env.production
# Devrait afficher :
# NODE_ENV=production
# PORT=3000
# NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
```

### Étape 7 : Redémarrer l'application

```bash
# Avec PM2 (recommandé)
pm2 start server.js --name hotel-sept-iles
pm2 save

# OU en mode direct (pour tester)
npm start
```

### Étape 8 : Vérifier que tout fonctionne

```bash
# Vérifier les logs
pm2 logs hotel-sept-iles --lines 50

# Tester localement sur le VPS
curl http://localhost:3000

# Vérifier que l'API est accessible
curl -v https://apihotel.novic.dev/api/v1/room-types
```

---

## 🔍 Vérification Post-Déploiement

### Dans les logs, vous devriez maintenant voir :

✅ **Avant (incorrect) :**
```
baseURL: "http://localhost:5001"
```

✅ **Après (correct) :**
```
baseURL: "https://apihotel.novic.dev"
```

### Test dans le navigateur :

1. Ouvrez votre site `https://hotel.novic.dev`
2. Ouvrez la console du navigateur (F12 → Console)
3. Rechargez la page (Ctrl+R ou Cmd+R)
4. Vérifiez les logs - vous ne devriez plus voir d'erreurs CORS
5. Les chambres devraient s'afficher correctement

---

## 🚨 Si le problème persiste

### Cas 1 : Le site affiche toujours "Site en maintenance"

**Cause possible :** Cache du navigateur ou CDN

**Solution :**
```bash
# Vider le cache Next.js sur le VPS
rm -rf /var/www/hotel-sept-iles/.next/cache

# Redémarrer l'application
pm2 restart hotel-sept-iles

# Dans le navigateur : Forcer le rechargement (Ctrl+Shift+R)
```

### Cas 2 : Erreurs CORS persistent

**Cause possible :** L'ancien build est encore en cache

**Solution :**
```bash
# Sur le VPS, vérifier le contenu du build
cd /var/www/hotel-sept-iles/.next
grep -r "localhost:5001" .

# Si vous trouvez des références à localhost:5001,
# cela signifie que l'ancien build est encore présent
# Supprimez complètement .next et redéployez
```

### Cas 3 : L'API ne répond pas depuis le VPS

**Test :**
```bash
# Sur le VPS
curl -v https://apihotel.novic.dev/api/v1/room-types
```

**Si ça ne fonctionne pas :**
- Vérifiez le firewall : `sudo ufw status`
- Vérifiez le DNS : `nslookup apihotel.novic.dev`
- Consultez le fichier `DIAGNOSTIC-VPS.md` pour plus de solutions

---

## 📊 Comparaison Avant/Après

### Avant (❌ Problème)
```
Site déployé → Essaie d'accéder à localhost:5001 → Erreur CORS → Network Error → Affiche "Site en maintenance"
```

### Après (✅ Solution)
```
Site déployé → Accède à https://apihotel.novic.dev → Données récupérées → Affiche les chambres
```

---

## 💡 Pourquoi ce problème est survenu ?

**Hypothèses possibles :**

1. **Build local avec mauvaise config :** Le build a été fait avec la ligne `localhost:5001` non commentée
2. **Ancien build déployé :** Un ancien build avec localhost a été redéployé par erreur
3. **Variable d'environnement :** Le `.env.production` n'était pas utilisé correctement

**Solution à long terme :**
- Toujours utiliser des variables d'environnement au lieu de valeurs codées en dur
- Vérifier le build avant de déployer
- Avoir un processus de déploiement automatisé (CI/CD)

---

## 📚 Ressources Utiles

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## ✅ Checklist Finale

- [ ] Package `vps-deploy.tar.gz` créé avec le nouveau build
- [ ] Package transféré sur le VPS
- [ ] Ancienne application arrêtée
- [ ] Nouvelle version déployée
- [ ] Dépendances installées
- [ ] `.env.production` vérifié
- [ ] Application redémarrée avec PM2
- [ ] Logs vérifiés (pas d'erreurs CORS)
- [ ] Site web accessible et fonctionnel
- [ ] Chambres s'affichent correctement
- [ ] Pas de message "Site en maintenance"

---

🎉 **Une fois toutes ces étapes complétées, votre site devrait fonctionner parfaitement !**
