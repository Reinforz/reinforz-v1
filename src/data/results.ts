import { TQuestionResult } from '../types';

export const RESULT_1: TQuestionResult = {
  question: ['git', '-b', ''],
  answers: [
    [
      {
        text: 'checkout',
        regex: null,
        modifiers: []
      }
    ],
    [
      {
        text: 'main',
        regex: null,
        modifiers: []
      }
    ]
  ],
  hints: [
    'Hint **1**\n## Heading\n## Hello World\n## Hello World\nHello World\nHello World\nHello World',
    'Hint 2',
    'Hint 3'
  ],
  options: null,
  explanation: '* List item 1\n* List item 2\n',
  image:
    'https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png',
  weight: 1,
  difficulty: 'Beginner',
  type: 'FIB',
  time_allocated: 120,
  _id: 'ln5zMGBRPU',
  quiz: {
    subject: 'Dart',
    title: 'Dart Basic Types',
    _id: '-QIv_LbJl'
  },
  user_answers: [],
  hints_used: 1,
  question_id: 'ln5zMGBRPU',
  score: 1,
  time_taken: 20,
  verdict: true
};
