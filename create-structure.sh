#!/bin/bash

# Nom du dossier racine
PROJECT_ROOT="hotel-sept-iles"

# Création de l’arborescence
mkdir -p $PROJECT_ROOT/{app/(auth)/{login,register},app/(client)/{chambres/[id],reservation/[chambreId],reservation/confirmation,mon-compte,avis,},app/api/{chambres,services,reservations},components/{ui,chambres,reservation,services},lib,public/{icons,images},hooks}

# Fichiers principaux Next.js
touch $PROJECT_ROOT/app/(client)/page.tsx
touch $PROJECT_ROOT/app/layout.tsx
touch $PROJECT_ROOT/app/globals.css

# Fichiers typescript spécifiques
touch $PROJECT_ROOT/app/(client)/chambres/page.tsx
touch $PROJECT_ROOT/app/(client)/chambres/[id]/page.tsx
touch $PROJECT_ROOT/app/(client)/reservation/[chambreId]/page.tsx
touch $PROJECT_ROOT/app/(client)/reservation/confirmation/page.tsx

# Lib files
touch $PROJECT_ROOT/lib/{api.ts,utils.ts,prisma.ts}

# Public files
touch $PROJECT_ROOT/public/manifest.json

echo "✅ Structure du projet '$PROJECT_ROOT' créée avec succès !"
