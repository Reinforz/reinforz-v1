import React from "react";
import { IErrorLog, IPlaySettings, IQuizFull, TQuestionFull } from "../types";

interface IRootContext {
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  uploadedQuizzes: IQuizFull[],
  setUploadedQuizzes: React.Dispatch<React.SetStateAction<IQuizFull[]>>
  selectedQuizIds: string[],
  setSelectedQuizIds: React.Dispatch<React.SetStateAction<string[]>>
  selectedQuizzes: IQuizFull[],
  filteredQuizzes: IQuizFull[],
  errorLogs: IErrorLog[],
  setErrorLogs: React.Dispatch<React.SetStateAction<IErrorLog[]>>
  playSettings: IPlaySettings
  setPlaySettings: React.Dispatch<React.SetStateAction<IPlaySettings>>
  allQuestions: TQuestionFull[]
  allQuestionsMap: Map<string, TQuestionFull>
}

export const RootContext = React.createContext({} as IRootContext)