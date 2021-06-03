import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RootContext } from '../../context/RootContext';
import { Menu } from '../../shared';
import { IReportFilter, IResult } from "../../types";
import { applyResultFilters, createDefaultReportFilterState, generateQuizzesFromResults } from '../../utils';
import "./Report.scss";
import { ReportAggregator } from './ReportAggregator/ReportAggregator';
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';
import { ReportSettings } from './ReportSettings/ReportSettings';
import { ReportTable } from './ReportTable/ReportTable';

export default function Report() {
  const { state } = useLocation<{ results: IResult[] }>();
  const { setPlaying, setUploadedQuizzes, setSelectedQuizIds, allQuestionsMap } = useContext(RootContext);
  const [reportFilter, setReportFilter] = useState<IReportFilter>(JSON.parse(localStorage.getItem('REPORT_FILTERS') ?? JSON.stringify(createDefaultReportFilterState())));
  const filteredResults = applyResultFilters(state?.results ?? [], reportFilter);
  const filteredQuizzes = generateQuizzesFromResults(filteredResults, allQuestionsMap);

  return (
    <Menu contents={[<ReportFilter reportFilter={reportFilter} setReportFilter={setReportFilter} />, <div className="Report">
      <ReportTable filteredResults={filteredResults} />
      <div style={{ gridArea: '1/2/3/3', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <ReportSettings />
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