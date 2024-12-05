import React from 'react';
import { Clock, Target, LineChart, BookOpen } from 'lucide-react';
import { Attempt, AttemptStats } from '../types/Attempt';
import { calculateAttemptStats } from '../utils/attempts';
import { lessons } from '../data/lessons';

interface GlobalAttemptHistoryProps {
  attempts: Attempt[];
  onSelectLesson: (lessonId: string) => void;
}

export function GlobalAttemptHistory({ attempts, onSelectLesson }: GlobalAttemptHistoryProps) {
  const stats = calculateAttemptStats(attempts);
  const sortedAttempts = [...attempts].sort((a, b) => b.timestamp - a.timestamp);

  const getLessonTitle = (lessonId: string) => {
    return lessons.find(l => l.id === lessonId)?.title || 'Unknown Lesson';
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Target className="w-5 h-5" />
              <h4 className="font-semibold">Overall Accuracy</h4>
            </div>
            <div className="text-2xl font-bold">{stats.averageAccuracy}%</div>
            <div className="text-sm text-gray-500">Best: {stats.bestAccuracy}%</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Clock className="w-5 h-5" />
              <h4 className="font-semibold">Average Speed</h4>
            </div>
            <div className="text-2xl font-bold">{stats.averageWpm} WPM</div>
            <div className="text-sm text-gray-500">Best: {stats.bestWpm} WPM</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-purple-500 mb-2">
              <LineChart className="w-5 h-5" />
              <h4 className="font-semibold">Total Practice Sessions</h4>
            </div>
            <div className="text-2xl font-bold">{stats.totalAttempts}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold">All Attempts</h3>
          </div>
          <div className="divide-y">
            {sortedAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer mb-1"
                      onClick={() => onSelectLesson(attempt.lessonId)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="font-medium">{getLessonTitle(attempt.lessonId)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(attempt.timestamp).toLocaleDateString()} at{' '}
                      {new Date(attempt.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="mt-1">
                      <span className="text-blue-500 font-medium">{attempt.accuracy}% accuracy</span>
                      <span className="mx-2">•</span>
                      <span className="text-green-500 font-medium">{attempt.wpm} WPM</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Duration: {Math.round(attempt.duration)}s
                  </div>
                </div>
              </div>
            ))}
            {attempts.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No attempts yet. Start practicing to see your progress!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}