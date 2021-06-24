import shortid from 'shortid';
import {
  ILog,
  IQuizDefaultSettings,
  TQuestionFull,
  TQuestionPartial,
  TSelectionQuestionPartial
} from '../types';
import {
  generateInputQuestionAnswers,
  generateSelectionQuestionAnswers,
  isPrimitive
} from './';

function setObjectValues(parent: any, arr: [string, any][]) {
  arr.forEach((entry) => {
    parent[entry[0]] = parent[entry[0]] ?? entry[1];
  });
}

export function generateCompleteQuestion(
  question: TQuestionPartial,
  contexts: string[],
  defaultSettings: Partial<IQuizDefaultSettings>
) {
  const logs: ILog = { warns: [], errors: [] };

  const completeQuestion: TQuestionFull = JSON.parse(JSON.stringify(question));

  (['question', 'answers'] as const).forEach((field) => {
    completeQuestion[field] ??
      logs.errors.push(`Question ${field} is required`);
  });

  if (completeQuestion.options) {
    completeQuestion.options = completeQuestion.options.map((option, i) => ({
      text: option.toString().trim(),
      index: `${i}`
    }));
  }

  let time_allocated = defaultSettings.time_allocated ?? 60;

  const dummyQuestion: any = completeQuestion;

  // Auto generation of Question Configs
  if (logs.errors.length === 0) {
    // Auto infer question type
    if (
      isPrimitive(completeQuestion.answers) ||
      Object.getPrototypeOf(completeQuestion.answers) === Object.prototype ||
      completeQuestion.answers.length === 1
    )
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
            parseInt(dummyQuestion.answers[0].text.trim()) < 0 ||
            parseInt(dummyQuestion.answers[0].text.trim()) >
              dummyQuestion.options.length - 1
          )
            logs.errors.push(
              `MCQ Answer must be within 0-${
                dummyQuestion.options.length - 1
              }, provided ${dummyQuestion.answers[0].text.trim()}`
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
              parseInt(answer.text.trim()) < 0 ||
              parseInt(answer.text.trim()) > dummyQuestion.options.length - 1
            )
              logs.errors.push(
                `MS Answer must be within 0-${
                  dummyQuestion.options.length - 1
                }, provided ${answer.text.trim()}`
              );
          });
        }
        time_allocated = 30;

        break;
      case 'Snippet': {
        const [
          generatedInputQuestionAnswers,
          generatedLogs
        ] = generateInputQuestionAnswers(question.answers);
        completeQuestion.answers = generatedInputQuestionAnswers;
        logs.errors.concat(generatedLogs.errors);
        logs.warns.concat(generatedLogs.warns);
        time_allocated = 45;
        break;
      }

      case 'FIB': {
        const [
          generatedInputQuestionAnswers,
          generatedLogs
        ] = generateInputQuestionAnswers(question.answers);
        completeQuestion.answers = generatedInputQuestionAnswers;
        logs.errors.concat(generatedLogs.errors);
        logs.warns.concat(generatedLogs.warns);
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
        completeQuestion.format = completeQuestion.format ?? 'text';
        break;
      }
    }
    setObjectValues(completeQuestion, [
      ['image', null],
      ['weight', defaultSettings.weight ?? 1],
      ['difficulty', defaultSettings.difficulty ?? 'Beginner'],
      ['explanation', 'No explanation available'],
      ['hints', []],
      ['time_allocated', defaultSettings.time_allocated ?? time_allocated],
      [
        'contexts',
        typeof defaultSettings.contexts === 'number'
          ? [defaultSettings.contexts]
          : Array.isArray(defaultSettings.contexts)
          ? defaultSettings.contexts
          : []
      ]
    ]);

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

    if (typeof completeQuestion.contexts === 'number')
      completeQuestion.contexts = [completeQuestion.contexts];
    else if (
      completeQuestion.contexts === undefined ||
      completeQuestion.contexts === null
    )
      completeQuestion.contexts = [];

    completeQuestion.contexts = completeQuestion.contexts.filter((context) => {
      if (context < 0 || context > contexts.length) {
        logs.warns.push(
          `Question referred a context ${context} that is not within the range 0-${
            contexts.length - 1
          }. Removing it.`
        );
        return false;
      }
      return true;
    });
  }
  return [completeQuestion, logs] as const;
}
