# ASR Backend (Flask)

Ce projet contient le backend d'une application de **Reconnaissance Automatique de la Parole (ASR)**, construit avec **Flask**. Il reçoit des fichiers audio via des requêtes HTTP, les transcrit, et renvoie la transcription à l'utilisateur.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Installation locale](#installation-locale)
- [Déploiement sur Heroku](#déploiement-sur-heroku)
- [Fonctionnement de l'API](#fonctionnement-de-lapi)
- [Contribution](#contribution)
- [Licence](#licence)

## Technologies utilisées

- **Flask** : Framework web Python pour créer l'API backend.
- **Gunicorn** : Serveur WSGI pour déployer l'application sur Heroku.
- **Speech-to-Text API** : Pour la transcription audio (exemple avec Hugging Face ou toute autre API).

## Installation locale

### Prérequis

Avant d'installer et de lancer l'application localement, assurez-vous que vous avez installé les outils suivants :

- [Python 3.x](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/)
- [Virtualenv](https://virtualenv.pypa.io/en/stable/)

### Étapes d'installation

1. Clonez ce dépôt Git :

   ```bash
   git clone https://github.com/your-username/asr-backend.git
   cd asr-backend
   ```

2. Créez un environnement virtuel pour isoler les dépendances :

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Sur Windows, utilisez 'venv\Scripts\activate'
   ```

3. Installez les dépendances nécessaires :

   ```bash
   pip install -r requirements.txt
   ```

4. Lancez l'application Flask localement :

   ```bash
   python app.py
   ```

5. Accédez à l'application dans votre navigateur en allant à :

   ```
   http://127.0.0.1:5000
   ```

## Déploiement sur Heroku

Suivez les étapes ci-dessous pour déployer ce backend sur **Heroku**.

### Étapes de déploiement

1. **Créez un compte Heroku** si vous n'en avez pas encore un : [https://signup.heroku.com/](https://signup.heroku.com/)

2. **Installez la CLI Heroku** : [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. **Connectez-vous à Heroku** via la CLI :

   ```bash
   heroku login
   ```

4. **Initialisez un dépôt Git** si ce n'est pas déjà fait :

   ```bash
   git init
   ```

5. **Créez un fichier `Procfile`** (si ce n'est pas déjà fait) à la racine du projet :

   ```bash
   web: gunicorn app:app
   ```

6. **Ajoutez, committez et poussez le code sur Heroku** :

   ```bash
   git add .
   git commit -m "Initial commit"
   heroku create
   git push heroku master
   ```

7. **Accédez à l'application déployée** sur Heroku :

   ```bash
   heroku open
   ```

## Fonctionnement de l'API

### Envoi d'un fichier audio pour transcription

L'API accepte des fichiers audio via une requête POST à l'endpoint `/upload`.

**Méthode :** `POST`

**URL :** `/upload`

**Paramètre :**
- `audio_file` : Fichier audio à envoyer pour transcription (formats acceptés : `.wav`, `.mp3`, `.flac`).

**Réponse :**

- Si la transcription réussit : renvoie la transcription du fichier audio.
- Si une erreur survient : renvoie un message d'erreur.

### Exemple de requête avec cURL :

```bash
curl -X POST -F "audio_file=@path/to/your/audio/file.wav" https://your-heroku-app.herokuapp.com/upload
```

## Contribution

Les contributions sont les bienvenues ! Pour toute contribution, veuillez suivre ces étapes :

1. Fork ce dépôt.
2. Créez une branche (`git checkout -b feature/ma-nouvelle-feature`).
3. Commitez vos changements (`git commit -am 'Ajout de ma nouvelle feature'`).
4. Poussez la branche (`git push origin feature/ma-nouvelle-feature`).
5. Ouvrez une pull request.

