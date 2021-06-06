import React from "react";
import { IQuizFull, IReport, IReportFilter, IReportSort, IResult } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
  filteredResults: IResult[],
  filteredQuizzesMap: Map<string, IQuizFull>
  allQuizzesMap: Map<string, IQuizFull>
  reportFilter: IReportFilter,
  setReportFilter: React.Dispatch<React.SetStateAction<IReportFilter>>
  reportSort: IReportSort
  setReportSort: React.Dispatch<React.SetStateAction<IReportSort>>
}

export const ReportContext = React.createContext({} as IReportContext)