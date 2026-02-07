# DevNotes 📝

**DevNotes** est un blog technique multi-auteurs développé en **JavaScript vanilla** avec une **API Node.js / Express**.  
Le projet met l’accent sur la lisibilité, la structuration du code et une UX orientée lecture.

> Objectif : démontrer mes compétences en développement web front-end et back-end sans framework front.

---

## 🚀 Fonctionnalités

- 📄 **Page Accueil**
  - Liste des articles
  - Pagination
  - Recherche par titre et tags
  - Filtres par auteur et par catégorie

- 📝 **Page Article**
  - Chargement dynamique via slug
  - Markdown → HTML
  - Table des matières automatique (TOC)
  - Articles liés par tags
  - Partage réseaux (X / LinkedIn)
  - Commentaires factices

- 👤 **Page Auteurs**
  - Liste des auteurs
  - Bio et avatar
  - Filtrage des articles par auteur

- 🏷️ **Page Catégories**
  - Liste des tags
  - Nombre d’articles par catégorie
  - Filtrage par tag

- 🌗 **Thème clair / sombre**
  - Basé sur des variables CSS
  - Toggle global dans le header
  - Préférence persistée en localStorage
  - Respect du thème système par défaut

- 🧭 **Navigation globale**
  - Header partagé sur toutes les pages

---

## 🛠️ Stack technique

### Front-end
- HTML5
- CSS3 (variables CSS)
- JavaScript ES6+ (vanilla)
- Fetch API
- Modules ES

### Back-end
- Node.js
- Express
- Données JSON (posts, auteurs)

---

## 📁 Architecture du projet

devnotes/
├── server/
│ ├── data/
│ │ ├── posts.json
│ │ └── authors.json
│ ├── routes/
│ │ ├── posts.js
│ │ ├── authors.js
│ │ └── search.js
│ └── app.js
│
├── client/
│ ├── pages/
│ ├── js/
│ ├── css/
│ ├── assets/
│ └── partials/
│
└── README.md


---

## ⚙️ Installation et lancement

### 1. Cloner le projet
```bash
git clone <repo-url>
cd devnotes
2. Installer les dépendances backend
cd server
npm install
3. Lancer le serveur
npm run dev

```
Le serveur démarre sur :

http://localhost:3000
4. Accéder au site
http://localhost:3000/pages/index.html

## 🧠 Choix techniques
Vanilla JS : pour démontrer la maîtrise du DOM, des modules et de la logique applicative sans abstraction.

API REST séparée : front statique consommant une API, architecture claire et évolutive.

Pagination côté front : suffisante pour un faible volume de données.

Commentaires factices : pour illustrer l’UX sans gérer l’authentification.

Header injecté dynamiquement : évite la duplication de code HTML.

## 🔮 Pistes d’amélioration
Authentification utilisateurs

Commentaires persistés en base de données

Pagination côté API

SEO (meta dynamiques)

Tests automatisés

Migration vers une base de données (SQLite / PostgreSQL)

## 👨‍💻 Auteur
Projet réalisé par Kévin
Développeur web junior