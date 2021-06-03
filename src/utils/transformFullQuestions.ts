import { TQuestionFull } from '../types';

export function transformFullQuestions(questions: TQuestionFull[]) {
  return questions.map((question) => {
    const clonedQuestion = JSON.parse(JSON.stringify(question));
    delete clonedQuestion.quiz;
    if (question.type === 'MS' || question.type === 'MCQ') {
      clonedQuestion.options = question.options
        .sort((optionA, optionB) =>
          parseInt(optionA.index) > parseInt(optionB.index) ? 1 : -1
        )
        .map((option) => option.text);
    }
    return clonedQuestion as TQuestionFull;
  });
}
