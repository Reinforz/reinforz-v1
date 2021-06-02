import shortid from 'shortid';
import {
  TQuestionFull,
  TQuestionPartial,
  TSelectionQuestionPartial
} from '../types';
import {
  generateInputQuestionAnswers,
  generateSelectionQuestionAnswers
} from './';

function setObjectValues(parent: any, arr: [string, any][]) {
  arr.forEach((entry) => {
    parent[entry[0]] = parent[entry[0]] ?? entry[1];
  });
}

export function generateCompleteQuestion(question: TQuestionPartial) {
  const logs: { warns: string[]; errors: string[] } = { warns: [], errors: [] };

  const completeQuestion: TQuestionFull = JSON.parse(JSON.stringify(question));

  (['question', 'answers'] as const).forEach((field) => {
    completeQuestion[field] ??
      logs.errors.push(`Question ${field} is required`);
  });

  if (completeQuestion.options) {
    completeQuestion.options = completeQuestion.options.map((option, i) => ({
      text: option.toString(),
      index: `${i}`
    }));
  }

  let time_allocated = 15;

  setObjectValues(completeQuestion, [
    ['image', null],
    ['weight', 1],
    ['difficulty', 'Beginner'],
    ['explanation', 'No explanation available'],
    ['hints', []]
  ]);

  const dummyQuestion: any = completeQuestion;

  // Auto generation of Question Configs
  if (logs.errors.length === 0) {
    // Auto infer question type
    if (completeQuestion.answers.length === 1)
      completeQuestion.type =
        completeQuestion.type || (dummyQuestion.options ? 'MCQ' : 'Snippet');
    else
      completeQuestion.type =
        completeQuestion.type || (dummyQuestion.options ? 'MS' : 'FIB');

    switch (completeQuestion.type) {
      case 'MCQ':
        // Convert all the answers to string
        completeQuestion.answers = generateSelectionQuestionAnswers(
          (question as TSelectionQuestionPartial).answers
        );
        time_allocated = 15;
        // If there are no options for MCQ question, add an error
        if (!dummyQuestion.options)
          logs.errors.push(
            `Options must be provided for ${dummyQuestion.type} questions`
          );
        else {
          // If the answer index is greater than total options, or negative add an error
          if (
            parseInt(dummyQuestion.answers[0].text) < 0 ||
            parseInt(dummyQuestion.answers[0].text) >
              dummyQuestion.options.length - 1
          )
            logs.errors.push(
              `MCQ Answer must be within 0-${
                dummyQuestion.options.length - 1
              }, provided ${dummyQuestion.answers[0].text}`
            );

          if (
            dummyQuestion.options.length < 2 ||
            dummyQuestion.options.length > 6
          )
            logs.errors.push(
              `Question must have 2-6 options, but given ${dummyQuestion.options.length}`
            );
        }
        break;
      case 'MS':
        completeQuestion.answers = generateSelectionQuestionAnswers(
          (question as TSelectionQuestionPartial).answers
        );
        if (!dummyQuestion.options)
          logs.errors.push(
            `Options must be provided for ${dummyQuestion.type} questions`
          );
        else {
          if (
            dummyQuestion.options.length < 2 ||
            dummyQuestion.options.length > 6
          )
            logs.errors.push(
              `Question must have 2-6 options, but given ${dummyQuestion.options.length}`
            );

          // If more answers are given than options
          if (dummyQuestion.answers.length > dummyQuestion.options.length) {
            logs.errors.push(
              `Provided more answers than options, given ${dummyQuestion.options.length} options, but provided ${dummyQuestion.answers.length} answers`
            );
          }
          completeQuestion.answers.forEach((answer) => {
            if (
              parseInt(answer.text) < 0 ||
              parseInt(answer.text) > dummyQuestion.options.length - 1
            )
              logs.errors.push(
                `MS Answer must be within 0-${
                  dummyQuestion.options.length - 1
                }, provided ${answer.text}`
              );
          });
        }
        time_allocated = 30;

        break;
      case 'Snippet':
        completeQuestion.answers = generateInputQuestionAnswers(
          question.answers
        );
        time_allocated = 45;
        break;
      case 'FIB':
        completeQuestion.answers = generateInputQuestionAnswers(
          question.answers
        );
        if (
          completeQuestion.answers.length + 1 !==
          completeQuestion.question.length
        ) {
          logs.errors.push(
            `Unmatched blanks in question, given ${
              completeQuestion.answers.length
            }, required ${completeQuestion.question.length - 1}`
          );
        }
        time_allocated = 60;
        break;
    }
    completeQuestion.time_allocated =
      completeQuestion.time_allocated ?? time_allocated;
    completeQuestion._id = shortid();

    if (
      completeQuestion.time_allocated < 10 ||
      completeQuestion.time_allocated > 120
    ) {
      logs.warns.push(
        `Question time allocated must be within 10-120 but given ${completeQuestion.time_allocated}, changing to 60`
      );
      completeQuestion.time_allocated = 60;
    }

    if (dummyQuestion.weight < 0 || dummyQuestion.weight > 1) {
      logs.warns.push(
        `Question weights must be within 0-1 but given ${completeQuestion.weight}, changing to 0`
      );
      completeQuestion.weight = 0;
    }

    if (
      !['Beginner', 'Intermediate', 'Advanced'].includes(
        completeQuestion.difficulty
      )
    ) {
      logs.warns.push(
        `Question difficulty must be one of Beginner, Intermediate or Advanced, but given ${completeQuestion.difficulty}, changing to Beginner`
      );
      completeQuestion.difficulty = 'Beginner';
    }
  }
  return [completeQuestion, logs] as const;
}
