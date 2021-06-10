import React from "react";
import { IErrorLog, IPlaySettings, IPlaySettingsPreset, IQuizFull, TQuestionFull } from "../types";

interface IRootContext {
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
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  playing: boolean
  playSettingsPresets: IPlaySettingsPreset
  setPlaySettingsPresets: React.Dispatch<React.SetStateAction<IPlaySettingsPreset>>
  uploadedPlayState: boolean
  setUploadedPlayState: React.Dispatch<React.SetStateAction<boolean>>
  playQuizzes: { selected: IQuizFull[], filtered: IQuizFull[] },
  setPlayQuizzes: React.Dispatch<React.SetStateAction<{ selected: IQuizFull[], filtered: IQuizFull[] }>>
  playQuestions: {
    array: TQuestionFull[];
    map: Map<string, TQuestionFull>;
  },
  setPlayQuestions: React.Dispatch<React.SetStateAction<{
    array: TQuestionFull[];
    map: Map<string, TQuestionFull>;
  }>>
}

export const RootContext = React.createContext({} as IRootContext)