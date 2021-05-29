import shortid from 'shortid';
import { IErrorLog, IQuizFull, IQuizPartial, TQuestionFull } from '../types';
import { generateCompleteQuestion } from './';

export function filterUploadedQuizzes(quizzes: IQuizPartial[]) {
  const logMessages: IErrorLog[] = [];
  const filteredUploadedQuizzes: IQuizFull[] = [];
  quizzes.forEach((quiz, quizIndex) => {
    if (quiz.topic && quiz.subject && quiz.questions.length > 0) {
      const quizId = shortid();
      quiz._id = quizId;
      const filteredQuestions: TQuestionFull[] = [];
      quiz.questions.forEach((question, questionIndex) => {
        const [generatedQuestion, logs] = generateCompleteQuestion(question);
        if (logs.errors.length === 0) {
          generatedQuestion.quiz = {
            subject: quiz.subject,
            topic: quiz.topic,
            _id: quizId
          };
        }
        logs.warns.forEach((warn) => {
          logMessages.push({
            _id: shortid(),
            level: 'WARN',
            quiz: `${quiz.subject} - ${quiz.topic}`,
            target: `Question ${questionIndex + 1}`,
            message: warn
          });
        });
        logs.errors.forEach((error) => {
          logMessages.push({
            _id: shortid(),
            level: 'ERROR',
            quiz: `${quiz.subject} - ${quiz.topic}`,
            target: `Question ${questionIndex + 1}`,
            message: error
          });
        });
        if (logs.errors.length === 0) filteredQuestions.push(generatedQuestion);
      });
      quiz.questions = filteredQuestions as any;
      filteredUploadedQuizzes.push(quiz as any);
    }

    if (!quiz.topic)
      logMessages.push({
        _id: shortid(),
        level: 'ERROR',
        quiz: `${quiz.subject} - ${quiz.topic}`,
        target: `Quiz ${quizIndex + 1}`,
        message: 'Quiz topic absent'
      });
    if (!quiz.subject)
      logMessages.push({
        _id: shortid(),
        level: 'ERROR',
        quiz: `${quiz.subject} - ${quiz.topic}`,
        target: `Quiz ${quizIndex + 1}`,
        message: 'Quiz subject absent'
      });
    if (!quiz.questions || quiz.questions.length <= 0)
      logMessages.push({
        _id: shortid(),
        level: 'ERROR',
        quiz: `${quiz.subject} - ${quiz.topic}`,
        target: `Quiz ${quizIndex + 1}`,
        message: 'Quiz must have at least 1 question'
      });
  });

  return [logMessages, filteredUploadedQuizzes] as const;
}
