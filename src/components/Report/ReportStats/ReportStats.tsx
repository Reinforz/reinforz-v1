import { useContext } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { StackList } from "../../../shared";

export function ReportStats() {
  const { report } = useContext(ReportContext);
  return <StackList header={"Report Stats"} items={[['Created At', (new Date(parseInt(report.createdAt.toString()))).toDateString()], ['Total Questions', report.results.length]]} />
}