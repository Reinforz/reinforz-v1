import React, { useContext, useMemo, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Menu } from '../../shared';
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
  const allQuestionsMap = useMemo(() => generateQuestionsMapFromReportResults(report.results), [report.results]);
  const allQuizzesMap = useMemo(() => generateQuizzesFromResults(report.results, allQuestionsMap), [report.results, allQuestionsMap]);
  const filteredResults = applyReportFilters(report.results, reportFilter);
  const filteredQuizzesMap = generateQuizzesFromResults(filteredResults, allQuestionsMap);

  const icons: [string, JSX.Element][] = [
    [`Go to Settings page`, <IoMdSettings size={20} fill={theme.color.opposite_light} onClick={() => history.push("/settings")} />],
    [`Go to Play page`, <AiFillHome size={20} fill={theme.color.opposite_light} onClick={() => {
      setUploadedQuizzes(Array.from(filteredQuizzesMap.values()))
      setSelectedQuizIds(Array.from(filteredQuizzesMap.keys()))
      history.push("/")
    }
    } />],
    [`Go to Create page`, <IoMdCreate size={20} fill={theme.color.opposite_light} onClick={() => history.push("/create")} />]
  ];

  if (report.results.length !== 0) {
    icons.push(["Upload", <FaCloudUploadAlt size={20} fill={theme.color.opposite_light} onClick={() => {
      setReport({
        results: [],
        createdAt: Date.now(),
        settings: playSettings
      })
    }} />])
  }
  const iconGroup = <IconGroup className="Report-icons" icons={icons} />;

  const render = () => {
    if (report.results.length !== 0) {
      return <Menu lsKey="REPORT_MENU" contents={[<ReportFilter />, <div className="Report" style={{ color: theme.palette.text.primary }}>
        {iconGroup}
        <ReportTable />
        {!reportFilter.excluded_columns.includes("report_info") ? <div style={{ width: 300, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {!reportFilter.excluded_columns.includes('report_stats') ? <ReportStats /> : null}
          <ReportSettings />
          {!reportFilter.excluded_columns.includes('report_export') ? <ReportExport /> : null}
          {!reportFilter.excluded_columns.includes('report_aggregator') ? <ReportAggregator /> : null}
        </div> : null}
      </div>]} />
    } else {
      return <div className="Report" style={{ color: theme.palette.text.primary }}>
        {iconGroup}
        <ReportUpload />
      </div>
    }
  }

  return <ReportContext.Provider value={{ setReport, report, filteredResults, allQuizzesMap, filteredQuizzesMap, reportFilter, setReportFilter }}>
    {render()}
  </ReportContext.Provider>
}