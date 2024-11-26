// api/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';  // Assure-toi que Flask écoute à ce port

// Fonction pour envoyer un fichier audio
export const sendAudioFile = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;  // Retourne la transcription
  } catch (error) {
    console.error("Erreur lors de l'envoi du fichier audio : ", error);
    throw error;
  }
};
