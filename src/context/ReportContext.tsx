import React from "react";
import { IQuestionResult, IQuiz, IReport, IReportSettings, IReportSettingsPresetConfig } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
  filteredResults: IQuestionResult[],
  filteredQuizzesMap: Map<string, IQuiz>
  allQuizzesMap: Map<string, IQuiz>
  sortedResults: IQuestionResult[]
  reportSettings: IReportSettings
  setReportSettings: React.Dispatch<React.SetStateAction<IReportSettings>>
  setReportSettingsPresets: React.Dispatch<React.SetStateAction<IReportSettingsPresetConfig>>
  reportSettingsPresets: IReportSettingsPresetConfig
  excludedColumns: Record<string, boolean>
}

export const ReportContext = React.createContext({} as IReportContext)