import React from "react";
import { IQuizFull, IReport, IResult } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
  filteredResults: IResult[],
  filteredQuizzes: Record<string, IQuizFull>
}

export const ReportContext = React.createContext({} as IReportContext)