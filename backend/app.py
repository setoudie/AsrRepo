import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from transformers import pipeline
import noisereduce as nr
import librosa
import numpy as np
import soundfile as sf


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
    react_audio_path = 'backend/static/audio/react_audio.wav'
    audio_file.save(react_audio_path)
    # print(audio_file)
    try:
        # Charger l'audio
        audio, sr = librosa.load(react_audio_path, sr=16000)

        # Réduction du bruit
        reduced_noise = nr.reduce_noise(y=audio, sr=sr)

        # Sauvegarder temporairement l'audio traité
        temp_filename = "backend/static/audio/temp/temp.wav"
        sf.write(temp_filename, reduced_noise, sr)

        # Transcrire l'audio traité
        transcription = transcriber(temp_filename)["text"]
        # print(transcription)
        return jsonify({"transcription": transcription})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
