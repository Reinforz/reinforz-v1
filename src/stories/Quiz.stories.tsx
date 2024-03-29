import { Meta, Story } from '@storybook/react';
import App from '../App';
import Quiz from "../pages/Quiz/Quiz";
import "../pages/Quiz/Quiz.scss";
import { Root } from '../Root';
import { IFibQuestionFull, IGlobalSettingsPresetConfig, IMcqQuestionFull, IMsQuestion, IPlaySettingsPresetConfig, IQuiz, ISnippetQuestionFull, QuizIdentifiers, TQuestion } from '../types';
import { generateDefaultPlaySettingsState, generateDefaultSettingsState } from '../utils';

const quiz_identifiers: QuizIdentifiers = {
  subject: "Subject 1",
  topic: "Topic 1",
  _id: "xwqAZRp2X",
}

const snippetQuestions: ISnippetQuestionFull[] = [
  {
    image: 'https://miro.medium.com/max/480/1*7LOWVelUHYS1iqeX34Whzg.png',
    question: "Question 1\n```js\nconst a = 123;\nconsole.log(123);\n```\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Adipiscing elit pellentesque habitant morbi tristique. Odio ut sem nulla pharetra. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Nisl suscipit adipiscing bibendum est ultricies integer. Aliquam malesuada bibendum arcu vitae elementum curabitur. Egestas quis ipsum suspendisse ultrices gravida. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Est ullamcorper eget nulla facilisi etiam. Nisi vitae suscipit tellus mauris a diam. Sed lectus vestibulum mattis ullamcorper velit. Semper auctor neque vitae tempus quam pellentesque nec. Vestibulum mattis ullamcorper velit sed ullamcorper. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Etiam sit amet nisl purus in mollis nunc sed id. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Amet tellus cras adipiscing enim eu turpis egestas pretium. Aenean euismod elementum nisi quis.",
    answers: [
      [
        {
          text: "answer1.alternate1",
          modifiers: [
            'IS'
          ],
          regex: null,
          explanation: '**Explanation for answer 1 alternate 1**',
        },
        {
          text: "answer1.alternate2",
          modifiers: [],
          regex: {
            flags: 'gi',
            regex: 'answer'
          },
          explanation: 'Explanation for answer 1 alternate 2',
        }
      ]
    ],
    options: null,
    type: "Snippet",
    weight: 1,
    difficulty: "Beginner",
    hints: [
      'Answer 1 Hint 1',
      'Answer 1 Hint 2',
      'Answer 2 Hint 1\n```js\nconst a = 123;\nconsole.log(a);\nfor(let i = 0; i<= 10;i++){\n\tconsole.log(i);\n}\n```\n'
    ],
    time_allocated: 45,
    _id: "3MS238S1ED",
    quiz: "xwqAZRp2X",
    contexts: []
  }
]

const fibQuestions: Record<'text' | 'code', IFibQuestionFull[]> = {
  code: [{
    image: 'https://raw.githubusercontent.com/alDuncanson/react-hooks-snippets/master/icon.png',
    question: [
      "**Hello World**\n```js\nconsole.",
      '("Hello, World");\nconst [state, setState] = ',
      '(false);',
      '\n```\n'
    ],
    answers: [
      [
        {
          text: "log",
          modifiers: [],
          regex: null,
          explanation: null,
        }
      ],
      [
        {
          text: "useState",
          modifiers: [],
          regex: null,
          explanation: null,
        }
      ]
    ],
    format: 'code',
    hints: [],
    options: null,
    type: "FIB",
    weight: 1,
    difficulty: "Beginner",
    time_allocated: 45,
    _id: "3MS238S1EC",
    quiz: "xwqAZRp2X",
    contexts: []
  }],
  text: [{
    image: null,
    question: [
      "Question Chunk 1",
      "Question Chunk 2",
      "Question Chunk 3"
    ],
    answers: [
      [
        {
          text: "answer1.alternate1",
          modifiers: [
            'IS'
          ],
          regex: null,
          explanation: '**Explanation for answer 1 alternate 1**',
        },
        {
          text: "answer1.alternate2",
          modifiers: [],
          regex: {
            flags: 'gi',
            regex: 'answer'
          },
          explanation: 'Explanation for answer 1 alternate 2',
        }
      ],
      [
        {
          text: "answer2.alternate1",
          modifiers: [
            'IC'
          ],
          regex: {
            flags: 'i',
            regex: 'answers'
          },
          explanation: 'Explanation for answer 2 alternate 1\n```js\nconst a = 123;\n```\n',
        }
      ]
    ],
    hints: [],
    options: null,
    format: 'text',
    type: "FIB",
    weight: 1,
    difficulty: "Beginner",
    time_allocated: 45,
    _id: "3MS238S1EE",
    quiz: "xwqAZRp2X",
    contexts: []
  }]
}

const msQuestions: IMsQuestion[] = [{
  image: 'https://miro.medium.com/max/480/1*7LOWVelUHYS1iqeX34Whzg.png',
  question: "Question 2\n* List item 1\n* List item 2",
  options: [
    {
      text: "question2.option1",
      index: "0",
    },
    {
      text: "question2.option2",
      index: "1",
    },
    {
      text: "```js\nawait client.setAsync('hello','world');\n```\n",
      index: "2",
    },
    {
      text: "question2.option4",
      index: "3",
    },
    {
      text: "question2.option5",
      index: "4",
    },
    {
      text: "question2.option6",
      index: "5",
    }
  ],
  hints: [
    'Hint 1',
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  ],
  answers: [
    {
      text: "0",
      explanation: "Pushes an element to the left of the list"
    },
    {
      text: "1",
      explanation: "Trim the list within an index range"
    }
  ],
  type: "MS",
  weight: 1,
  difficulty: "Beginner",
  time_allocated: 30,
  _id: "iERo0WherK",
  quiz: "xwqAZRp2X",
  contexts: []
}];

const mcqQuestions: IMcqQuestionFull[] = [{
  image: 'https://miro.medium.com/max/480/1*7LOWVelUHYS1iqeX34Whzg.png',
  question: "Mcq Question 1",
  options: [
    {
      text: "question2.option1",
      index: "0",
    },
    {
      text: "question2.option2",
      index: "1",
    },
    {
      text: "question2.option3",
      index: "2",
    }
  ],
  hints: [
    'Hint 1',
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  ],
  answers: [
    {
      text: "0",
      explanation: "Pushes an element to the left of the list"
    }
  ],
  type: "MCQ",
  weight: 5,
  difficulty: "Intermediate",
  time_allocated: 25,
  _id: "iERo0Wherj",
  quiz: "xwqAZRp2X",
  contexts: []
}];

export default {
  title: 'Components/Quiz',
  component: Quiz,
} as Meta;

const NoTimerQuestionTemplate: Story<{ question: TQuestion }> = (args) => {
  const quiz: IQuiz = {
    ...quiz_identifiers,
    contexts: [],
    default: {},
    questions: [args.question]
  }

  const playSettings = generateDefaultPlaySettingsState();
  const playSettingsPresets: IPlaySettingsPresetConfig = {
    current: 'no_timer',
    presets: [
      {
        data: playSettings,
        id: 'default',
        name: "Default"
      },
      {
        data: { filters: playSettings.filters, options: { ...playSettings.options, disable_timer: true } },
        id: 'no_timer',
        name: "No Timer"
      }
    ]
  };

  const settings = generateDefaultSettingsState();
  const settingsPresets: IGlobalSettingsPresetConfig = {
    current: 'polar_night',
    presets: [
      {
        data: settings,
        id: 'default',
        name: 'Default'
      },
      {
        data: { ...settings, theme: 'polar_night' },
        id: 'polar_night',
        name: 'Polar Night'
      }
    ]
  }

  return <Root playQuizzes={{
    selected: [quiz],
    filtered: [quiz]
  }} playQuestions={{
    array: [args.question],
    map: new Map([[args.question._id, args.question]])
  }} playing={true} uploadedQuizzes={[quiz]} selectedQuizzes={[quiz]} settingsPresets={settingsPresets} playSettingsPresets={playSettingsPresets} selectedQuizIds={[quiz._id]} >
    <App>
      <Quiz />
    </App>
  </Root>
};

export const NoTimerMultiSelectQuestion = NoTimerQuestionTemplate.bind({});
NoTimerMultiSelectQuestion.args = {
  question: msQuestions[0]
}

export const NoTimerMultiChoiceQuestion = NoTimerQuestionTemplate.bind({});
NoTimerMultiChoiceQuestion.args = {
  question: mcqQuestions[0]
}

export const NoTimerSnippetQuestion = NoTimerQuestionTemplate.bind({});
NoTimerSnippetQuestion.args = {
  question: snippetQuestions[0]
}

export const NoTimerCodeFormatFibQuestion = NoTimerQuestionTemplate.bind({});
NoTimerCodeFormatFibQuestion.args = {
  question: fibQuestions.code[0]
}

export const NoTimerTextFormatFibQuestion = NoTimerQuestionTemplate.bind({});
NoTimerTextFormatFibQuestion.args = {
  question: fibQuestions.text[0]
}