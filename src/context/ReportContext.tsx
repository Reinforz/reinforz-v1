import React from "react";
import { IQuizFull, IReport, IReportSettings, IReportSettingsPreset, IResult } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
  filteredResults: IResult[],
  filteredQuizzesMap: Map<string, IQuizFull>
  allQuizzesMap: Map<string, IQuizFull>
  sortedResults: IResult[]
  reportSettings: IReportSettings
  setReportSettings: React.Dispatch<React.SetStateAction<IReportSettings>>
  setReportSettingsPresets: React.Dispatch<React.SetStateAction<IReportSettingsPreset>>
  reportSettingsPresets: IReportSettingsPreset
}

export const ReportContext = React.createContext({} as IReportContext)