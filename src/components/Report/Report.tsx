import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { PlayContext } from '../../context/PlayContext';
import { Menu } from '../../shared';
import { TQuestionResult } from "../../types";
import { applyResultFilters, createDefaultReportFilterState, generateQuizzesFromResults } from '../../utils';
import "./Report.scss";
import { ReportAggregator } from './ReportAggregator/ReportAggregator';
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';
import { ReportTable } from './ReportTable/ReportTable';

export interface Props {
  results: TQuestionResult[],
  setResults: (results: any[]) => any
}

export default function Report(props: Props) {
  const { setPlaying, setUploadedQuizzes, setSelectedQuizIds, allQuestionsMap } = useContext(PlayContext);

  const [reportFilter, setReportFilter] = useState(createDefaultReportFilterState());
  const filteredResults = applyResultFilters(props.results, reportFilter);
  const filteredQuizzes = generateQuizzesFromResults(filteredResults, allQuestionsMap);

  return (
    <Menu contents={[<ReportFilter reportFilter={reportFilter} setReportFilter={setReportFilter} />, <div className="Report">
      <ReportTable filteredResults={filteredResults} />
      <div style={{ gridArea: '1/2/3/3', display: 'flex', flexDirection: 'column' }}>
        <ReportExport filteredResults={filteredResults} filteredQuizzes={Object.values(filteredQuizzes)} />
        <ReportAggregator filteredResults={filteredResults} />
        <div className="Report-BackButton">
          <Button variant="contained" color="primary" onClick={() => {
            localStorage.setItem("REPORT_FILTERS", JSON.stringify(reportFilter))
            setPlaying(false);
            setUploadedQuizzes(Object.values(filteredQuizzes))
            setSelectedQuizIds(Object.values(filteredQuizzes).map(quiz => quiz._id))
          }}>Back to Home</Button>
        </div>
      </div>
    </div>]} />
  )
}