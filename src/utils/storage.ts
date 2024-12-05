import { Attempt } from '../types/Attempt';
import { LessonProgress } from '../types/Lesson';

const STORAGE_KEYS = {
  ATTEMPTS: 'typing-practice-attempts',
  PROGRESS: 'typing-practice-progress'
} as const;

export function saveAttempts(attempts: Attempt[]): void {
  try {
    const existingAttempts = loadAttempts();
    const uniqueAttempts = mergeAttempts(existingAttempts, attempts);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(uniqueAttempts));
  } catch (error) {
    console.error('Error saving attempts:', error);
  }
}

export function loadAttempts(): Attempt[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading attempts:', error);
    return [];
  }
}

export function saveProgress(progress: Record<string, LessonProgress>): void {
  try {
    const existingProgress = loadProgress();
    const mergedProgress = {
      ...existingProgress,
      ...progress
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(mergedProgress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function loadProgress(): Record<string, LessonProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
}

// Helper function to merge attempts while preventing duplicates
function mergeAttempts(existing: Attempt[], newAttempts: Attempt[]): Attempt[] {
  const attemptMap = new Map<string, Attempt>();
  
  // Add existing attempts to map
  existing.forEach(attempt => {
    attemptMap.set(attempt.id, attempt);
  });
  
  // Add or update with new attempts
  newAttempts.forEach(attempt => {
    attemptMap.set(attempt.id, attempt);
  });
  
  // Convert map back to array and sort by timestamp (newest first)
  return Array.from(attemptMap.values())
    .sort((a, b) => b.timestamp - a.timestamp);
}