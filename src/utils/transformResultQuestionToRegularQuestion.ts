import {
  TQuestion,
  TQuestionResult, TypeQuestionAnswerDetailed
} from '../types';

export function transformResultQuestionToRegularQuestion(
  question: TQuestionResult
) {
  if (question.type === 'MS' || question.type === 'MCQ') {
    question.options.forEach((option: any) => {
      delete option.isCorrect;
      delete option.userSelected;
    });
  } else {
    (question.answers as TypeQuestionAnswerDetailed[][]).forEach((answers) => {
      answers.forEach((answer: any) => {
        delete answer.isCorrect;
      });
    });
  }
  return question as TQuestion;
}
