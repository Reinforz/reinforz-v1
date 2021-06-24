import shortid from 'shortid';
import { IErrorLog, IQuizFull, IQuizPartial, TQuestionFull } from '../types';
import { generateCompleteQuestion } from './';

function generateLogMessage(
  quiz: IQuizPartial,
  target: string,
  message: string,
  level: 'WARN' | 'ERROR'
) {
  return {
    _id: shortid(),
    level,
    quiz: `${quiz.subject} - ${quiz.topic}`,
    target,
    message,
    quiz_id: quiz._id as string
  } as IErrorLog;
}

export function filterUploadedQuizzes(quizzes: IQuizPartial[]) {
  const logMessages: IErrorLog[] = [];
  const filteredUploadedQuizzes: IQuizFull[] = [];
  quizzes.forEach((quiz, quizIndex) => {
    const quizId = shortid();
    quiz._id = quizId;
    quiz.default = quiz.default ?? {};
    quiz.contexts = quiz.contexts ?? [];
    if (quiz.topic && quiz.subject && quiz.questions.length > 0) {
      const filteredQuestions: TQuestionFull[] = [];
      quiz.questions.forEach((question, questionIndex) => {
        try {
          const [generatedQuestion, logs] = generateCompleteQuestion(
            question,
            quiz.contexts!,
            quiz.default!
          );
          if (logs.errors.length === 0) {
            generatedQuestion.quiz = {
              subject: quiz.subject,
              topic: quiz.topic,
              _id: quizId
            };
          }
          logMessages.push(
            ...logs.warns.map((warn) =>
              generateLogMessage(
                quiz,
                `Question ${questionIndex + 1}`,
                warn,
                'WARN'
              )
            )
          );
          logMessages.push(
            ...logs.errors.map((error) =>
              generateLogMessage(
                quiz,
                `Question ${questionIndex + 1}`,
                error,
                'ERROR'
              )
            )
          );
          if (logs.errors.length === 0)
            filteredQuestions.push(generatedQuestion);
        } catch (err: any) {
          logMessages.push(
            generateLogMessage(
              quiz,
              `Question ${questionIndex + 1}`,
              err.message,
              'ERROR'
            )
          );
        }
      });
      quiz.questions = filteredQuestions as any;
      filteredUploadedQuizzes.push(JSON.parse(JSON.stringify(quiz)));
    }

    if (!quiz.topic)
      logMessages.push(
        generateLogMessage(
          quiz,
          `Quiz ${quizIndex + 1}`,
          'Quiz topic absent',
          'ERROR'
        )
      );
    if (!quiz.subject)
      logMessages.push(
        generateLogMessage(
          quiz,
          `Quiz ${quizIndex + 1}`,
          'Quiz subject absent',
          'ERROR'
        )
      );
    if (!quiz.questions || quiz.questions.length <= 0)
      logMessages.push(
        generateLogMessage(
          quiz,
          `Quiz ${quizIndex + 1}`,
          'Quiz must have at least 1 question',
          'ERROR'
        )
      );
  });

  return [logMessages, filteredUploadedQuizzes] as const;
}
