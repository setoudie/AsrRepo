// components/RecordButton.jsx

import React, { useState, useRef } from 'react';

const RecordButton = ({ onStartRecording, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const handleStartRecording = () => {
    // Accès au micro et démarrer l'enregistrement
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);  // Sauvegarde l'URL de l'audio pour l'écouter
          setIsRecording(false);
          onStopRecording(audioBlob);  // Appel de la fonction passée en prop avec l'audioBlob
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        onStartRecording();  // Appel de la fonction passée en prop
      })
      .catch((err) => {
        console.error('Erreur d\'accès au micro :', err);
      });
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={isRecording} className="record-button">
        {isRecording ? 'Enregistrement en cours...' : 'Démarrer l\'enregistrement'}
      </button>
      {isRecording && (
        <button onClick={handleStopRecording} className="stop-button">
          Arrêter l'enregistrement
        </button>
      )}
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default RecordButton;
