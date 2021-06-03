import { TQuestionFull, TResultQuestion } from '../types';

export function transformResultQuestionToRegularQuestion(
  question: TResultQuestion
) {
  if (question.type === 'MS' || question.type === 'MCQ') {
    question.options.forEach((option: any) => {
      delete option.isCorrect;
      delete option.userSelected;
    });
  } else if (question.type === 'Snippet' || question.type === 'FIB') {
    question.answers.forEach((answers) => {
      answers.forEach((answer: any) => {
        delete answer.isCorrect;
      });
    });
  }
  return question as TQuestionFull;
}
