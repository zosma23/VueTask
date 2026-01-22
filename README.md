# VueTask

📌 PROJET FIL ROUGE – VueTask
🎯 Contexte pédagogique
Dans le cadre du module Framework Vue.js (Vue 3 – Composition API), vous allez développer une application web complète appelée VueTask.
VueTask est un gestionnaire de tâches moderne inspiré des outils utilisés en entreprise (Trello, Todoist, Jira – version simplifi ée). Ce projet servira de fi l rouge tout au long du cours et évoluera progressivement en fonction des notions vues.

🎯 Objectifs du projet
À la fin du projet, vous serez capable de :
● Créer une application SPA (Single Page Application) avec Vue.js 3
● Structurer un projet Vue avec Vite
● Utiliser la Composition API
● Créer des composants réutilisables
● Gérer un état global avec Pinia
● Mettre en place la navigation avec Vue Router
● Consommer une API REST
● Produire une application maintenable et professionnelle

🧩 Description fonctionnelle de VueTask
L’application VueTask permet à un utilisateur de :
● Créer des tâches
● Consulter la liste des tâches
● Marquer une tâche comme terminée
● Modifi er ou supprimer une tâche
● Filtrer et rechercher des tâches
● Consulter le détail d’une tâche
● Naviguer entre plusieurs pages
🗂️


Découpage du projet par journées

🟢 JOUR 1 – Fondations & Réactivité
Objectif : Mettre en place la structure du projet et comprendre la réactivité Vue.
Fonctionnalités attendues
● Création du projet Vue avec Vite
● Structure propre du projet (components, views, stores)
● Affi chage d’une liste de tâches
● Ajout d’une tâche via un formulaire
● Suppression d’une tâche
● Marquage d’une tâche comme terminée
● Utilisation de :
○ ref, reactive
○ v-if, v-for
○ v-model
○ événements (@click, @submit)

Contraintes techniques
● Vue 3
● Composition API (<script setup>)
● TypeScript recommandé

🟡 JOUR 2 – Composants & État global (Pinia)
Objectif : Rendre l’application modulaire et scalable.
Fonctionnalités attendues
● Découpage en composants :
○ TaskCard
○ TaskForm
○ TaskFilter
○ TaskStats

● Communication :
○ props
○ emit
● Centralisation des données avec Pinia

● Actions CRUD complètes :
○ ajouter
○ modifi er
○ supprimer
○ toggle terminé

● Filtres :
○ toutes
○ actives
○ terminées

● Statistiques :
○ nombre total
○ nombre terminées
○ pourcentage de complétion

Contraintes techniques
● Store Pinia typé
● Aucun état métier stocké directement dans les composants
● Les composants doivent être réutilisables

🔵 JOUR 3 – Routage, API & Production
Objectif : Finaliser une vraie application SPA professionnelle.
Fonctionnalités attendues
● Mise en place de Vue Router
● Pages obligatoires :
○ / → Dashboard
○ /tasks → Liste des tâches
○ /tasks/:id → Détail d’une tâche
○ /settings → Paramètres
● Routes dynamiques
● Lazy loading des vues
● Intégration d’une API REST (réelle ou simulée)

● Gestion :
○ loading
○ erreurs
● Build de production
● Déploiement (Vercel / Netlify)

🧪 Bonus (optionnel)
● Persistance via localStorage
● Authentifi cation simulée
● Protection de routes
● Pagination
● Dark mode
● Animations de transition

📦 Livrables attendus
● Dépôt GitHub propre
● Code lisible et structuré
● Nommage clair des composants
● Application fonctionnelle

● README expliquant :
○ le projet
○ l’installation
○ les fonctionnalités

✅ Critères d’évaluation
● Respect des consignes
● Qualité du code
● Bonne utilisation de Vue 3
● Architecture claire
● Composants bien découpés
● Gestion correcte de l’état global
● Application fonctionnelle
