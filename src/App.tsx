import React, { useState, useEffect } from 'react';
import { lessons } from './data/lessons';
import { LessonProgress } from './types/Lesson';
import { Attempt } from './types/Attempt';
import { LessonCard } from './components/LessonCard';
import { LessonView } from './components/LessonView';
import { GlobalAttemptHistory } from './components/GlobalAttemptHistory';
import { loadAttempts, saveAttempts, loadProgress, saveProgress } from './utils/storage';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved data on initial render
  useEffect(() => {
    const savedProgress = loadProgress();
    const savedAttempts = loadAttempts();
    setProgress(savedProgress);
    setAttempts(savedAttempts);
  }, []);

  const handleLessonComplete = (lessonId: string, lessonProgress: LessonProgress, attempt: Attempt) => {
    // Update progress
    const updatedProgress = {
      ...progress,
      [lessonId]: lessonProgress
    };
    setProgress(updatedProgress);
    saveProgress(updatedProgress);

    // Update attempts
    const updatedAttempts = [...attempts, attempt];
    setAttempts(updatedAttempts);
    saveAttempts(updatedAttempts);
  };

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    if (!lesson) return null;

    const lessonAttempts = attempts.filter(a => a.lessonId === selectedLesson);

    return (
      <LessonView
        lesson={lesson}
        attempts={lessonAttempts}
        onComplete={(p, a) => handleLessonComplete(selectedLesson, p, a)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              TypeScript Typing Practice
            </h1>
            <p className="text-gray-600">
              Improve your typing skills while learning TypeScript
            </p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {showHistory ? 'Show Lessons' : 'View Progress'}
          </button>
        </div>

        {showHistory ? (
          <GlobalAttemptHistory 
            attempts={attempts} 
            onSelectLesson={(lessonId) => {
              setSelectedLesson(lessonId);
              setShowHistory(false);
            }}
          />
        ) : (
          <div className="space-y-4">
            {lessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progress={progress[lesson.id]}
                onSelect={() => setSelectedLesson(lesson.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;