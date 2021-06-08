import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillHome } from 'react-icons/ai';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Menu } from '../../shared';
import { IReport, IReportSettingsPreset, IResult } from "../../types";
import { applyReportFilters, applyReportSorts, generateQuestionsMapFromReportResults, generateQuizzesFromResults, getReportSettingsPresets } from '../../utils';
import "./Report.scss";
import { ReportAggregator } from './ReportAggregator/ReportAggregator';
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';
import { ReportSettings } from './ReportSettings/ReportSettings';
import { ReportStats } from './ReportStats/ReportStats';
import { ReportTable } from './ReportTable/ReportTable';
import { ReportUpload } from './ReportUpload/ReportUpload';

function findSettingsFromPresets(settings: IReportSettingsPreset) {
  return settings.presets.find(preset => preset.id === settings.current)!.data;
}

export default function Report() {
  const { state } = useLocation<{ results: IResult[] }>();
  const { theme, settings } = useThemeSettings();
  const { playSettings, setUploadedQuizzes, setSelectedQuizIds } = useContext(RootContext);
  const [reportSettingsPresets, setReportSettingsPresets] = useState(getReportSettingsPresets());
  const [reportSettings, setReportSettings] = useState(findSettingsFromPresets(reportSettingsPresets));
  const [report, setReport] = useState<IReport>({
    results: state?.results ?? [],
    createdAt: Date.now(),
    settings: playSettings
  });

  useEffect(() => {
    setReportSettings(findSettingsFromPresets(reportSettingsPresets))
    // eslint-disable-next-line
  }, [reportSettingsPresets.current])

  const history = useHistory();
  const allQuestionsMap = useMemo(() => generateQuestionsMapFromReportResults(report.results), [report.results]);
  const allQuizzesMap = useMemo(() => generateQuizzesFromResults(report.results, allQuestionsMap), [report.results, allQuestionsMap]);

  const { filters, sort } = reportSettings;

  const filteredResults = applyReportFilters(report.results, filters);
  const sortedResults = applyReportSorts(filteredResults, sort);
  const filteredQuizzesMap = generateQuizzesFromResults(filteredResults, allQuestionsMap);

  const homeIconClick = () => {
    setUploadedQuizzes(Array.from(filteredQuizzesMap.values()))
    setSelectedQuizIds(Array.from(filteredQuizzesMap.keys()))
    history.push("/")
  }

  useHotkeys('ctrl+shift+1', () => settings.shortcuts && history.push("/settings"), [settings.shortcuts]);
  useHotkeys('ctrl+shift+2', () => settings.shortcuts && homeIconClick(), [settings.shortcuts, filteredQuizzesMap]);
  useHotkeys('ctrl+shift+3', () => settings.shortcuts && history.push("/create"), [settings.shortcuts]);

  const icons: [string, JSX.Element][] = [
    [`Go to Settings page`, <IoMdSettings size={20} fill={theme.color.opposite_light} onClick={() => history.push("/settings")} />],
    [`Go to Home page`, <AiFillHome size={20} fill={theme.color.opposite_light} onClick={() => homeIconClick()} />],
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
        {!filters.excluded_columns.includes("report_info") ? <div style={{ width: 300, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {!filters.excluded_columns.includes('report_stats') ? <ReportStats /> : null}
          <ReportSettings />
          {!filters.excluded_columns.includes('report_export') ? <ReportExport /> : null}
          {!filters.excluded_columns.includes('report_aggregator') ? <ReportAggregator /> : null}
        </div> : null}
      </div>]} />
    } else {
      return <div className="Report" style={{ color: theme.palette.text.primary }}>
        {iconGroup}
        <ReportUpload />
      </div>
    }
  }

  return <ReportContext.Provider value={{ reportSettings, setReportSettings, reportSettingsPresets, setReportSettingsPresets, setReport, report, sortedResults, filteredResults, allQuizzesMap, filteredQuizzesMap }}>
    {render()}
  </ReportContext.Provider>
}