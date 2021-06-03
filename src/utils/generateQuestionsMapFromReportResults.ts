import { IResult, TQuestionFull } from '../types';
import { transformResultQuestionToRegularQuestion } from './';

export function generateQuestionsMapFromReportResults(
  results: IResult[]
): Map<string, TQuestionFull> {
  const generatedQuestionsMap: Map<string, TQuestionFull> = new Map();
  results.forEach((result) => {
    generatedQuestionsMap.set(
      result.question._id,
      transformResultQuestionToRegularQuestion(
        JSON.parse(JSON.stringify(result.question))
      )
    );
  });
  return generatedQuestionsMap;
}
