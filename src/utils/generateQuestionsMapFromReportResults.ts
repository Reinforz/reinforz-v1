import { IQuestionResult, TQuestion } from '../types';
import { transformResultQuestionToRegularQuestion } from './';

export function generateQuestionsMapFromReportResults(
  results: IQuestionResult[]
): Map<string, TQuestion> {
  const generatedQuestionsMap: Map<string, TQuestion> = new Map();
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
