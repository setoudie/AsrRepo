from transformers import pipeline

# import sounddevice as sd
# import librosa
# import numpy as np
# import wavio

# Chargement du pipeline Hugging Face
pipe = pipeline("automatic-speech-recognition", model="serge-wilson/wav2vec-base-wolof")

"""# Demander le choix à l'utilisateur
choice = int(input("Choisissez une option (1: fichier audio, 2: enregistrement micro) : "))

if choice == 1:
    # Transcrire un fichier audio
    transcription_audio = pipe("static/file1.wav")
elif choice == 2:
    # Enregistrer via le micro
    print("Enregistrement en cours... Parlez maintenant.")

    # Paramètres d'enregistrement
    samplerate = 16000  # 16 kHz pour Wav2Vec2
    duration = 5  # 5 secondes d'enregistrement
    audio = sd.rec(int(samplerate * duration), samplerate=samplerate, channels=1, dtype=np.float32)
    sd.wait()  # Attendre la fin de l'enregistrement

    # Sauvegarder temporairement l'enregistrement
    wavio.write("temp_audio.wav", audio, samplerate, sampwidth=2)

    # Transcrire l'audio enregistré
    transcription_audio = pipe("temp_audio.wav")
else:
    transcription_audio = "Option invalide."

# Afficher le résultat
print("Transcription : ", transcription_audio)
"""

from utils import *

path = treate_audio("backend/static/audio/file1.wav")
print(pipe(path))