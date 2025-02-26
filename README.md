# QuizzCours

Une application web pour créer et passer des quiz sur différentes matières et chapitres.

## Structure du projet

Le projet est divisé en deux parties principales :
- **Frontend** : Application Nuxt.js avec UI Nuxt
- **Backend** : API REST avec Hapi.js et Sequelize (MySQL)

## Prérequis

- Node.js (v16+)
- MySQL

## Installation

### Configuration de la base de données

1. Créez une base de données MySQL nommée `quizz`
2. Configurez les variables d'environnement dans le fichier `backend/.env`

### Installation des dépendances

```bash
# Installation des dépendances globales
npm install

# Installation des dépendances du backend
cd backend
npm install

# Installation des dépendances du frontend
cd ../frontend
npm install
```

## Démarrage

### Backend

```bash
cd backend
npm run dev
```

Le serveur backend démarrera sur http://localhost:3001

### Frontend

```bash
cd frontend
npm run dev
```

L'application frontend démarrera sur http://localhost:3000

## Fonctionnalités

- Gestion des matières
- Gestion des chapitres
- Création et modification de questions
- Passage de quiz
- Suivi des scores

## Technologies utilisées

- **Frontend** : Nuxt.js, Nuxt UI
- **Backend** : Hapi.js, Sequelize, MySQL
- **Outils** : TypeScript, ESLint 