import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useThemeSettings } from '../../hooks';
import { Menu } from '../../shared';
import { IReport, IResult } from "../../types";
import { applyReportFilters, generateQuestionsMapFromReportResults, generateQuizzesFromResults, getReportFilters } from '../../utils';
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
  const [reportFilter, setReportFilter] = useState(getReportFilters());
  const [report, setReport] = useState<IReport>({
    results: state?.results ?? [],
    createdAt: Date.now(),
    settings: playSettings
  });

  const history = useHistory();
  const allQuestionsMap = generateQuestionsMapFromReportResults(report.results);
  const allQuizzesMap = generateQuizzesFromResults(report.results, allQuestionsMap);
  const filteredResults = applyReportFilters(report.results, reportFilter);
  const filteredQuizzesMap = generateQuizzesFromResults(filteredResults, allQuestionsMap);

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
              setUploadedQuizzes(Object.values(filteredQuizzesMap))
              setSelectedQuizIds(Object.values(filteredQuizzesMap).map(quiz => quiz._id))
              history.push("/")
            }}>Back to Home</Button>
          </div>
        </div>
      </div>]} />
    } else {
      return <ReportUpload />
    }
  }

  return <ReportContext.Provider value={{ setReport, report, filteredResults, allQuizzesMap, filteredQuizzesMap, reportFilter, setReportFilter }}>
    {render()}
  </ReportContext.Provider>
}