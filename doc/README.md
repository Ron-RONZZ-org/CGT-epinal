# CGT Union Locale Épinal - Website

Site web officiel de l'Union Locale CGT d'Épinal.

## Description

Ce site web présente l'Union Locale CGT d'Épinal, ses activités, son agenda et permet aux visiteurs de découvrir le syndicat et de prendre contact pour adhérer.

## Structure du site

- **index.html** - Page d'accueil avec vidéo de bienvenue et actualités
- **intro.html** - Présentation de l'Union Locale CGT Épinal
- **calendar.html** - Agenda des événements
- **contact.html** - Page de contact et adhésion
- **search.html** - Page de recherche sur le site

## Fonctionnalités

- Navigation responsive avec menu hamburger sur mobile
- Vidéo d'accueil
- Système de recherche intégré
- Agenda avec filtrage par type d'événement (permanence, convialité, action syndicale, administrative)
- Intégration des réseaux sociaux (Instagram et Facebook)
- Design aux couleurs CGT (#f03e3e, #fab005, #dcdad7)

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome pour les icônes

## Installation et utilisation

### Prérequis
- Un navigateur web moderne
- Un serveur web local (optionnel pour le développement)

### Lancement

#### Méthode 1 : Ouverture directe
Ouvrez simplement le fichier `index.html` dans votre navigateur web.

#### Méthode 2 : Serveur local (recommandé)
Pour un meilleur rendu et éviter les problèmes CORS :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Python 2
python -m SimpleHTTPServer 8000

# Avec Node.js (npx)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## Personnalisation

### Modifier les événements
Les événements sont définis dans le fichier `js/events.js`. Modifiez le tableau `sampleEvents` pour ajouter, modifier ou supprimer des événements.

### Modifier les couleurs
Les couleurs du thème sont définies dans le fichier `css/style.css` dans les variables CSS (`:root`).

### Ajouter du contenu
Modifiez directement les fichiers HTML pour personnaliser le contenu des pages.

## Contact

**CGT Union Locale Épinal**
- Email : ulcgtepinal@gmail.com
- Téléphone : 06 41 27 48 65
- Adresse : 4 RUE ARISTIDE BRIAND BP, Épinal

## Réseaux sociaux

- Instagram : [@cgtepinal](https://www.instagram.com/cgtepinal/)
- Facebook : [cgtepinal](https://www.facebook.com/cgtepinal/)

## Licence

© CGT Union Locale Épinal - Tous droits réservés
