import { IQuizFull, IResult, TQuestionFull } from '../types';

export function generateQuizzesFromResults(
  filteredResults: IResult[],
  allQuestionsMap: Map<string, TQuestionFull>
) {
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
        questions: [clonedTargetQuestion]
      });
    else filteredQuiz.questions.push(clonedTargetQuestion);
  });

  return filteredQuizzes;
}
