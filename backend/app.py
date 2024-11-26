from flask import Flask, jsonify
from utils import *
from transformers import pipeline

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return jsonify(text='Hello World!')

@app.route('/transcribe/<string:file_path>')
def transcribe_audio(file_path) -> str:
    denoised_path = treate_audio(file_path)
    transcriber = pipeline("automatic-speech-recognition", model="serge-wilson/wav2vec-base-wolof")
    transcription = transcriber(denoised_path)

    return jsonify(path=denoised_path, text=transcription['text'])

if __name__ == '__main__':
    app.run()
