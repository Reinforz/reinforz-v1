import { TQuizSortBy } from '../types';

export function generateSortHavingItems(quizSortBy: TQuizSortBy) {
  switch (quizSortBy) {
    case 'Difficulty': {
      return ['Beginner', 'Intermediate', 'Advanced'];
    }
    case 'Question Types': {
      return ['MS', 'MCQ', 'FIB', 'Snippet'];
    }
    case 'Time Allocated': {
      return ['15', '30', '45', '60', '75', '90', '105', '120'];
    }
  }
}
