import { IQuestionResult, IQuiz, TQuestion } from '../types';

export function generateQuizzesFromResults(
  quizzes: Record<string, Omit<IQuiz, 'questions'>>,
  filteredResults: IQuestionResult[],
  allQuestionsMap: Map<string, TQuestion>
) {
  const filteredQuizzes: Map<string, IQuiz> = new Map();
  filteredResults.forEach((filteredResult) => {
    const targetQuestion = allQuestionsMap.get(filteredResult.question._id)!;
    const clonedTargetQuestion = JSON.parse(
      JSON.stringify(targetQuestion)
    ) as TQuestion;
    const filteredQuiz = filteredQuizzes.get(targetQuestion.quiz);
    if (!filteredQuiz)
      filteredQuizzes.set(targetQuestion.quiz, {
        ...quizzes[targetQuestion.quiz],
        questions: [clonedTargetQuestion]
      });
    else filteredQuiz.questions.push(clonedTargetQuestion);
  });

  return filteredQuizzes;
}
