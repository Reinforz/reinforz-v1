import {
  IFibQuestionFull,
  IMsQuestionFull,
  IResult,
  IResultInputQuestion,
  IResultSelectionQuestion
} from '../types';
import { QUIZ_1 } from './quizzes';

const quiz1 = QUIZ_1.questions[0] as IMsQuestionFull,
  quiz2 = QUIZ_1.questions[1] as IFibQuestionFull;

export const RESULT_1: IResult = {
  question: {
    ...quiz1,
    options: quiz1.options.map((option, index) => ({
      ...option,
      isCorrect: [0, 1].includes(index),
      userSelected: [0, 1].includes(index)
    })) as IResultSelectionQuestion['options']
  },
  user_answers: ['0', '1'],
  hints_used: 1,
  score: 1,
  time_taken: 20,
  verdict: true
};

export const RESULT_2: IResult = {
  question: {
    ...quiz2,
    answers: quiz2.answers.map((answers, index) =>
      answers.map((answer, _index) => ({
        ...answer,
        userInput:
          index === 0 && _index === 0
            ? 'answer 1'
            : index === 1 && _index === 0
            ? 'answer 2'
            : null
      }))
    ) as IResultInputQuestion['answers']
  },
  user_answers: ['answer 1', 'answer 2'],
  hints_used: 2,
  score: 0.65,
  time_taken: 50,
  verdict: false
};
