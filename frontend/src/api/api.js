import axios from "axios";

const API_URL = "http://127.0.0.1:5000/transcribe";

export const sendAudioFile = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioFile); // Assure-toi que "audio" correspond à la clé attendue par Flask

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data.transcription)
    return response.data.transcription; // Retourne la transcription
  } catch (error) {
    // console.error("Erreur lors de l'envoi de l'audio :", error);
    throw error; // Laisse l'erreur se propager
  }
};
