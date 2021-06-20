import React from "react";
import { IErrorLog, IPlaySettings, IPlaySettingsPreset, IQuizFull, TQuestionFull } from "../types";

export interface IRootContextData {
  uploadedQuizzes: IQuizFull[],
  selectedQuizIds: string[],
  selectedQuizzes: IQuizFull[],
  filteredQuizzes: IQuizFull[],
  errorLogs: IErrorLog[],
  playing: boolean
  playSettingsPresets: IPlaySettingsPreset
  playSettings: IPlaySettings
  allQuestions: TQuestionFull[]
  uploadedPlayState: boolean
  playQuestions: {
    array: TQuestionFull[];
    map: Map<string, TQuestionFull>;
  },
  playQuizzes: { selected: IQuizFull[], filtered: IQuizFull[] },
}

export interface IRootContext extends IRootContextData {
  setUploadedQuizzes: React.Dispatch<React.SetStateAction<IQuizFull[]>>
  setSelectedQuizIds: React.Dispatch<React.SetStateAction<string[]>>
  setErrorLogs: React.Dispatch<React.SetStateAction<IErrorLog[]>>
  setPlaySettings: React.Dispatch<React.SetStateAction<IPlaySettings>>
  allQuestionsMap: Map<string, TQuestionFull>
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setPlaySettingsPresets: React.Dispatch<React.SetStateAction<IPlaySettingsPreset>>
  setUploadedPlayState: React.Dispatch<React.SetStateAction<boolean>>
  setPlayQuizzes: React.Dispatch<React.SetStateAction<{ selected: IQuizFull[], filtered: IQuizFull[] }>>
  playQuestions: {
    array: TQuestionFull[];
    map: Map<string, TQuestionFull>;
  },
  playQuizzes: { selected: IQuizFull[], filtered: IQuizFull[] },
  setPlayQuestions: React.Dispatch<React.SetStateAction<{
    array: TQuestionFull[];
    map: Map<string, TQuestionFull>;
  }>>
}

export const RootContext = React.createContext({} as IRootContext)