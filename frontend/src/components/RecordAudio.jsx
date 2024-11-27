import React, { useState } from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API

const RecordAudio = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioFile, setAudioFile] = useState(null); // Nouveau state pour stocker le fichier audio
  const [audioSrc, setAudioSrc] = useState(null); // Nouveau state pour la source du fichier audio

  const startRecording = async () => {
    // Réinitialise les états audioFile et audioSrc lorsqu'on commence un nouvel enregistrement
    setAudioFile(null);
    setAudioSrc(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = async (event) => {
        try {
          const blob = event.data;
          const transcription = await sendAudioFile(blob); // Utilise l'API pour envoyer l'audio
          onTranscription(transcription); // Passe la transcription au parent

          // Crée un URL de l'objet audio pour la lecture
          const audioURL = URL.createObjectURL(blob);
          setAudioFile(blob); // Met à jour le fichier audio
          setAudioSrc(audioURL); // Met à jour la source de l'audio
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

      {/* Affiche le lecteur audio si un fichier est disponible */}
      {audioSrc && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recorded Audio</h3>
          <audio controls>
            <source src={audioSrc} type={audioFile?.type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default RecordAudio;
