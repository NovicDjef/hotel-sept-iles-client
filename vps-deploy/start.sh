#!/bin/bash
echo "🚀 Démarrage de l'application..."

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install --production
fi

# Démarrer l'application
NODE_ENV=production PORT=3000 node server.js
