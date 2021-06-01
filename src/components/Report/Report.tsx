import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { PlayContext } from '../../context/PlayContext';
import { Menu, Table } from '../../shared';
import { TQuestionResult } from "../../types";
import { applyResultFilters, createDefaultReportFilterState, generateQuizzesFromResults } from '../../utils';
import "./Report.scss";
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';

export interface Props {
  results: TQuestionResult[],
  setResults: (results: any[]) => any
}

export default function Report(props: Props) {
  const { setPlaying, setUploadedQuizzes, setSelectedQuizIds, allQuestionsMap } = useContext(PlayContext);

  const [reportFilter, setReportFilter] = useState(createDefaultReportFilterState());

  const transformValue = (header: string, content: any) => {
    const value = content[header];
    switch (header) {
      case "verdict":
        return <div style={{
          fontWeight: 'bolder', color: value === false ? "#ff3223" : "#36e336"
        }}>{value === false ? "Incorrect" : "Correct"}</div>
      case "answers":
      case "user_answers":
        if (content.type.match(/(MS|FIB)/))
          return value.map((value: any, index: number) => <div key={value + index}>{value}</div>);
        else return value
      default:
        return value?.toString() ?? "N/A";
    }
  }

  const filteredResults = applyResultFilters(props.results, reportFilter,);
  const filteredQuizzes = generateQuizzesFromResults(filteredResults, allQuestionsMap);
  const total_weights = props.results.reduce((acc, cur) => acc + cur.question.weight, 0);

  const accumulator = (header: string, contents: Array<any>) => {
    switch (header) {
      case "time_allocated":
      case "time_taken":
      case "weight":
        return Number((contents.reduce((acc, cur) => acc + parseInt(cur), 0) / contents.length).toFixed(2));
      case "score":
        return total_weights !== 0 ? Number((contents.reduce((acc, cur) => acc + parseFloat(cur), 0) / total_weights).toFixed(2)) : 0;
      case "verdict":
        return contents.filter(content => content).length;
      default:
        return null;
    }
  }

  return (
    <Menu contents={[<ReportFilter reportFilter={reportFilter} setReportFilter={setReportFilter} />, <div className="Report">
      <ReportExport filteredResults={filteredResults} filteredQuizzes={Object.values(filteredQuizzes)} />
      <Table className="ReportTable" accumulator={accumulator} transformValue={transformValue} contents={filteredResults} collapseContents={["explanation"]} headers={["subject", "type", "difficulty", "verdict", "score", "time_allocated", "time_taken", "weight", "user_answers", "hints_used"].filter(report_stat => !reportFilter.excluded_columns.includes(report_stat))} onHeaderClick={(header, order) => {
        if (header.match(/(score|time|hints)/))
          props.setResults(filteredResults.sort((a: any, b: any) => order === "DESC" ? a[header] - b[header] : b[header] - a[header]))
        else if (header === "verdict") props.setResults(filteredResults.sort((a: any, b: any) => order === "DESC" ? a[header] === false ? -1 : 1 : a[header] === true ? -1 : 1))
        else props.setResults(filteredResults.sort((a: any, b: any) => order === "DESC" ? a[header] > b[header] ? -1 : 1 : a[header] < b[header] ? -1 : 1))
      }} />
      <div className="ReportBackButton">
        <Button variant="contained" color="primary" onClick={() => {
          localStorage.setItem("REPORT_FILTERS", JSON.stringify(reportFilter))
          setPlaying(false);
          setUploadedQuizzes(Object.values(filteredQuizzes))
          setSelectedQuizIds(Object.values(filteredQuizzes).map(quiz => quiz._id))
        }}>Back to Home</Button>
      </div>
    </div>]} />
  )
}