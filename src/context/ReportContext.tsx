import React from "react";
import { IQuizFull, IReport, IReportFilter, IResult } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
  filteredResults: IResult[],
  filteredQuizzesMap: Map<string, IQuizFull>
  allQuizzesMap: Map<string, IQuizFull>
  reportFilter: IReportFilter,
  setReportFilter: React.Dispatch<React.SetStateAction<IReportFilter>>
}

export const ReportContext = React.createContext({} as IReportContext)