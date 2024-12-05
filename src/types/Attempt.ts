export interface Attempt {
  id: string;
  lessonId: string;
  timestamp: number;
  accuracy: number;
  wpm: number;
  completed: boolean;
  duration: number; // in seconds
}

export interface AttemptStats {
  totalAttempts: number;
  averageAccuracy: number;
  averageWpm: number;
  bestWpm: number;
  bestAccuracy: number;
}