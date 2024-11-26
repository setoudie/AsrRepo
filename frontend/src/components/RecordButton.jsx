// components/RecordButton.jsx

import React, { useState } from 'react';

const RecordButton = ({ onStartRecording, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    if (isRecording) {
      setIsRecording(false);
      onStopRecording();  // Appel de la fonction passée en prop
    } else {
      setIsRecording(true);
      onStartRecording();  // Appel de la fonction passée en prop
    }
  };

  return (
    <button onClick={handleClick} className="record-button">
      {isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
    </button>
  );
};

export default RecordButton;
