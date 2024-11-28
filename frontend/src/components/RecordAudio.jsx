import React, { useState } from 'react';
import { sendAudioFile } from '../api/api'; // Importe ta fonction API
import './RecordAudio.css'; // Importation du fichier CSS pour les styles

const RecordAudio = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);

  const startRecording = async () => {
    setAudioFile(null);
    setAudioSrc(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = async (event) => {
        try {
          const blob = event.data;
          const transcription = await sendAudioFile(blob);
          onTranscription(transcription);

          const audioURL = URL.createObjectURL(blob);
          setAudioFile(blob);
          setAudioSrc(audioURL);
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
    <div className="record-audio">
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {audioSrc && (
        <div className="audio-preview">
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
