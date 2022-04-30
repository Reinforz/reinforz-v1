import shortid from 'shortid';
import { MAX_QUESTION_TIME, MIN_QUESTION_TIME } from '../constants';
import {
  ILog,
  IMcqQuestion,
  IMsQuestion, InputFibQuestion, InputSnippetQuestion, IQuizDefaultSettings, TInputQuestion, TInputSelectQuestion, TQuestion, TSelectQuestion
} from '../types';
import { extractBlankCountForFIBQuestion } from './extractBlankCountForFIBQuestion';
import { generateSelectionQuestionAnswers } from './generateSelectionQuestionAnswers';
import { generateTypeQuestionAnswers } from './generateTypeQuestionAnswers';
import { isPrimitive } from './isPrimitive';

/**
 * Updates the parent object to use the 2nd value in tuple if the value is undefined for a field in 1st value
 * @param parent Parent object
 * @param arr Array of tuple [parent object field, value]
 */
function setObjectValues(parent: any, arr: [string, any][]) {
  arr.forEach((entry) => {
    parent[entry[0]] = parent[entry[0]] ?? entry[1];
  });
}

function generateDefaultSettingsContexts(
  contexts: number | number[] | null | undefined
): number[] {
  return typeof contexts === 'number'
    ? [contexts]
    : Array.isArray(contexts)
    ? contexts
    : [];
}

/**
 * Generate complete question (with all properties maintaining a shape) with error/warn logs
 * @param question Input question
 * @param contexts Array of contexts
 * @param defaultSettings Default settings
 * @returns A tuple [array of complete question, array of log messages]
 */
export function generateCompleteQuestion(
  question: TInputQuestion,
  contexts: string[],
  defaultSettings: Partial<IQuizDefaultSettings>
) {
  const logs: ILog = { warns: [], errors: [] };

  // Creating a deep clone so as not to modify the original question
  const completeQuestion: TQuestion = JSON.parse(JSON.stringify(question));

  // question and answers are required fields
  // These must be present in all question
  // If they are not then its an error
  (['question', 'answers'] as const).forEach((field) => {
    completeQuestion[field] ??
      logs.errors.push(`Question ${field} is required`);
  });

  // If the question have options in them, we need to add the index information
  // index is required in order to track which is the right answer even after shuffling
  if ((completeQuestion as TSelectQuestion).options) {
    (completeQuestion as TSelectQuestion).options = (completeQuestion as TSelectQuestion).options.map((option, i) => ({
      text: option.toString().trim(),
      index: `${i}`
    }));
  }

  let time_allocated = defaultSettings.time_allocated ?? 60;

  // Auto generation of Question Configs
  if (logs.errors.length === 0) {
    // Auto infer question type, if they are not explicitly present
    // 1. If the answer is a primitive value
    // 2. if the answer is an object
    // 3. If the answer is an array of single value
    // Its either snippet or MCQ 
    if (
      isPrimitive(completeQuestion.answers) ||
      Object.getPrototypeOf(completeQuestion.answers) === Object.prototype ||
      completeQuestion.answers.length === 1
    ) {
      completeQuestion.type = completeQuestion.type || ((completeQuestion as IMcqQuestion).options ? 'MCQ' : 'Snippet');
    }
    // otherwise its either MS or FIB, question that will have multiple answers
    else {
      completeQuestion.type =
        completeQuestion.type || ((completeQuestion as IMsQuestion).options ? 'MS' : 'FIB');
    }

    switch (completeQuestion.type) {
      case 'MCQ': {
        const mcqQuestion: IMcqQuestion = completeQuestion;
        // Convert all the answers to string to aid in comparison later
        completeQuestion.answers = generateSelectionQuestionAnswers(
          (question as TInputSelectQuestion).answers
        );
        // Default time allocated for MCQ questions
        time_allocated = 15;
        // If there are no options for MCQ question, add an error
        if (!mcqQuestion.options)
          logs.errors.push(
            `Options must be provided for ${mcqQuestion.type} questions`
          );
        else {
          // If the answer index is greater than total options, or negative add an error
          if (
            parseInt(mcqQuestion.answers[0].text.trim()) < 0 ||
            parseInt(mcqQuestion.answers[0].text.trim()) >
            mcqQuestion.options.length - 1
          )
            logs.errors.push(
              `MCQ Answer must be within 0-${
                mcqQuestion.options.length - 1
              }, provided ${mcqQuestion.answers[0].text.trim()}`
            );
          // it makes no sense to have only a single option as that will be the answer
          if (mcqQuestion.options.length < 2)
            logs.errors.push(`MCQ Question must have at least 2 options`);
        }
        break;
      }
      case 'MS': {
        const msQuestion: IMsQuestion = completeQuestion;
        completeQuestion.answers = generateSelectionQuestionAnswers(
          (question as TInputSelectQuestion).answers
        );
        if (!msQuestion.options)
          logs.errors.push(
            `Options must be provided for ${msQuestion.type} questions`
          );
        else {
          if (msQuestion.options.length < 2)
            logs.errors.push(`MS Question must have at least 2 options`);

          // If more answers are given than options
          if (msQuestion.answers.length > msQuestion.options.length) {
            logs.errors.push(
              `Provided more answers than options, given ${msQuestion.options.length} options, but provided ${msQuestion.answers.length} answers`
            );
          }
          completeQuestion.answers.forEach((answer, answerIndex) => {
            // Each answer index must be less than options index and greater than or equal to 0
            if (
              parseInt(answer.text.trim()) < 0 ||
              parseInt(answer.text.trim()) > msQuestion.options.length - 1
            )
              logs.errors.push(
                `MS Answer ${answerIndex + 1} must be within 0-${
                  msQuestion.options.length - 1
                }, provided ${answer.text.trim()}`
              );
          });
        }
        time_allocated = 30;
        break;
      }
      case 'Snippet': {
        const [
          generatedInputQuestionAnswers,
          generatedLogs
        ] = generateTypeQuestionAnswers((question as InputSnippetQuestion).answers);
        completeQuestion.answers = generatedInputQuestionAnswers;
        logs.errors.push(...generatedLogs.errors);
        logs.warns.push(...generatedLogs.warns);
        time_allocated = 45;
        break;
      }

      case 'FIB': {
        const [
          generatedInputQuestionAnswers,
          generatedLogs
        ] = generateTypeQuestionAnswers((question as InputFibQuestion).answers);
        completeQuestion.answers = generatedInputQuestionAnswers;
        logs.errors.push(...generatedLogs.errors);
        logs.warns.push(...generatedLogs.warns);
        // The number of gaps must be 1 less than the number of answers
        if (
          completeQuestion.answers.length !==
          completeQuestion.question.reduce((totalBlanks, question) => totalBlanks + extractBlankCountForFIBQuestion(question.text), 0)
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
    }

    setObjectValues(completeQuestion, [
      ['image', null],
      ['weight', defaultSettings.weight ?? 1],
      ['difficulty', defaultSettings.difficulty ?? 'Beginner'],
      ['explanation', null],
      ['hints', []],
      ['time_allocated', defaultSettings.time_allocated ?? time_allocated],
      ['contexts', generateDefaultSettingsContexts(defaultSettings.contexts)]
    ]);

    // Add a unique id for the question
    completeQuestion._id = shortid();

    // If the time allocated is no within a range then use the default time allocation
    if (
      completeQuestion.time_allocated < MIN_QUESTION_TIME ||
      completeQuestion.time_allocated > MAX_QUESTION_TIME
    ) {
      logs.warns.push(
        `Question time allocated must be within 10-120 but given ${completeQuestion.time_allocated}, changing to 60`
      );
      completeQuestion.time_allocated = 60;
    }

    // If the difficulty level is not within allowed domain, set to Beginner
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

    completeQuestion.contexts = generateDefaultSettingsContexts(
      completeQuestion.contexts
    );

    // Context must be greater than 0 and less than total context length
    completeQuestion.contexts = completeQuestion.contexts.filter((context) => {
      if (context < 0 || context > contexts.length - 1) {
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
