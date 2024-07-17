import React, { useState} from 'react';

function App() {
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  const [speechTranslation, setSpeechTranslation] = useState('');
  const [languageChoice, setLanguageChoice] = useState('1'); // Default to Hindi

  const handleLanguageChange = (e) => {
    setLanguageChoice(e.target.value);
  };

  const handleSpeechToText = async () => {
    setLoadingSpeech(true);
    try {
      const payload = {
        language_choice: languageChoice
      };

      const response = await fetch("/Speechtotext", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSpeechTranslation(data.translation);
      setLoadingSpeech(false);
    } catch (error) {
      console.error('Error fetching speech to text:', error);
      setLoadingSpeech(false);
    }
  };

  return (
    <div>
      {/* Language Selection */}
      <div>
        <label htmlFor="language">Select Language:</label>
        <select id="language" value={languageChoice} onChange={handleLanguageChange}>
          <option value="1">Hindi</option>
          <option value="2">Telugu</option>
          <option value="3">Kannada</option>
          <option value="4">English</option>
        </select>
      </div>
      {/* Speech to Text Translation */}
      <div>
        <button onClick={handleSpeechToText} disabled={loadingSpeech}>
          {loadingSpeech ? 'Translating...' : 'Translate Speech to Text'}
        </button>
        {speechTranslation && (
          <div>
            <p>Speech to Text Translation:</p>
            <p>{speechTranslation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
