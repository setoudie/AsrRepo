# ASR (Automated Speech Recognition) Project

Ce projet consiste en une application de **Reconnaissance Automatique de la Parole (ASR)**, permettant à l'utilisateur d'enregistrer ou de télécharger un fichier audio et d'obtenir une transcription en temps réel. Le frontend est construit avec **React.js**, et le backend utilise **Flask** pour gérer les requêtes de transcription.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Installation et configuration](#installation-et-configuration)
  - [Installation du frontend](#installation-du-frontend)
  - [Installation du backend](#installation-du-backend)
- [Déploiement](#déploiement)
  - [Déploiement du frontend](#déploiement-du-frontend)
  - [Déploiement du backend](#déploiement-du-backend)
- [Fonctionnement de l'application](#fonctionnement-de-lapplication)
- [Contribution](#contribution)
- [Licence](#licence)

## Technologies utilisées

- **Frontend :**
  - **React.js** : Bibliothèque JavaScript pour construire l'interface utilisateur.
  - **Vite** : Outil de développement pour une configuration rapide de React.
  - **CSS** : Pour la mise en forme de l'interface utilisateur.
  - **Axios** : Pour effectuer des requêtes HTTP vers le backend.

- **Backend :**
  - **Flask** : Framework Python pour créer l'API backend.
  - **Gunicorn** : Serveur HTTP pour déployer l'application Flask.
  - **Speech Recognition** : Utilisation d'une API ou d'une bibliothèque pour effectuer la transcription.

## Architecture du projet

Le projet est divisé en deux parties principales :

1. **Frontend** (React.js) : Permet à l'utilisateur de télécharger un fichier audio ou d'enregistrer directement de l'audio à partir de son microphone. La transcription obtenue est affichée dans l'interface utilisateur.
2. **Backend** (Flask) : Gère les requêtes de transcription envoyées par le frontend. Il reçoit un fichier audio, le traite et retourne une transcription en texte.

### Structure des dossiers

```
/asr-project
├── /frontend       # Code du frontend (React.js)
├── /backend        # Code du backend (Flask)
├── /README.md      # Ce fichier
├── /LICENSE         # Licence du projet
```

## Installation et configuration

### Installation du frontend

1. Clonez ce dépôt Git :

   ```bash
   git clone https://github.com/your-username/asr-project.git
   cd asr-project/frontend
   ```

2. Installez les dépendances nécessaires avec npm :

   ```bash
   npm install
   ```

3. Lancez l'application React localement :

   ```bash
   npm run dev
   ```

4. L'application sera accessible à `http://localhost:3000`.

### Installation du backend

1. Allez dans le répertoire backend :

   ```bash
   cd ../backend
   ```

2. Créez un environnement virtuel et activez-le :

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Sur Windows, utilisez 'venv\Scripts\activate'
   ```

3. Installez les dépendances Python :

   ```bash
   pip install -r requirements.txt
   ```

4. L'application backend utilise Flask. Assurez-vous que votre application est prête à recevoir des requêtes.

5. Lancez l'API Flask :

   ```bash
   flask run
   ```

6. L'API sera accessible à `http://127.0.0.1:5000`.

## Déploiement

### Déploiement du frontend

1. Déployez votre application frontend avec [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).
   
   Par exemple, pour Vercel, exécutez la commande suivante dans le dossier frontend :

   ```bash
   vercel
   ```

2. Suivez les instructions pour compléter le déploiement.

### Déploiement du backend

1. Déployez votre backend sur un service comme **Heroku** ou **Render**.
   
   Par exemple, pour déployer avec Heroku :

   1. Créez un compte Heroku si ce n'est pas déjà fait : [https://signup.heroku.com/](https://signup.heroku.com/).
   2. Installez la CLI Heroku : [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).
   3. Connectez-vous à votre compte Heroku :

      ```bash
      heroku login
      ```

   4. Dans le dossier `backend`, déployez l'application avec Heroku :

      ```bash
      git init
      heroku create
      git add .
      git commit -m "Initial commit"
      git push heroku master
      ```

2. L'API sera accessible à l'URL fournie par Heroku (par exemple : `https://your-app.herokuapp.com`).

## Fonctionnement de l'application

1. **Enregistrement de l'audio** : L'utilisateur peut cliquer sur le bouton "Start Recording" dans le frontend pour commencer à enregistrer un message vocal. Une fois l'enregistrement terminé, il peut l'écouter et voir la transcription correspondante.

2. **Téléchargement d'un fichier audio** : L'utilisateur peut également télécharger un fichier audio pour le faire transcrire. Le fichier sera envoyé au backend pour traitement.

3. **Transcription** : L'API Flask reçoit le fichier audio ou l'enregistrement et renvoie la transcription en texte que l'application frontend affiche.

### Exemple de requête avec Axios :

```javascript
import axios from 'axios';

const sendAudioFile = async (file) => {
  const formData = new FormData();
  formData.append('audio_file', file);

  const response = await axios.post('https://your-heroku-app.herokuapp.com/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.transcription;  // Retourne la transcription
};
```

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

1. Fork ce dépôt.
2. Créez une branche (`git checkout -b feature/ma-nouvelle-feature`).
3. Commitez vos modifications (`git commit -am 'Ajout de ma nouvelle feature'`).
4. Poussez votre branche (`git push origin feature/ma-nouvelle-feature`).
5. Ouvrez une pull request.

