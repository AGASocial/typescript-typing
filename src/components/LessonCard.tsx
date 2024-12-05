import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import { Lesson, LessonProgress } from '../types/Lesson';

interface LessonCardProps {
  lesson: Lesson;
  progress?: LessonProgress;
  onSelect: () => void;
}

export function LessonCard({ lesson, progress, onSelect }: LessonCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">{lesson.title}</h3>
        </div>
        {progress?.completed && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>
      
      <p className="mt-2 text-gray-600">{lesson.description}</p>
      
      {progress && (
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>Accuracy: {progress.accuracy}%</span>
          <span>WPM: {progress.wpm}</span>
        </div>
      )}
    </div>
  );
}