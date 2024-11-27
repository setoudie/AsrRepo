                                import React from 'react';

const TranscriptionBox = ({ transcription }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Transcription</h2>
      <div style={styles.box}>
        {transcription ? (
          <p style={styles.text}>{transcription}</p>
        ) : (
          <p style={styles.placeholder}>No transcription available yet...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    textAlign: 'center',
    width: '80%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  box: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    minHeight: '100px',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: '18px',
    color: '#333',
    wordWrap: 'break-word',
  },
  placeholder: {
    fontSize: '16px',
    color: '#aaa',
    fontStyle: 'italic',
  },
};

export default TranscriptionBox;
