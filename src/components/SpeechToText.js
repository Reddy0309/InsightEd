import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import googleTranslate from 'translate-google';

const SpeechToTextTranslator = () => {
  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const { listen, listening, stopListening } = useSpeechRecognition();

  const startListening = () => {
    listen({
      onResult: handleResult,
      interimResults: false,
      continuous: false,
      language: 'hi-IN' // Adjust based on the source language
    });
  };

  const handleResult = async (result) => {
    const speechTranscript = result?.[0]?.transcript || '';
    setTranscript(speechTranscript);
    try {
      const translation = await googleTranslate(speechTranscript, { to: 'en' });
      setTranslatedText(translation.text);
      speakTranslatedText(translation.text);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation error');
    }
  };

  const speakTranslatedText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Speech to Text and Translation</h2>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Listening'}
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <p><strong>Transcript:</strong> {transcript}</p>
        <p><strong>Translated Text:</strong> {translatedText}</p>
      </div>
    </div>
  );
};

export default SpeechToTextTranslator;
