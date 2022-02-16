import shortid from 'shortid';
import { IErrorLog, InputQuiz, IQuiz, TQuestion } from '../types';
import { generateCompleteQuestion } from './generateCompleteQuestion';

function generateLogMessage(
  quiz: InputQuiz,
  target: string,
  message: string,
  level: 'WARN' | 'ERROR'
): IErrorLog {
  return {
    _id: shortid(),
    level,
    quiz: `${quiz.subject} - ${quiz.topic}`,
    target,
    message,
    quiz_id: quiz._id as string
  };
}

/**
 * Filter uploaded quizzes to only contain valid questions
 * @param quizzes Input quizzes to filter questions from
 * @returns A tuple of [logs messages, array of quizzes convert to complete quiz (without invalid questions)]
 */
export function filterUploadedQuizzes(quizzes: InputQuiz[]) {
  const logMessages: IErrorLog[] = [];
  const filteredUploadedQuizzes: IQuiz[] = [];
  quizzes.forEach((quiz, quizIndex) => {
    // Generate quiz id
    const quizId = shortid();
    quiz._id = quizId;
    // Default configuration for quiz
    quiz.default = quiz.default ?? {};
    // Default context for a quiz
    quiz.contexts = quiz.contexts ?? [];
    // If quiz has a topic, subject and number of questions is greater than 0
    if (quiz.topic && quiz.subject && quiz.questions.length > 0) {
      // A array to keep track of questions without errors
      const filteredQuestions: TQuestion[] = [];
      quiz.questions.forEach((question, questionIndex) => {
        try {
          const [generatedQuestion, logs] = generateCompleteQuestion(
            question,
            quiz.contexts!,
            quiz.default!
          );
          // If there are no errors
          if (logs.errors.length === 0) {
            // Attach the quiz id to the question
            // This is important to keep track of which question belongs to which quiz
            // When the user chooses flatten mix
            generatedQuestion.quiz = quizId;
            filteredQuestions.push(generatedQuestion);
          }
          // Push the warning messages
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
          // Push the error messages
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
        } catch (err: any) {
          // If there was any unexpected error which converting
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
      // Create a deep clone of quiz 
      filteredUploadedQuizzes.push(JSON.parse(JSON.stringify(quiz)));
    }

    // Generate error appropriate messages for missing fields
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
