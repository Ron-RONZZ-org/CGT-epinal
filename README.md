# CGT Union Locale Épinal - Site Web Officiel

Site web officiel de l'Union Locale CGT d'Épinal.

## 🌐 Accès au site

- **Domaine principal** : [ul.cgt-epinal.fr](https://ul.cgt-epinal.fr/)
- **Alias** : [cgt-epinal.fr](https://cgt-epinal.fr/) et [www.cgt-epinal.fr](https://www.cgt-epinal.fr/) redirigent vers le domaine principal

## 📖 Description

Ce site web présente l'Union Locale CGT d'Épinal, ses activités, son agenda et permet aux visiteurs de découvrir le syndicat et de prendre contact pour adhérer.

## 🎯 Public cible

Travailleurs et travailleuses, membres et adhérent·es potentiel·les de la CGT dans la région d'Épinal.

## 🏗️ Structure du site

- **index.html** - Page d'accueil avec vidéo de bienvenue et actualités
- **intro.html** - Présentation de l'Union Locale CGT Épinal
- **calendar.html** - Agenda des événements avec système de filtrage
- **contact.html** - Page de contact et formulaire d'adhésion
- **search.html** - Page de recherche sur le site

## ✨ Fonctionnalités

- Navigation responsive avec menu hamburger sur mobile
- Vidéo d'accueil
- Système de recherche intégré
- Agenda avec filtrage par type d'événement :
  - 🔵 Permanence (juridique, générale, aide sociale)
  - 🟣 Convialité (événements sociaux)
  - 🔴 Action syndicale (grèves, manifestations)
  - 🟢 Administrative (réunions, assemblées)
- Intégration des réseaux sociaux (Instagram et Facebook)
- Design aux couleurs officielles de la CGT (#f03e3e, #fab005)

## 🛠️ Technologies utilisées

- **HTML5** - Markup sémantique
- **CSS3** - Styles personnalisés avec variables CSS
- **JavaScript Vanilla** - Aucune dépendance de framework
- **Font Awesome 6.4.0** - Bibliothèque d'icônes (CDN)
- **GitHub Pages** - Hébergement statique gratuit et sécurisé

## 📅 Gestion des événements

Les événements sont stockés sous forme de fichiers Markdown dans le dossier `./events/` avec le format de nommage suivant :

```
event-{date}-{description}.md
```

**Exemple** : `event-16-01-2026-juridique.md` (format de date : DD-MM-YYYY)

### Structure d'un fichier événement

```markdown
# [Titre de l'événement](https://lien-optionnel.com)

## Event description

Description détaillée de l'événement avec support du formatage Markdown :
- **Texte en gras**
- *Texte en italique*
- Listes numérotées et non-numérotées
- [Liens](https://example.com)
- ![Images](url-image.jpg)

## Date

DD-MM-YYYY

## Location

Adresse complète

## Type

- [] Permanence
- [X] Administrative
- [] Convialité
- [] Action syndicale
```

### Fonctionnalités des événements

- **Affichage sur la page d'accueil** : Les 3 prochains événements à venir sont affichés
- **Page agenda complète** : Tous les événements à venir avec filtrage par type
- **Descriptions extensibles** : Cliquez sur le bouton `+` pour afficher/masquer la description complète
- **Rendu Markdown** : Les descriptions supportent le formatage Markdown (gras, italique, listes, liens, images)
- **Lien social** : Si un lien est fourni dans le titre, un bouton "Voir sur les réseaux sociaux" apparaît en bas de la description
- **Filtrage automatique** : Les événements passés ne sont pas affichés

### Fichiers de référence

- **event-template.md** - Modèle vide pour créer un nouvel événement
- **event-example.md** - Exemple générique avec texte d'exemple
- **event-example-filled.md** - Exemple complet en français

### Mise à jour de l'index des événements

Après avoir ajouté ou supprimé des fichiers d'événements, exécutez le script suivant pour mettre à jour l'index :

```bash
./generate-events-index.sh
```

Ce script génère automatiquement le fichier `events-index.json` qui liste tous les événements disponibles (en excluant les fichiers templates et examples).

**Note** : Le système supporte également l'ancien format `events.json` pour la rétrocompatibilité.

## 💻 Installation et développement local

### Prérequis

- Un navigateur web moderne
- Un serveur web local (optionnel pour le développement)

### Méthode 1 : Ouverture directe

Ouvrez simplement le fichier `index.html` dans votre navigateur web.

### Méthode 2 : Serveur local (recommandé)

Pour un meilleur rendu et éviter les problèmes CORS :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## 📝 Guide d'édition

Pour les contributeurs et contributrices, consultez le [Guide d'édition complet](doc/EDITOR-ACCESS.md) qui explique :

- Comment créer un compte GitHub
- Comment demander un accès administratif
- Comment ajouter un événement
- Comment enregistrer et déployer vos modifications

## 🎨 Personnalisation

### Modifier les événements

Les événements sont définis dans les fichiers Markdown du dossier `./events/`. Créez, modifiez ou supprimez des fichiers `.md` pour gérer les événements.

### Modifier les couleurs

Les couleurs du thème sont définies dans le fichier `css/style.css` dans les variables CSS (`:root`) :

```css
--primary-red: #f03e3e;      /* Rouge CGT principal */
--secondary-yellow: #fab005;  /* Jaune CGT secondaire */
--event-blue: #4a90e2;       /* Permanence */
--event-purple: #9b59b6;     /* Convialité */
--event-red: #f03e3e;        /* Action syndicale */
--event-green: #27ae60;      /* Administrative */
```

### Ajouter du contenu

Modifiez directement les fichiers HTML pour personnaliser le contenu des pages.

## 📧 Contact

**CGT Union Locale Épinal**

- **Email** : ulcgtepinal@gmail.com
- **Téléphone** : 06 41 27 48 65
- **Adresse** : 4 Rue Aristide Briand BP, Épinal

## 🌍 Réseaux sociaux

- **Instagram** : [@cgtepinal](https://www.instagram.com/cgtepinal/)
- **Facebook** : [cgtepinal](https://www.facebook.com/cgtepinal/)

## 📄 Licence

© CGT Union Locale Épinal - Tous droits réservés

## 🤝 Contribution

Pour contribuer au site web, veuillez consulter notre [guide d'édition](doc/EDITOR-ACCESS.md) ou contacter l'équipe technique à tech@cgt-epinal.fr.
