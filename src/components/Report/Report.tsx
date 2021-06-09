import { green, red } from '@material-ui/core/colors';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCloudUploadAlt, FaGithub } from 'react-icons/fa';
import { IoMdCreate, IoMdDocument, IoMdSettings } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { REINFORZ_DOC_URL, REINFORZ_REPO_URL } from '../../constants';
import { ReportContext } from '../../context/ReportContext';
import { RootContext } from '../../context/RootContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Menu, StackList } from '../../shared';
import sounds from '../../sounds';
import { IReport, IReportSettingsPreset, IResult } from '../../types';
import {
  applyReportFilters,
  applyReportSorts,
  generateNavigationStyles,
  generateQuestionsMapFromReportResults,
  generateQuizzesFromResults,
  getReportSettingsPresets,
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

  const homeIconClick = () => {
    setUploadedQuizzes(Array.from(filteredQuizzesMap.values()));
    setSelectedQuizIds(Array.from(filteredQuizzesMap.keys()));
    history.push('/');
  };

  const icons: [string, JSX.Element][] = [
    [
      `Go to Settings page`,
      <IoMdSettings
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          history.push('/settings')
        }}
      />
    ],
    [
      `Go to Home page`,
      <AiFillHome
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          homeIconClick()
        }
        }
      />
    ],
    [
      `Go to Create page`,
      <IoMdCreate
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          history.push('/create')
        }}
      />
    ]
  ];

  if (report.results.length !== 0) {
    icons.push([
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

  icons.push(
    [
      'Go to documentation',
      <IoMdDocument
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          const win = window.open(
            REINFORZ_DOC_URL,
            '_blank'
          )!;
          win.focus();
        }}
      />
    ],
    [
      'Go to repo',
      <FaGithub
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          const win = window.open(
            REINFORZ_REPO_URL,
            '_blank'
          )!;
          win.focus();
        }}
      />
    ]
  );

  const navigationIconGroup = (
    <IconGroup className="Report-icons" icons={icons} direction={settings.navigation.direction} style={generatedNavigationStyles} />
  );
  const navigationShortcutProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    tabIndex: 0,
    onKeyPress: (e) => {
      switch (e.nativeEvent.code) {
        case 'Digit1': {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && history.push('/settings');
          break;
        }
        case 'Digit2': {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && homeIconClick();
          break;
        }
        case 'Digit3': {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && history.push('/create');
          break;
        }
      }
    }
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
