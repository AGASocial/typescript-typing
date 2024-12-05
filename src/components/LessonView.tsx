import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Lesson, LessonProgress } from '../types/Lesson';
import { Attempt } from '../types/Attempt';
import { CodeEditor } from './CodeEditor';
import { AttemptHistory } from './AttemptHistory';
import { Sidebar } from './Sidebar';
import { generateAttemptId } from '../utils/attempts';

interface LessonViewProps {
  lesson: Lesson;
  attempts: Attempt[];
  onComplete: (progress: LessonProgress, attempt: Attempt) => void;
  onBack: () => void;
}

export function LessonView({ lesson, attempts, onComplete, onBack }: LessonViewProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleComplete = (accuracy: number, wpm: number, duration: number) => {
    setIsCompleted(true);
    
    const attempt: Attempt = {
      id: generateAttemptId(),
      lessonId: lesson.id,
      timestamp: Date.now(),
      accuracy,
      wpm,
      completed: true,
      duration
    };

    onComplete({
      accuracy,
      wpm,
      completed: true,
      timestamp: Date.now(),
      attempts: [...(attempts?.map(a => a.id) || []), attempt.id]
    }, attempt);
  };

  return (
    <div className="max-w-[90rem] mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lessons
      </button>

      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

      {isCompleted ? (
        <div className="space-y-8">
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Lesson Completed! 🎉
            </h3>
            <button
              onClick={onBack}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Return to Lessons
            </button>
          </div>
          <AttemptHistory attempts={attempts} />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex gap-6">
            {/* Instructions Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <div className="prose prose-sm">
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">What you'll learn:</h4>
                    <div className="whitespace-pre-wrap text-gray-600">{lesson.explanation}</div>
                  </div>
                </div>
              </div>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              {/* Example Code Column */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Example Code</h3>
                </div>
                <div className="h-[calc(100vh-250px)] overflow-hidden">
                  <pre className="text-gray-300 font-mono text-sm p-4 bg-gray-900 h-full overflow-auto whitespace-pre-wrap break-words">
                    {lesson.code}
                  </pre>
                </div>
              </div>

              {/* Practice Editor Column */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Practice Area</h3>
                </div>
                <div className="h-[calc(100vh-250px)]">
                  <CodeEditor code={lesson.code} onComplete={handleComplete} />
                </div>
              </div>
            </div>
          </div>

          {attempts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <AttemptHistory attempts={attempts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}