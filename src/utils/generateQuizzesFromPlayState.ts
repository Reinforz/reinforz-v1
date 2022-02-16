import { IPlayDownloadedState, IQuiz, TQuestion } from '../types';

export function generateQuizzesFromPlayState(
  allQuizzesMap: Map<string, IQuiz>,
  playDownloadState: IPlayDownloadedState,
  allQuestionsMap: Map<string, TQuestion>
) {
  const quizzes: Map<string, IQuiz> = new Map();
  playDownloadState.questions.forEach((question) => {
    const targetQuestion = allQuestionsMap.get(question._id)!;
    const filteredQuiz = quizzes.get(targetQuestion.quiz);
    if (!filteredQuiz)
      quizzes.set(targetQuestion.quiz, {
        ...allQuizzesMap.get(targetQuestion.quiz)!,
        questions: [targetQuestion]
      });
    else filteredQuiz.questions.push(targetQuestion);
  });

  return quizzes;
}
