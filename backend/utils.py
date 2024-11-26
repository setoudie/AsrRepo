import librosa
import soundfile as sf
import noisereduce as nr
import numpy as np

def treate_audio(path: str) -> str:
    """
    Prend un chemin vers un fichier audio, applique des traitements comme le denoising et le resampling,
    puis sauvegarde le fichier traité dans un emplacement temporaire.
    
    Args:
        path (str): Chemin vers le fichier audio à traiter.
    
    Returns:
        str: Chemin vers le fichier audio traité.
    """
    # Charger l'audio avec librosa
    audio, sr = librosa.load(path, sr=None)  # sr=None pour conserver le taux d'échantillonnage d'origine
    
    # Réduction du bruit
    reduced_noise = nr.reduce_noise(y=audio, sr=sr)
    
    # Resampling à 16 kHz (si le modèle le nécessite)
    target_sr = 16000
    if sr != target_sr:
        reduced_noise = librosa.resample(reduced_noise, orig_sr=sr, target_sr=target_sr)
        sr = target_sr
    
    # Sauvegarder le fichier prétraité dans un fichier temporaire
    treated_file_path = "backend/static/audio/temp/temp_treated_file.wav"
    sf.write(treated_file_path, reduced_noise, sr)
    
    return treated_file_path
