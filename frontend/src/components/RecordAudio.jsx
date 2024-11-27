import React, { useState } from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API

const RecordAudio = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = async (event) => {
        try {
          const transcription = await sendAudioFile(event.data); // Utilise l'API pour envoyer l'audio
          onTranscription(transcription); // Passe la transcription au parent
        } catch (err) {
          console.error('Erreur lors de l\'envoi de l\'audio enregistré :', err);
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Erreur d\'accès au microphone :', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default RecordAudio;
