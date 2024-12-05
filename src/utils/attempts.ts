import { Attempt, AttemptStats } from '../types/Attempt';

export function generateAttemptId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateAttemptStats(attempts: Attempt[]): AttemptStats {
  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageAccuracy: 0,
      averageWpm: 0,
      bestWpm: 0,
      bestAccuracy: 0,
    };
  }

  const totalAttempts = attempts.length;
  const averageAccuracy = attempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) / totalAttempts;
  const averageWpm = attempts.reduce((sum, attempt) => sum + attempt.wpm, 0) / totalAttempts;
  const bestWpm = Math.max(...attempts.map(attempt => attempt.wpm));
  const bestAccuracy = Math.max(...attempts.map(attempt => attempt.accuracy));

  return {
    totalAttempts,
    averageAccuracy: Math.round(averageAccuracy),
    averageWpm: Math.round(averageWpm),
    bestWpm,
    bestAccuracy,
  };
}