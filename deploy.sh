#!/bin/bash

echo "🚀 Déploiement du frontend Hotel..."

# Pull du code
echo "📥 Pull du code..."
git pull origin main

# Installation
echo "📦 Installation des dépendances..."
npm install

# Build
echo "🔨 Build du projet..."
npm run build

# Redémarrage
echo "♻️ Redémarrage de l'application..."
pm2 restart hotel-frontend

echo "✅ Déploiement terminé!"
pm2 status