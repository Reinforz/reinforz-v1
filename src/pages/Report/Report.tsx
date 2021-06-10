import { green, red } from '@material-ui/core/colors';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCloudUploadAlt, FaKeyboard } from 'react-icons/fa';
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { REINFORZ_REPORT_SETTINGS_LS_KEY } from '../../constants';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useNavigationIcons, useThemeSettings } from '../../hooks';
import { IconGroup, Menu, StackList } from '../../shared';
import { IReport, IReportSettingsPreset, IResult } from '../../types';
import {
  applyReportFilters,
  applyReportSorts,
  generateNavigationStyles,
  generateQuestionsMapFromReportResults,
  generateQuizzesFromResults,
  getReportSettingsPresets,
  navigateBetweenPresets,
  transformTextBySeparator
} from '../../utils';
import './Report.scss';
import { ReportAggregator } from './ReportAggregator/ReportAggregator';
import ReportExport from './ReportExport/ReportExport';
import ReportFilter from './ReportFilter/ReportFilter';
import { ReportTable } from './ReportTable/ReportTable';
import { ReportUpload } from './ReportUpload/ReportUpload';

function findSettingsFromPresets(settings: IReportSettingsPreset) {
  return settings.presets.find((preset) => preset.id === settings.current)!
    .data;
}

export default function Report() {
  const { state } = useLocation<{ results: IResult[] }>();
  const { theme, settings } = useThemeSettings();
  const { playSettings, setUploadedQuizzes, setSelectedQuizIds } = useContext(
    RootContext
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const { navigationIcons, onKeyPress } = useNavigationIcons([{
    path: "/settings",
    component: IoMdSettings
  }, {
    path: "/",
    page: "Home",
    component: AiFillHome,
    onClick: () => {
      setUploadedQuizzes(Array.from(filteredQuizzesMap.values()));
      setSelectedQuizIds(Array.from(filteredQuizzesMap.keys()));
      history.push('/');
    }
  }, {
    path: "/create",
    component: IoMdCreate
  }, {
    component: FaKeyboard,
    path: "/shortcuts"
  }]);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

  const [reportSettingsPresets, setReportSettingsPresets] = useState(
    getReportSettingsPresets()
  );
  const [reportSettings, setReportSettings] = useState(
    findSettingsFromPresets(reportSettingsPresets)
  );
  const [report, setReport] = useState<IReport>({
    results: state?.results ?? [],
    createdAt: Date.now(),
    settings: playSettings
  });
  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);

  useEffect(() => {
    setReportSettings(findSettingsFromPresets(reportSettingsPresets));
    // eslint-disable-next-line
  }, [reportSettingsPresets.current]);

  const history = useHistory();
  const allQuestionsMap = useMemo(
    () => generateQuestionsMapFromReportResults(report.results),
    [report.results]
  );
  const allQuizzesMap = useMemo(
    () => generateQuizzesFromResults(report.results, allQuestionsMap),
    [report.results, allQuestionsMap]
  );

  const { filters, sort } = reportSettings;

  const filteredResults = applyReportFilters(report.results, filters);
  const sortedResults = applyReportSorts(filteredResults, sort);
  const filteredQuizzesMap = generateQuizzesFromResults(
    filteredResults,
    allQuestionsMap
  );

  if (report.results.length !== 0) {
    navigationIcons.push([
      'Upload',
      <FaCloudUploadAlt
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          setReport({
            results: [],
            createdAt: Date.now(),
            settings: playSettings
          });
        }}
      />
    ]);
  }

  const navigationIconGroup = (
    <IconGroup className="Report-icons" icons={navigationIcons} direction={settings.navigation.direction} style={generatedNavigationStyles} />
  );
  const navigationShortcutProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    tabIndex: 0,
    onKeyPress
  };

  const render = () => {
    if (report.results.length !== 0) {
      return (
        <Menu
          lsKey="REPORT_MENU"
          contents={[
            <ReportFilter />,
            <div
              className="Report"
              style={{ color: theme.palette.text.primary }}
              {...navigationShortcutProps}
              onKeyUp={(e) => {
                navigateBetweenPresets(e, reportSettingsPresets, setReportSettingsPresets, REINFORZ_REPORT_SETTINGS_LS_KEY)
              }}
              ref={ref}
            >
              {navigationIconGroup}
              <ReportTable />
              {!filters.excluded_columns.includes('report_info') ? (
                <div
                  style={{
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto'
                  }}
                >
                  {!filters.excluded_columns.includes('report_stats') ? (
                    <StackList
                      header={'Report Stats'}
                      items={[
                        [
                          'Created At',
                          new Date(
                            parseInt(report.createdAt.toString())
                          ).toDateString()
                        ],
                        [
                          'Total Quizzes',
                          `${filteredQuizzesMap.size}/${allQuizzesMap.size}`
                        ],
                        [
                          'Total Questions',
                          `${filteredResults.length}/${report.results.length}`
                        ]
                      ]}
                    />
                  ) : null}
                  <div className="Report-Settings">
                    {!filters.excluded_columns.includes('play_options') ? (
                      <StackList
                        header={'Play Options'}
                        items={Object.entries(
                          playSettings.options
                        ).map(([key, value]) => [
                          transformTextBySeparator(key),
                          <span
                            style={{
                              color: value === true ? green[500] : red[500]
                            }}
                          >
                            {value === true ? 'On' : 'Off'}
                          </span>
                        ])}
                      />
                    ) : null}
                    {!filters.excluded_columns.includes('play_filters') ? (
                      <StackList
                        header={'Play Filters'}
                        items={Object.entries(
                          playSettings.filters
                        ).map(([key, value]) => [
                          transformTextBySeparator(key),
                          Array.isArray(value)
                            ? value.join(',')
                            : value.toString()
                        ])}
                      />
                    ) : null}
                  </div>
                  {!filters.excluded_columns.includes('report_export') ? (
                    <ReportExport />
                  ) : null}
                  {!filters.excluded_columns.includes('report_aggregator') ? (
                    <ReportAggregator />
                  ) : null}
                </div>
              ) : null}
            </div>
          ]}
        />
      );
    } else {
      return (
        <div
          ref={ref}
          className="Report"
          style={{ color: theme.palette.text.primary }}
          {...navigationShortcutProps}
        >
          {navigationIconGroup}
          <ReportUpload />
        </div>
      );
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reportSettings,
        setReportSettings,
        reportSettingsPresets,
        setReportSettingsPresets,
        setReport,
        report,
        sortedResults,
        filteredResults,
        allQuizzesMap,
        filteredQuizzesMap
      }}
    >
      {render()}
    </ReportContext.Provider>
  );
}
