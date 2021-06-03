import {
  IInputQuestionAnswerFull,
  TQuestionFull,
  TResultQuestion
} from '../types';

export function transformResultQuestionToRegularQuestion(
  question: TResultQuestion
) {
  if (question.type === 'MS' || question.type === 'MCQ') {
    question.options.forEach((option: any) => {
      delete option.isCorrect;
      delete option.userSelected;
    });
  } else {
    (question.answers as IInputQuestionAnswerFull[][]).forEach((answers) => {
      answers.forEach((answer: any) => {
        delete answer.isCorrect;
      });
    });
  }
  return question as TQuestionFull;
}
