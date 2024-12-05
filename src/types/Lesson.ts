export interface Lesson {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export interface LessonProgress {
  accuracy: number;
  wpm: number;
  completed: boolean;
  timestamp: number;
  attempts: string[]; // Array of attempt IDs
}