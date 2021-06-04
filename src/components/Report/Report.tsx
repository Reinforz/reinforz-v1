import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useThemeSettings } from '../../hooks';
import { Menu } from '../../shared';
import { IReport, IReportFilter, IResult } from "../../types";
import { applyResultFilters, createDefaultReportFilterState, generateQuestionsMapFromReportResults, generateQuizzesFromResults } from '../../utils';
import "./Report.scss";
import { ReportAggregator } from './ReportAggregator/ReportAggregator';
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';
import { ReportSettings } from './ReportSettings/ReportSettings';
import { ReportStats } from './ReportStats/ReportStats';
import { ReportTable } from './ReportTable/ReportTable';
import { ReportUpload } from './ReportUpload/ReportUpload';

export default function Report() {
  const { state } = useLocation<{ results: IResult[] }>();
  const { theme } = useThemeSettings();
  const { playSettings, setUploadedQuizzes, setSelectedQuizIds } = useContext(RootContext);
  const [reportFilter, setReportFilter] = useState<IReportFilter>(JSON.parse(localStorage.getItem('REPORT_FILTERS') ?? JSON.stringify(createDefaultReportFilterState())));
  const [report, setReport] = useState<IReport>({
    results: state?.results ?? [],
    createdAt: Date.now(),
    settings: playSettings
  });

  const history = useHistory();
  const filteredResults = applyResultFilters(report.results, reportFilter);
  const generatedAllQuestionsMap = generateQuestionsMapFromReportResults(filteredResults);
  const filteredQuizzes = generateQuizzesFromResults(filteredResults, generatedAllQuestionsMap);

  const render = () => {
    if (report.results.length !== 0) {
      return <Menu lsKey="REPORT_MENU" contents={[<ReportFilter />, <div className="Report" style={{ color: theme.palette.text.primary }}>
        <ReportTable />
        <div style={{ gridArea: '1/2/3/3', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <ReportStats />
          <ReportSettings />
          <ReportExport />
          <ReportAggregator />
          <div className="Report-BackButton">
            <Button variant="contained" color="primary" onClick={() => {
              localStorage.setItem("REPORT_FILTERS", JSON.stringify(reportFilter))
              setUploadedQuizzes(Object.values(filteredQuizzes))
              setSelectedQuizIds(Object.values(filteredQuizzes).map(quiz => quiz._id))
              history.push("/")
            }}>Back to Home</Button>
          </div>
        </div>
      </div>]} />
    } else {
      return <ReportUpload />
    }
  }

  return <ReportContext.Provider value={{ setReport, report, filteredResults, filteredQuizzes, reportFilter, setReportFilter }}>
    {render()}
  </ReportContext.Provider>
}