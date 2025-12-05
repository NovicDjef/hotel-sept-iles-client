#!/bin/bash

echo "🔍 Test de connexion à l'API depuis le VPS..."
echo ""

# Test 1: Ping du domaine
echo "1️⃣ Test DNS (résolution du domaine):"
ping -c 3 apihotel.novic.dev
echo ""

# Test 2: Curl vers l'API
echo "2️⃣ Test HTTP (accès à l'API):"
curl -v -X GET "https://apihotel.novic.dev/api/v1/room-types" \
  -H "Content-Type: application/json" \
  --max-time 15
echo ""

# Test 3: Vérifier les logs de l'application
echo "3️⃣ Logs de l'application (dernières 50 lignes):"
pm2 logs hotel-sept-iles --lines 50 --nostream
echo ""

# Test 4: Vérifier le statut PM2
echo "4️⃣ Statut PM2:"
pm2 status
echo ""

echo "✅ Tests terminés"
