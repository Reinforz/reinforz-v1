import React from "react";
import { IReport } from "../types";

interface IReportContext {
  report: IReport,
  setReport: React.Dispatch<React.SetStateAction<IReport>>
}

export const ReportContext = React.createContext({} as IReportContext)