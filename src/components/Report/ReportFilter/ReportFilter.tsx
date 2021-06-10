import { Button } from '@material-ui/core';
import React, { useContext, useMemo } from "react";
import { REINFORZ_REPORT_SETTINGS_LS_KEY } from '../../../constants';
import { ReportContext } from '../../../context/ReportContext';
import { useThemeSettings } from '../../../hooks';
import { CheckboxGroup, InputRange, Preset, RadioGroup, Select, Sort } from '../../../shared';
import { IReportFilter } from '../../../types';
import { generateDefaultReportSettingsState, transformTextBySeparator } from '../../../utils';
import "./ReportFilter.scss";

export default function ReportFilter() {
  const { theme } = useThemeSettings();
  const { setReportSettingsPresets, reportSettingsPresets, allQuizzesMap, reportSettings, setReportSettings } = useContext(ReportContext);
  const { filters, sort } = reportSettings;

  const setFilterState = (newFilterState: React.SetStateAction<IReportFilter>) => {
    setReportSettings({
      ...reportSettings,
      filters: {
        ...filters,
        ...newFilterState
      }
    })
  };
  const allTopics = useMemo(() => Array.from(new Set(Array.from(allQuizzesMap.values()).map(quiz => quiz.topic.trim()))), [allQuizzesMap]);
  const allSubjects = useMemo(() => Array.from(new Set(Array.from(allQuizzesMap.values()).map(quiz => quiz.subject.trim()))), [allQuizzesMap])

  return <div className="ReportFilter" style={{ backgroundColor: theme.color.dark }}>
    <Preset lsKey={REINFORZ_REPORT_SETTINGS_LS_KEY} modalLabel="Save Report Settings" popoverText="Save current report settings as preset" currentPreset={reportSettings} itemPreset={reportSettingsPresets} setPresetState={setReportSettingsPresets} />
    <div style={{ overflow: 'auto' }}>
      <InputRange label={"Time taken range"} min={0} max={120} setState={setFilterState} state={filters} stateKey={"time_taken"} />
      <InputRange step={0.25} label={"Score"} min={0} max={1} setState={setFilterState} state={filters} stateKey={"score"} />
      <InputRange step={1} label={"Hints Used"} min={0} max={10} setState={setFilterState} state={filters} stateKey={"hints_used"} />
      <RadioGroup itemLabel={(item) => item === "true" ? "Correct" : item === "false" ? "Incorrect" : "Any"} items={["true", "false", "any"]} label={"Verdict"} setState={setFilterState} state={filters} stateKey={"verdict"} />
      <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setFilterState} stateKey={'excluded_difficulty'} state={filters} />
      <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setFilterState} stateKey={'excluded_types'} state={filters} />
      <Select multiple label={"Excluded Quizzes"} items={Array.from(allQuizzesMap.keys())} menuItemLabel={(quiz_id) => {
        const selectedQuiz = allQuizzesMap.get(quiz_id)!;
        return `${selectedQuiz.subject} - ${selectedQuiz.topic}`
      }} setState={setFilterState} state={filters} stateKey={"excluded_quizzes"} />
      <Select multiple label={"Excluded Topics"} items={allTopics} menuItemLabel={(topic) => topic} setState={setFilterState} state={filters} stateKey={"excluded_topics"} />
      <Select multiple label={"Excluded Subjects"} items={allSubjects} menuItemLabel={(topic) => topic} setState={setFilterState} state={filters} stateKey={"excluded_subjects"} />
      <Select multiple label={"Excluded Columns"}
        renderValue={(selected) => (selected as string[]).map((report_stat, index) => <div key={report_stat + "excluded_columns" + index}>{transformTextBySeparator(report_stat)}</div>)}
        items={["question", "image", "question_stats", "user_stats", "score_breakdown", "quiz_stats", "hints", "answers", "options", "report_stats", "play_options", "play_filters", "report_export", "report_aggregator", "report_info"]}
        menuItemLabel={(item) => transformTextBySeparator(item)}
        setState={setFilterState}
        state={filters}
        stateKey={"excluded_columns"}
      />
      <Sort maxSort={3} header={"Report Sort"} sorts={sort} setSorts={(sort: any) => {
        setReportSettings({
          ...reportSettings,
          sort
        })
      }} items={["Score", "Time Taken", "Hints Used", "Verdict", "Type", "Difficulty", "Time Allocated", "Weight"]} menuItemLabel={(item) => item} />
    </div>
    <Button variant="contained" color="primary" onClick={() => {
      setReportSettings(generateDefaultReportSettingsState())
    }} style={{ width: "calc(100% - 5px)" }}>Reset</Button>
  </div>
}