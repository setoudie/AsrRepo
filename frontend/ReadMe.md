# ASR Frontend (React)

Ce projet contient le frontend d'une application de **Reconnaissance Automatique de la Parole (ASR)**. Il permet à l'utilisateur de s'enregistrer, de télécharger un fichier audio et d'obtenir une transcription.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Installation locale](#installation-locale)
- [Déploiement sur Vercel](#déploiement-sur-vercel)
- [Fonctionnement de l'application](#fonctionnement-de-lapplication)
- [Contribution](#contribution)
- [Licence](#licence)

## Technologies utilisées

- **React.js** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Vite** : Outil de développement pour une configuration rapide de React.
- **Axios** : Bibliothèque pour effectuer des requêtes HTTP.
- **CSS** : Pour la mise en forme de l'interface utilisateur.
- **Flask API** : Utilisation d'une API Flask pour la transcription des fichiers audio.

## Installation locale

### Prérequis

Avant d'installer et de lancer l'application localement, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [NPM ou Yarn](https://www.npmjs.com/) (pour la gestion des dépendances)

### Étapes d'installation

1. Clonez ce dépôt Git :

   ```bash
   git clone https://github.com/your-username/asr-frontend.git
   cd asr-frontend
   ```

2. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

3. Lancez l'application React localement :

   ```bash
   npm run dev
   ```

4. Accédez à l'application dans votre navigateur en allant à :

   ```
   http://localhost:3000
   ```

## Déploiement sur Vercel

Si vous souhaitez déployer cette application sur Vercel (service de déploiement de frontend), suivez les étapes ci-dessous :

### Étapes de déploiement

1. Créez un compte Vercel si vous n'en avez pas encore un : [https://vercel.com/signup](https://vercel.com/signup)

2. Installez la CLI Vercel : [https://vercel.com/docs/cli](https://vercel.com/docs/cli)

3. Exécutez la commande suivante pour vous connecter à votre compte Vercel :

   ```bash
   vercel login
   ```

4. Déployez l'application en utilisant Vercel :

   ```bash
   vercel
   ```

5. Suivez les instructions pour finaliser le déploiement.

6. Une fois l'application déployée, vous recevrez un lien public vers votre site web.

## Fonctionnement de l'application

L'application permet à l'utilisateur d'interagir avec le backend Flask pour enregistrer ou télécharger des fichiers audio, puis obtenir une transcription en temps réel.

### Composants principaux :

- **RecordAudio** : Permet à l'utilisateur d'enregistrer de l'audio en direct.
- **UploadAudio** : Permet à l'utilisateur de télécharger un fichier audio à transcrire.
- **TranscriptionBox** : Affiche la transcription de l'audio.
- **Navbar** : Contient les liens de navigation de l'application.

### Comment l'utilisateur interagit avec l'application :

1. L'utilisateur peut cliquer sur le bouton **Start Recording** dans le composant **RecordAudio** pour commencer à enregistrer un message vocal.
2. L'utilisateur peut également choisir de télécharger un fichier audio avec **UploadAudio**.
3. Une fois l'audio enregistré ou téléchargé, l'application envoie le fichier au backend Flask pour transcription.
4. La transcription est affichée dans le composant **TranscriptionBox**.

### Exemple de requête avec Axios :

Lorsqu'un fichier audio est téléchargé ou enregistré, il est envoyé au backend Flask avec une requête POST :

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
