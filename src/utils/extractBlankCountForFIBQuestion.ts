import { TFibQuestion } from "../types";

export function extractBlankCountForFIBQuestion(fibQuestionText: TFibQuestion["text"]) {
  return Array.from(fibQuestionText.matchAll(/(___)/g)).length
}