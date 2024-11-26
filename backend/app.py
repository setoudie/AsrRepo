from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import noisereduce as nr
import librosa
import numpy as np

app = Flask(__name__)
CORS(app)

# Charger le modèle Hugging Face
transcriber = pipeline("automatic-speech-recognition", model="serge-wilson/wav2vec-large-wolof")

@app.route('/')
def hello():
    return jsonify(msg='hello!!')

# cette route permet de transcrire l'audio en text
@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio"]
    audio, sr = librosa.load(audio_file, sr=16000)  # Charger l'audio

    # Réduction du bruit
    reduced_noise = nr.reduce_noise(y=audio, sr=sr)

    # Sauvegarder temporairement l'audio traité
    librosa.output.write_wav("temp.wav", reduced_noise, sr)

    # Transcrire
    transcription = transcriber("temp.wav")["text"]

    return jsonify({"transcription": transcription})

if __name__ == "__main__":
    app.run(debug=True)
