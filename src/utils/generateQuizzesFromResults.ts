import { IQuizFull, IResult, TQuestionFull } from '../types';

export function generateQuizzesFromResults(
  filteredResults: IResult[],
  allQuestionsMap: Map<string, TQuestionFull>
) {
  // ?: recreate quiz using report rather than result, for getting contexts and default settings
  const filteredQuizzes: Map<string, IQuizFull> = new Map();
  filteredResults.forEach((filteredResult) => {
    const targetQuestion = allQuestionsMap.get(filteredResult.question._id)!;
    const clonedTargetQuestion = JSON.parse(
      JSON.stringify(targetQuestion)
    ) as TQuestionFull;
    const filteredQuiz = filteredQuizzes.get(targetQuestion.quiz._id);
    if (!filteredQuiz)
      filteredQuizzes.set(targetQuestion.quiz._id, {
        ...targetQuestion.quiz,
        questions: [clonedTargetQuestion],
        contexts: [],
        default: {}
      });
    else filteredQuiz.questions.push(clonedTargetQuestion);
  });

  return filteredQuizzes;
}
