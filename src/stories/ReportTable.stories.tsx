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
      question: "Which command is used to find the cardinality of a list ?",
      answers: [
        [
          {
            text: "llen",
            modifiers: [],
            regex: null,
            explanation: 'Length of the list is also known as the cardinality of the list',
            isCorrect: true
          }
        ]
      ],
      options: null,
      type: "Snippet",
      image: null,
      weight: 1,
      difficulty: "Beginner",
      hints: [],
      time_allocated: 45,
      _id: "3MS238S1EC",
      quiz: {
        subject: "Redis",
        topic: "Cardinality & Capped Collections",
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
      "llen"
    ]
  },
  {
    question: {
      question: "Which commands are used to keep a capped list ?",
      options: [
        {
          text: "`lpush`",
          index: "0",
          isCorrect: true,
          userSelected: true
        },
        {
          text: "`ltrim`",
          index: "1",
          isCorrect: true,
          userSelected: true
        },
        {
          text: "`rpush`",
          index: "2",
          isCorrect: false,
          userSelected: false
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
        subject: "Redis",
        topic: "Cardinality & Capped Collections",
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