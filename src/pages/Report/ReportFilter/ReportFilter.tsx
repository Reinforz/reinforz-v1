import { Button } from '@material-ui/core';
import React, { useContext, useMemo } from "react";
import { CheckboxGroup, InputRange, Preset, RadioGroup, Select, Sort } from '../../../components';
import { REINFORZ_REPORT_SETTINGS_LS_KEY } from '../../../constants';
import { ReportContext } from '../../../context/ReportContext';
import { IReportFilter } from '../../../types';
import { generateDefaultReportSettingsState, transformTextBySeparator } from '../../../utils';
import "./ReportFilter.scss";

export default function ReportFilter() {
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

  return <div className="ReportFilter flex fd-c">
    <div className="bg-dark mb-5">
      <Preset lsKey={REINFORZ_REPORT_SETTINGS_LS_KEY} modalLabel="Save Report Settings" popoverText="Save current report settings as preset" currentPreset={reportSettings} itemPresets={reportSettingsPresets} setPresetState={setReportSettingsPresets} />
    </div>
    <div className={'overflowY-auto overflowX-hidden'}>
      <InputRange classNames={{ formGroup: 'mb-5' }} label={"Time taken range"} min={0} max={120} setState={setFilterState} state={filters} stateKey={"time_taken"} />
      <InputRange classNames={{ formGroup: 'mb-5' }} step={0.25} label={"Score"} min={0} max={1} setState={setFilterState} state={filters} stateKey={"score"} />
      <InputRange classNames={{ formGroup: 'mb-5' }} step={1} label={"Hints Used"} min={0} max={10} setState={setFilterState} state={filters} stateKey={"hints_used"} />
      <RadioGroup classNames={{ radioGroup: 'mb-5' }} itemLabel={(item) => item === "true" ? "Correct" : item === "false" ? "Incorrect" : "Any"} items={["true", "false", "any"]} label={"Verdict"} setState={setFilterState} state={filters} stateKey={"verdict"} />
      <CheckboxGroup classNames={{ formGroup: 'mb-5' }} label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setFilterState} stateKey={'excluded_difficulty'} state={filters} />
      <CheckboxGroup classNames={{ formGroup: 'mb-5' }} label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setFilterState} stateKey={'excluded_types'} state={filters} />
      <Select classNames={{ formGroup: 'mb-5' }} multiple label={"Excluded Quizzes"} items={Array.from(allQuizzesMap.keys())} menuItemLabel={(quiz_id) => {
        const selectedQuiz = allQuizzesMap.get(quiz_id)!;
        return `${selectedQuiz.subject} - ${selectedQuiz.topic}`
      }} setState={setFilterState} state={filters} stateKey={"excluded_quizzes"} />
      <Select classNames={{ formGroup: 'mb-5' }} multiple label={"Excluded Topics"} items={allTopics} setState={setFilterState} state={filters} stateKey={"excluded_topics"} />
      <Select classNames={{ formGroup: 'mb-5' }} multiple label={"Excluded Subjects"} items={allSubjects} setState={setFilterState} state={filters} stateKey={"excluded_subjects"} />
      <Select classNames={{ formGroup: 'mb-5' }} multiple label={"Excluded Columns"}
        renderValue={(selected) => (selected as string[]).map((report_stat, index) => <div key={report_stat + "excluded_columns" + index}>{transformTextBySeparator(report_stat)}</div>)}
        items={["contexts", "question", "image", "question_stats", "user_stats", "score_breakdown", "quiz_info", "hints", "answers", "options", "report_stats", "play_options", "play_filters", "report_export", "report_aggregator", "report_info"]}
        setState={setFilterState}
        state={filters}
        stateKey={"excluded_columns"}
      />
      <Sort max={3} header={"Report Sort"} sorts={sort} setSorts={(sort: any) => {
        setReportSettings({
          ...reportSettings,
          sort
        })
      }} items={["Score", "Time Taken", "Hints Used", "Verdict", "Type", "Difficulty", "Time Allocated", "Weight"]} />
    </div>
    <Button variant="contained" color="primary" onClick={() => {
      setReportSettings(generateDefaultReportSettingsState())
    }} style={{ width: "calc(100% - 5px)" }}>Reset</Button>
  </div>
}