import {
    IFibQuestionFull,
    IMsQuestionFull,
    IQuestionResult,
    ISelectQuestionResult,
    TResultInputQuestion
} from '../../src/types';
import { QUIZ_1 } from './quizzes';

const question1 = QUIZ_1.questions[0] as IMsQuestionFull,
  question2 = QUIZ_1.questions[1] as IFibQuestionFull;

export const RESULT_1: IQuestionResult = {
  question: {
    ...question1,
    options: question1.options
      .sort((optionA, optionB) =>
        parseInt(optionA.index) > parseInt(optionB.index) ? 1 : -1
      )
      .map((option, index) => ({
        ...option,
        isCorrect: [0, 2].includes(index),
        userSelected: [0, 2].includes(index)
      })) as ISelectQuestionResult['options']
  },
  user_answers: ['0', '2'],
  hints_used: 1,
  score: {
    amount: 1,
    answers: 0.7,
    hints: 0.15,
    time: 0.15
  },
  time_taken: 20,
  verdict: true,
  _id: 'result_1'
};

export const RESULT_2: IQuestionResult = {
  question: {
    ...question2,
    answers: question2.answers.map((answers, index) =>
      answers.map((answer, _index) => ({
        ...answer,
        isCorrect: _index === 0
      }))
    ) as TResultInputQuestion['answers']
  },
  user_answers: ['answer 1', 'answer 2'],
  hints_used: 2,
  score: {
    amount: 1,
    answers: 0.45,
    hints: 0.1,
    time: 0.1
  },
  time_taken: 50,
  verdict: false,
  _id: 'result_2'
};
