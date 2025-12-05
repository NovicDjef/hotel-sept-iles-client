# 🔧 Diagnostic et Solutions - Site en Maintenance sur VPS

## Le Problème

Votre site affiche "Site en maintenance" car l'application ne peut pas se connecter à l'API `https://apihotel.novic.dev` depuis le VPS.

**Pourquoi ça fonctionne en local mais pas sur le VPS ?**
- En local : Votre ordinateur a accès à Internet et peut contacter l'API
- Sur le VPS : Le serveur VPS a peut-être des restrictions réseau

---

## 🔍 Étape 1 : Diagnostiquer le problème

### Connectez-vous à votre VPS en SSH

```bash
ssh votre-utilisateur@votre-vps-ip
```

### Test 1 : Vérifier si l'API est accessible depuis le VPS

```bash
# Test de résolution DNS
ping -c 3 apihotel.novic.dev

# Test HTTP
curl -v "https://apihotel.novic.dev/api/v1/room-types"
```

**Résultats possibles :**
- ✅ **Si ça fonctionne** : Passez à l'étape 2
- ❌ **Si "Could not resolve host"** : Problème DNS → Solution A
- ❌ **Si "Connection timeout"** : Firewall/réseau bloqué → Solution B
- ❌ **Si erreur SSL/TLS** : Problème de certificat → Solution C

### Test 2 : Vérifier les logs de l'application

```bash
# Logs PM2 (si vous utilisez PM2)
pm2 logs hotel-sept-iles --lines 100

# OU logs Node.js directs
journalctl -u hotel-sept-iles -n 100
```

Cherchez les erreurs contenant :
- `ECONNABORTED`
- `ERR_NETWORK`
- `Network Error`
- `ETIMEDOUT`

---

## 🛠️ Solutions

### Solution A : Problème DNS

Si le DNS ne fonctionne pas, ajoutez une entrée dans `/etc/hosts` :

```bash
# Trouver l'IP de l'API
nslookup apihotel.novic.dev

# Ajouter dans /etc/hosts
sudo nano /etc/hosts
# Ajoutez cette ligne (remplacez X.X.X.X par l'IP réelle)
X.X.X.X apihotel.novic.dev
```

Puis redémarrez l'application :
```bash
pm2 restart hotel-sept-iles
```

### Solution B : Firewall qui bloque les connexions sortantes

Vérifiez le firewall et autorisez les connexions sortantes :

```bash
# Vérifier le statut du firewall
sudo ufw status

# Autoriser les connexions sortantes HTTPS
sudo ufw allow out 443/tcp
sudo ufw allow out 80/tcp

# Redémarrer l'application
pm2 restart hotel-sept-iles
```

### Solution C : Augmenter le timeout de l'API

Si l'API répond lentement, augmentez le timeout dans votre code.

Modifiez `services/api/Api.ts` ligne 50 :

```typescript
// Avant
timeout: 15000,

// Après
timeout: 30000,  // 30 secondes au lieu de 15
```

Puis reconstruisez et redéployez :
```bash
npm run build
# Redéployez sur le VPS
```

### Solution D : Mode Client-Side Rendering uniquement

Si rien ne fonctionne, forcez le chargement côté client uniquement.

**Option 1 : Désactiver le SSR pour la page d'accueil**

Créez un wrapper client pour `FeaturedRooms` :

```typescript
// Dans components/home/FeaturedRooms.tsx
// Ajoutez dynamic import au lieu de l'export direct
import dynamic from 'next/dynamic'

// À la fin du fichier
export const FeaturedRoomsClient = dynamic(
  () => Promise.resolve(FeaturedRooms),
  { ssr: false }
)
```

**Option 2 : Gérer l'erreur différemment**

Modifiez `store/slices/roomsSlice.ts` lignes 86-88 pour ne pas retourner 'MAINTENANCE' :

```typescript
// Avant
if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
  return rejectWithValue('MAINTENANCE')
}

// Après - Retourner un message d'erreur plus informatif
if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
  console.error('❌ Erreur réseau API:', error)
  // Retourner un message qui n'affichera pas la page de maintenance
  return rejectWithValue('Impossible de charger les chambres. Veuillez réessayer.')
}
```

### Solution E : Vérifier les variables d'environnement sur le VPS

Assurez-vous que le fichier `.env.production` est présent sur le VPS :

```bash
# Sur le VPS
cd /var/www/hotel-sept-iles  # ou votre chemin
cat .env.production
```

Le fichier doit contenir :
```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://apihotel.novic.dev
```

Si le fichier n'existe pas, créez-le et redémarrez :
```bash
pm2 restart hotel-sept-iles
```

---

## 🎯 Solution Rapide Recommandée

### 1. Testez l'accès à l'API depuis le VPS

```bash
curl -v "https://apihotel.novic.dev/api/v1/room-types"
```

### 2. Si l'API est accessible mais l'application ne fonctionne pas

Le problème est probablement que Next.js essaie de charger les données côté serveur (SSR) au moment du build ou du rendu initial.

**Vérifiez les logs en temps réel :**
```bash
pm2 logs hotel-sept-iles --lines 0
```

Puis rechargez votre site et observez les erreurs.

### 3. Redémarrer proprement l'application

```bash
pm2 stop hotel-sept-iles
pm2 delete hotel-sept-iles
pm2 start server.js --name hotel-sept-iles
pm2 save
```

---

## 📋 Checklist de Vérification

- [ ] L'API `https://apihotel.novic.dev` est accessible depuis mon ordinateur
- [ ] L'API est accessible depuis le VPS (`curl` fonctionne)
- [ ] Le fichier `.env.production` existe sur le VPS
- [ ] Les logs PM2 montrent des erreurs réseau
- [ ] Le firewall autorise les connexions sortantes HTTPS
- [ ] L'application est bien redémarrée après les modifications
- [ ] Le DNS résout correctement `apihotel.novic.dev`

---

## 🆘 Si rien ne fonctionne

Contactez-moi avec les informations suivantes :

1. Résultat de `curl -v "https://apihotel.novic.dev/api/v1/room-types"` depuis le VPS
2. Les 100 dernières lignes des logs : `pm2 logs hotel-sept-iles --lines 100`
3. Configuration réseau : `ip addr show` et `cat /etc/resolv.conf`
4. Statut du firewall : `sudo ufw status verbose`

---

## 📚 Ressources Utiles

- [Documentation Next.js - Fetching Data](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Documentation PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Debugging Network Issues on Linux](https://www.linuxjournal.com/content/troubleshooting-network-problems)
