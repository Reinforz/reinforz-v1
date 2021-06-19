import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { ReportContext } from "../context/ReportContext";
import { ReportTable } from "../pages/Report/ReportTable/ReportTable";
import "../pages/Report/ReportTable/ReportTable.scss";
import { IReport, IResult } from '../types';
import { generateDefaultPlaySettingsState, generateDefaultReportSettingsState } from '../utils';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Pages/Report/ReportTable',
  component: ReportTable,
} as Meta;

const results: IResult[] = [
  {
    question: {
      image: 'https://miro.medium.com/max/480/1*7LOWVelUHYS1iqeX34Whzg.png',
      question: "Question 1\n```js\nconst a = 123;\n```\n",
      answers: [
        [
          {
            text: "answer1.alternate1",
            modifiers: [
              'IS'
            ],
            regex: null,
            explanation: '**Explanation for answer 1 alternate 1**',
            isCorrect: true
          },
          {
            text: "answer1.alternate2",
            modifiers: [],
            regex: {
              flags: 'gi',
              regex: 'answer'
            },
            explanation: 'Explanation for answer 1 alternate 2',
            isCorrect: false
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
            isCorrect: false
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
      _id: "3MS238S1EC",
      quiz: {
        subject: "Subject 1",
        topic: "Topic 1",
        _id: "xwqAZRp2X"
      }
    },
    verdict: true,
    score: {
      amount: 1,
      answers: 0.85,
      hints: 0.15,
      time: 0
    },
    _id: "XSWOuw2IV",
    time_taken: 0,
    hints_used: 0,
    user_answers: [
      "answer1.alternate1"
    ]
  },
  {
    question: {
      question: "Question 2\n* List item 1\n* List item 2",
      options: [
        {
          text: "question2.option1",
          index: "0",
          isCorrect: true,
          userSelected: true
        },
        {
          text: "question2.option2",
          index: "1",
          isCorrect: true,
          userSelected: false
        },
        {
          text: "```js\nawait client.setAsync('hello','world');\n```\n",
          index: "2",
          isCorrect: false,
          userSelected: true
        }
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
      image: null,
      weight: 1,
      difficulty: "Beginner",
      hints: [],
      time_allocated: 30,
      _id: "iERo0WherK",
      quiz: {
        subject: "Subject 1",
        topic: "Topic 1",
        _id: "xwqAZRp2X"
      }
    },
    verdict: true,
    score: {
      amount: 1,
      answers: 0.85,
      hints: 0.15,
      time: 0
    },
    _id: "xRLvsP0q-",
    time_taken: 0,
    hints_used: 0,
    user_answers: [
      "1",
      "2"
    ]
  },
]

const DefaultReportTableTemplate: Story = () => {
  const [report, setReport] = useState<IReport>({
    createdAt: Date.now(),
    results,
    settings: generateDefaultPlaySettingsState()
  });

  const sortedResults: IResult[] = report.results;
  const reportSettings = generateDefaultReportSettingsState();

  return <Wrapper>
    <ReportContext.Provider value={{ report, setReport, sortedResults, reportSettings } as any}>
      <div className="Report">
        <ReportTable />
      </div>
    </ReportContext.Provider>
  </Wrapper>
};

export const DefaultReportTable = DefaultReportTableTemplate.bind({});