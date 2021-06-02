import { IResult } from '../types';
import { QUIZ_1 } from './quizzes';

export const RESULT_1: IResult = {
  question: QUIZ_1.questions[0],
  user_answers: ['0', '1'],
  hints_used: 1,
  score: 1,
  time_taken: 20,
  verdict: true
};

export const RESULT_2: IResult = {
  question: QUIZ_1.questions[1],
  user_answers: [],
  hints_used: 2,
  score: 0.65,
  time_taken: 50,
  verdict: false
};
