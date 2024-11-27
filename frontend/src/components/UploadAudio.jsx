import React, { useState } from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API

const UploadAudio = ({ onTranscription }) => {
  const [audioFile, setAudioFile] = useState(null); // Nouveau state pour le fichier audio uploadé
  const [audioSrc, setAudioSrc] = useState(null); // Nouveau state pour la source du fichier audio

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Envoie le fichier audio à l'API pour transcription
        const transcription = await sendAudioFile(file);
        onTranscription(transcription); // Passe la transcription au parent

        // Crée une URL de l'objet audio pour la lecture
        const audioURL = URL.createObjectURL(file);
        setAudioFile(file); // Met à jour le fichier audio
        setAudioSrc(audioURL); // Met à jour la source de l'audio
      } catch (err) {
        console.error('Erreur lors de l\'envoi du fichier audio :', err);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />

      {/* Affiche le lecteur audio si un fichier est disponible */}
      {audioSrc && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Audio</h3>
          <audio controls>
            <source src={audioSrc} type={audioFile?.type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
