import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from transformers import pipeline
import noisereduce as nr
import librosa
import requests
import numpy as np
import soundfile as sf
from dotenv import load_dotenv
from datetime import datetime

# Import the Cloudinary libraries
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

import os

load_dotenv()  # Charge les variables depuis le fichier .env

config = cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key,os.getenv("CLOUDINARY_CLOUD_NAME"), "\n")


app = Flask(__name__)
CORS(app)

# Charger le modèle Hugging Face
transcriber = pipeline("automatic-speech-recognition", model="serge-wilson/wav2vec-large-wolof")

@app.route('/')
def hello():
    # return jsonify(msg='Hello render    !!')
    return render_template('index.html')

# cette route permet de transcrire l'audio en text
@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio"]

    # if  audio_file:
    #     # uploadAudio()
    #     print("Audio file provided")
    raw_uploader = cloudinary.uploader.upload(
      audio_file,
      asset_folder="asr_files/audio/raw",
      resource_type="auto",
      public_id=f"raw_audio_{datetime.now().strftime('%Y%m%d%H%M%S')}.wav",
      overwrite=True,
      tags=["raw", "wolof", "audio"]
    )
    # print(raw_uploader)

    raw_audio_url = raw_uploader["secure_url"]
    # audio_file.save(raw_audio_url)
    # print(audio_file)
    try:
        # Télécharger le fichier audio depuis Cloudinary
        response = requests.get(raw_audio_url)
        # print(response.status_code)

        if response.status_code != 200:
            return jsonify({"error": "Failed to download audio from Cloudinary"}), 500

        # # Charger l'audio
        # audio, sr = librosa.load(response.content, sr=16000)
        #
        # # Réduction du bruit
        # reduced_noise = nr.reduce_noise(y=audio, sr=sr)
        #
        # # Sauvegarder temporairement l'audio traité
        # temp_filename = "temp.wav"
        # sf.write(temp_filename, reduced_noise, sr)
        #
        # preprocess_uploader = cloudinary.uploader.upload(temp_filename,
        #     asset_folder="asr_files/audio/processed",
        #     resource_type="video",
        #     public_id=f"processed_audio_{datetime.now().strftime('%Y%m%d%H%M%S')}.wav",
        #     overwrite=True,
        #     tags=["processed", "wolof", "audio"]
        # )
        #
        #
        # # Transcrire l'audio traité
        transcription = transcriber(response.content)["text"]
        print(transcription)
        return jsonify({"transcription": transcription})


    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
