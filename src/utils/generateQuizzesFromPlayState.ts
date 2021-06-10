import { IPlayDownloadedState, IQuizFull, TQuestionFull } from '../types';

export function generateQuizzesFromPlayState(
  playDownloadState: IPlayDownloadedState,
  allQuestionsMap: Map<string, TQuestionFull>
) {
  const quizzes: Map<string, IQuizFull> = new Map();
  playDownloadState.questions.forEach((question) => {
    const targetQuestion = allQuestionsMap.get(question._id)!;
    const filteredQuiz = quizzes.get(targetQuestion.quiz._id);
    if (!filteredQuiz)
      quizzes.set(targetQuestion.quiz._id, {
        ...targetQuestion.quiz,
        questions: [targetQuestion]
      });
    else filteredQuiz.questions.push(targetQuestion);
  });

  return quizzes;
}
