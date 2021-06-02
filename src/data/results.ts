import {
  IFibQuestionFull,
  IMsQuestionFull,
  IResult,
  IResultInputQuestion,
  IResultSelectionQuestion
} from '../types';
import { QUIZ_1 } from './quizzes';

const question1 = QUIZ_1.questions[0] as IMsQuestionFull,
  question2 = QUIZ_1.questions[1] as IFibQuestionFull;

export const RESULT_1: IResult = {
  question: {
    ...question1,
    options: question1.options.map((option, index) => ({
      ...option,
      isCorrect: [0, 1].includes(index),
      userSelected: [0, 2].includes(index)
    })) as IResultSelectionQuestion['options']
  },
  user_answers: ['0', '2'],
  hints_used: 1,
  score: 1,
  time_taken: 20,
  verdict: true,
  _id: 'result_1'
};

export const RESULT_2: IResult = {
  question: {
    ...question2,
    answers: question2.answers.map((answers, index) =>
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
  verdict: false,
  _id: 'result_2'
};
