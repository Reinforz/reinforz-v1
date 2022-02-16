import { ISelectQuestionResult, TSelectQuestion } from '../types';

export function transformReportSelectionQuestion(
  question: TSelectQuestion,
  userAnswers: string[]
) {
  userAnswers.forEach((userAnswer, index) => {
    userAnswers[index] = question.options[parseInt(userAnswer)].index;
  });
  const sortedOptions: ISelectQuestionResult['options'] = question.options.sort(
    (optionA, optionB) =>
      parseInt(optionA.index) > parseInt(optionB.index) ? 1 : -1
  ) as any;
  const correctAnswers = question.answers.map((answer) => answer.text);
  sortedOptions.forEach((sortedOption, index) => {
    sortedOption.isCorrect = correctAnswers.includes(index.toString());
    sortedOption.userSelected = userAnswers.includes(index.toString());
  });
  question.options = sortedOptions;
  return question as ISelectQuestionResult;
}
