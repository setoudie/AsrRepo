// App.jsx

import React, { useState } from 'react';
import UploadButton from './components/UploadButton';
import RecordButton from './components/RecordButton';
import TranscriptionBox from './components/TranscriptionBox';
import { sendAudioFile } from './api/api';

const App = () => {
  const [transcription, setTranscription] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);

  const handleFileUpload = async (file) => {
    console.log('Fichier sélectionné :', file);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const result = await sendAudioFile(formData); // Envoi au backend Flask
      setTranscription(result.transcription); // Affiche la transcription reçue
      console.log(transcription)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier :', error);
      setTranscription('Erreur de transcription.');
    }
  };

  const handleStartRecording = () => {
    console.log('Enregistrement démarré.');
  };

  const handleStopRecording = async (blob) => {
    setAudioBlob(blob);
    const formData = new FormData();
    formData.append('audio', blob, 'audio.wav');

    try {
      const result = await sendAudioFile(formData);
      setTranscription(result.transcription);
    } catch (error) {
      console.error('Erreur lors de la transcription de l\'audio :', error);
      setTranscription('Erreur de transcription.');
    }
  };

  return (
    <div>
      <h1>Application ASR</h1>
      <RecordButton onStartRecording={handleStartRecording} onStopRecording={handleStopRecording} />
      <UploadButton sendAudioFile={handleFileUpload} />
      <TranscriptionBox transcription={transcription} />
    </div>
  );
};

export default App;
