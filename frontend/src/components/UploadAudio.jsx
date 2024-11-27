import React from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API

const UploadAudio = ({ onTranscription }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const transcription = await sendAudioFile(file); // Utilise l'API pour envoyer l'audio
        onTranscription(transcription); // Passe la transcription au parent
      } catch (err) {
        console.error('Erreur lors de l\'envoi du fichier audio :', err);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
    </div>
  );
};

export default UploadAudio;
