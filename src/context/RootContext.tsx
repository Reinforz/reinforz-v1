import React from "react";
import { IErrorLog, IPlaySettings, IPlaySettingsPresetConfig, IQuiz, TQuestion } from "../types";

export interface IRootContextData {
  uploadedQuizzes: IQuiz[],
  selectedQuizIds: string[],
  selectedQuizzes: IQuiz[],
  filteredQuizzes: IQuiz[],
  errorLogs: IErrorLog[],
  playing: boolean
  playSettingsPresets: IPlaySettingsPresetConfig
  playSettings: IPlaySettings
  allQuestions: TQuestion[]
  uploadedPlayState: boolean
  playQuestions: {
    array: TQuestion[];
    map: Map<string, TQuestion>;
  },
  playQuizzes: { selected: IQuiz[], settingsApplied: IQuiz[] },
}

export interface IRootContext extends IRootContextData {
  setUploadedQuizzes: React.Dispatch<React.SetStateAction<IQuiz[]>>
  setSelectedQuizIds: React.Dispatch<React.SetStateAction<string[]>>
  setErrorLogs: React.Dispatch<React.SetStateAction<IErrorLog[]>>
  setPlaySettings: React.Dispatch<React.SetStateAction<IPlaySettings>>
  allQuestionsMap: Map<string, TQuestion>
  allQuizzesMap: Map<string, IQuiz>
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setPlaySettingsPresets: React.Dispatch<React.SetStateAction<IPlaySettingsPresetConfig>>
  setUploadedPlayState: React.Dispatch<React.SetStateAction<boolean>>
  setPlayQuizzes: React.Dispatch<React.SetStateAction<{ selected: IQuiz[], settingsApplied: IQuiz[] }>>
  setPlayQuestions: React.Dispatch<React.SetStateAction<{
    array: TQuestion[];
    map: Map<string, TQuestion>;
  }>>
}

export const RootContext = React.createContext({} as IRootContext)