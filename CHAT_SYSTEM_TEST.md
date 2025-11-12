# Guide de Test du Système de Chat

## ✅ Vérification de l'Installation

### Fichiers Créés
- ✅ `types/chat.ts` - Types TypeScript
- ✅ `services/api/chatApi.ts` - Service API
- ✅ `hooks/useChat.ts` - Hook personnalisé
- ✅ `components/chat/ChatWidget.tsx` - Widget principal
- ✅ `components/chat/ChatForm.tsx` - Formulaire
- ✅ `components/chat/ChatWindow.tsx` - Fenêtre de chat
- ✅ `components/chat/ChatMessage.tsx` - Message individuel
- ✅ `components/chat/index.ts` - Exports

### Fichiers Modifiés
- ✅ `app/layout.tsx` - ChatWidget intégré
- ✅ `services/api/Api.ts` - Routes du chat ajoutées

## 🚀 Démarrage

Le serveur est déjà lancé sur **http://localhost:3001**

## 🧪 Tests à Effectuer

### 1. Test d'Affichage du Widget

**Étapes :**
1. Ouvrir http://localhost:3001 dans votre navigateur
2. Vérifier qu'un bouton de chat apparaît en bas à droite (icône de message bleu)

**Résultat attendu :**
- ✅ Bouton flottant visible
- ✅ Icône de message (MessageCircle)
- ✅ Couleur bleue (bg-blue-600)

---

### 2. Test d'Ouverture du Widget

**Étapes :**
1. Cliquer sur le bouton de chat
2. Vérifier que la fenêtre s'ouvre avec animation

**Résultat attendu :**
- ✅ Fenêtre de 400x600px s'ouvre
- ✅ Animation fluide (scale et opacity)
- ✅ Formulaire de démarrage visible

---

### 3. Test du Formulaire de Démarrage

**Étapes :**
1. Remplir le formulaire :
   - **Nom complet :** Jean Dupont
   - **Email :** jean.dupont@example.com
   - **Téléphone :** +1 (514) 555-1234
   - **Message initial :** Bonjour, j'aimerais réserver une chambre

2. Cliquer sur "Démarrer la conversation"

**Résultat attendu :**
- ✅ Validation des champs (nom et message requis)
- ✅ Au moins un email OU téléphone requis
- ✅ Validation email si fourni
- ✅ Affichage "Envoi en cours..." pendant la requête

---

### 4. Test de la Conversation

**Après démarrage de conversation :**

**Résultat attendu :**
- ✅ Le formulaire disparaît
- ✅ La fenêtre de chat apparaît avec header bleu
- ✅ Le message initial est affiché
- ✅ Indicateur "En ligne" visible
- ✅ Nom du guest affiché dans le header

---

### 5. Test d'Envoi de Message

**Étapes :**
1. Taper un message dans l'input
2. Cliquer sur le bouton d'envoi (ou appuyer sur Entrée)

**Résultat attendu :**
- ✅ Message apparaît immédiatement dans la conversation
- ✅ Message aligné à droite (client) avec fond bleu
- ✅ Input se vide automatiquement
- ✅ Auto-scroll vers le nouveau message
- ✅ Horodatage affiché (format HH:mm)

---

### 6. Test du Polling (Réception de Messages)

**Étapes :**
1. Laisser la fenêtre ouverte
2. Attendre que le staff réponde via le backend

**Résultat attendu :**
- ✅ Nouveaux messages apparaissent automatiquement (toutes les 3 secondes)
- ✅ Messages du staff alignés à gauche avec fond gris
- ✅ Auto-scroll vers les nouveaux messages
- ✅ Indicateur "En ligne" actif

---

### 7. Test de Persistance

**Étapes :**
1. Démarrer une conversation
2. Envoyer quelques messages
3. Fermer la fenêtre de chat
4. Rafraîchir la page (F5)
5. Rouvrir le chat

**Résultat attendu :**
- ✅ La conversation est restaurée
- ✅ Tous les messages précédents sont visibles
- ✅ Nom du guest est mémorisé
- ✅ Le polling reprend automatiquement

---

### 8. Test de Nouvelle Conversation

**Étapes :**
1. Dans une conversation active
2. Cliquer sur "Nouvelle conversation" (en bas)

**Résultat attendu :**
- ✅ Le formulaire réapparaît
- ✅ La conversation précédente est fermée
- ✅ localStorage est nettoyé
- ✅ Possibilité de démarrer une nouvelle conversation

---

### 9. Test de Fermeture

**Étapes :**
1. Cliquer sur le bouton "Fermer" (en bas)
2. Vérifier que la fenêtre se ferme

**Résultat attendu :**
- ✅ Fenêtre se ferme avec animation
- ✅ Bouton flottant réapparaît
- ✅ Polling s'arrête automatiquement

---

### 10. Test de Minimisation

**Étapes :**
1. Cliquer sur l'icône de minimisation (en haut à droite)

**Résultat attendu :**
- ✅ Fenêtre se minimise avec animation
- ✅ Bouton flottant réapparaît

---

## 🔧 Vérification du Backend

### Routes API Utilisées

**PUBLIQUES (Client sans compte) :**
```
POST   /api/v1/chat/start                    - Démarrer conversation
POST   /api/v1/chat/:id/messages             - Envoyer message
GET    /api/v1/chat/:id/messages             - Récupérer messages
GET    /api/v1/chat/conversations/:id        - Récupérer conversation
```

### Test Backend (avec curl)

```bash
# 1. Démarrer une conversation
curl -X POST http://localhost:5001/api/v1/chat/start \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "cmh3iygew00009crzsls6rlzy",
    "guestName": "Jean Test",
    "guestEmail": "jean@test.com",
    "initialMessage": "Test du système"
  }'

# 2. Noter l'ID de conversation retourné, puis récupérer les messages
curl http://localhost:5001/api/v1/chat/CONVERSATION_ID/messages

# 3. Envoyer un nouveau message
curl -X POST http://localhost:5001/api/v1/chat/CONVERSATION_ID/messages \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Message de test",
    "senderType": "GUEST",
    "senderName": "Jean Test"
  }'
```

---

## 🐛 Dépannage

### Le bouton de chat n'apparaît pas
- Vérifier que le serveur Next.js est lancé
- Ouvrir la console du navigateur (F12) pour voir les erreurs
- Vérifier que `app/layout.tsx` contient bien `<ChatWidget />`

### Erreur lors de l'envoi du message
- Vérifier que le backend est accessible sur http://localhost:5001
- Vérifier les logs du backend pour voir les erreurs
- Vérifier que le hotelId est correct

### Les nouveaux messages ne s'affichent pas
- Vérifier que le polling est actif (indicateur "En ligne")
- Vérifier les appels API dans l'onglet Network du navigateur
- Vérifier que le backend répond correctement

### La conversation n'est pas restaurée
- Vérifier le localStorage du navigateur (F12 > Application > Local Storage)
- Chercher les clés : `chatConversationId` et `chatGuestName`
- Si absentes, la conversation n'a pas été sauvegardée

---

## 📊 Indicateurs de Succès

✅ **Le système fonctionne correctement si :**
1. Le bouton de chat est visible sur toutes les pages
2. Le formulaire de démarrage fonctionne avec validation
3. Les messages s'affichent correctement (client/staff différenciés)
4. Le polling récupère les nouveaux messages automatiquement
5. La conversation est persistée et restaurée après rechargement
6. Aucune erreur dans la console du navigateur
7. Les appels API aboutissent (vérifier Network tab)

---

## 🎯 Fonctionnalités Principales

- ✅ Widget flottant responsive
- ✅ Formulaire de démarrage avec validation
- ✅ Messagerie en temps réel (polling 3s)
- ✅ Différenciation visuelle client/staff
- ✅ Persistance dans localStorage
- ✅ Auto-scroll vers nouveaux messages
- ✅ Horodatage des messages
- ✅ Indicateur de statut en ligne
- ✅ Animations fluides
- ✅ Gestion des erreurs

---

## 📝 Notes

- **Port du frontend :** 3001
- **Port du backend :** 5001
- **HotelId :** cmh3iygew00009crzsls6rlzy
- **Polling interval :** 3 secondes
- **Taille du widget :** 400x600px

---

**Date de création :** 2025-11-02
**Statut :** ✅ Système opérationnel
**Build :** ✅ Compilé avec succès
