import { useContext } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { StackList } from "../../../shared";

export function ReportStats() {
  const { report, filteredQuizzesMap } = useContext(ReportContext);
  return <StackList header={"Report Stats"} items={[['Created At', (new Date(parseInt(report.createdAt.toString()))).toDateString()], ['Total Quizzes', Object.keys(filteredQuizzesMap).length], ['Total Questions', report.results.length]]} />
}