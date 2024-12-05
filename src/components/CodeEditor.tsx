import React, { useState, useEffect } from 'react';
import { Clock, Save } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onComplete: (accuracy: number, wpm: number, duration: number) => void;
}

export function CodeEditor({ code, onComplete }: CodeEditorProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0) {
      const correctChars = userInput.split('').filter((char, i) => char === code[i]).length;
      const currentAccuracy = (correctChars / userInput.length) * 100;
      setAccuracy(Math.round(currentAccuracy));

      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wordsTyped = userInput.length / 5; // assume average word length of 5
        setWpm(Math.round(wordsTyped / timeElapsed));
      }

      // Enable save button when user has typed at least 25% of the code
      setCanSave(userInput.length >= code.length * 0.25);
    }
  }, [userInput, code, startTime]);

  const handleSaveAttempt = () => {
    if (!startTime) return;
    
    const duration = (Date.now() - startTime) / 1000; // in seconds
    onComplete(accuracy, wpm, duration);
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="flex-1 w-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
        placeholder="Start typing here..."
        spellCheck={false}
        style={{ 
          height: 'calc(100% - 60px)',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
      />
      
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{wpm} WPM</span>
          </div>
          <div className="font-mono">Accuracy: {accuracy}%</div>
        </div>
        <button
          onClick={handleSaveAttempt}
          disabled={!canSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
            canSave 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          Save Attempt
        </button>
      </div>
      
      {!canSave && userInput.length > 0 && (
        <p className="text-sm text-gray-500 px-4 pb-2">
          Type at least 25% of the code to save your attempt
        </p>
      )}
    </div>
  );
}