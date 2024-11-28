import React, { useState } from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API
import './UploadAudio.css'; // Importation des styles CSS

const UploadAudio = ({ onTranscription }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false); // Nouveau state pour indiquer le chargement
  const [error, setError] = useState(null); // Nouveau state pour gérer les erreurs

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setError(null);
      try {
        const transcription = await sendAudioFile(file);
        onTranscription(transcription);

        const audioURL = URL.createObjectURL(file);
        setAudioFile(file);
        setAudioSrc(audioURL);
      } catch (err) {
        console.error('Erreur lors de l\'envoi du fichier audio :', err);
        setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="upload-audio">
      <label htmlFor="audio-upload" className="upload-button">
        {loading ? 'Uploading...' : 'Choose an Audio File'}
      </label>
      <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Cache l'input brut
      />

      {error && <p className="error-message">{error}</p>}

      {audioSrc && (
        <div className="audio-preview">
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
