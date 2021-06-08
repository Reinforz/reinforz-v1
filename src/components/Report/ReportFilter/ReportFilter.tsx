import { Button } from '@material-ui/core';
import React, { useContext } from "react";
import { ReportContext } from '../../../context/ReportContext';
import { useThemeSettings } from '../../../hooks';
import { CheckboxGroup, InputRange, RadioGroup, Select, Sort } from '../../../shared';
import { createDefaultReportFilterState, transformTextBySeparator } from '../../../utils';
import "./ReportFilter.scss";

export default function ReportFilter() {
  const { theme } = useThemeSettings();
  const { allQuizzesMap, setReportFilter, reportFilter, setReportSort, reportSort } = useContext(ReportContext);

  return <div className="ReportFilter" style={{ backgroundColor: theme.color.dark }}>
    <InputRange label={"Time taken range"} min={0} max={120} setState={setReportFilter} state={reportFilter} stateKey={"time_taken"} />
    <InputRange step={0.25} label={"Score"} min={0} max={1} setState={setReportFilter} state={reportFilter} stateKey={"score"} />
    <InputRange step={1} label={"Hints Used"} min={0} max={10} setState={setReportFilter} state={reportFilter} stateKey={"hints_used"} />
    <RadioGroup itemLabel={(item) => item === "true" ? "Correct" : item === "false" ? "Incorrect" : "Any"} items={["true", "false", "any"]} label={"Verdict"} setState={setReportFilter} state={reportFilter} stateKey={"verdict"} />
    <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setReportFilter} stateKey={'excluded_difficulty'} state={reportFilter} />
    <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setReportFilter} stateKey={'excluded_types'} state={reportFilter} />
    <Select multiple label={"Excluded Quizzes"} items={Array.from(allQuizzesMap.keys())} menuItemLabel={(quiz_id) => {
      const selectedQuiz = allQuizzesMap.get(quiz_id)!;
      return `${selectedQuiz.subject} - ${selectedQuiz.topic}`
    }} setState={setReportFilter} state={reportFilter} stateKey={"excluded_quizzes"} />
    <Select multiple label={"Excluded Topics"} items={Array.from(allQuizzesMap.values()).map(quiz => quiz.topic)} menuItemLabel={(topic) => topic} setState={setReportFilter} state={reportFilter} stateKey={"excluded_topics"} />
    <Select multiple label={"Excluded Subjects"} items={Array.from(allQuizzesMap.values()).map(quiz => quiz.subject)} menuItemLabel={(topic) => topic} setState={setReportFilter} state={reportFilter} stateKey={"excluded_subjects"} />
    <Select multiple label={"Excluded Columns"}
      renderValue={(selected) => (selected as string[]).map((report_stat, index) => <div key={report_stat + "excluded_columns" + index}>{transformTextBySeparator(report_stat)}</div>)}
      items={["question", "image", "question_stats", "user_stats", "score_breakdown", "quiz_stats", "hints", "answers", "options", "report_stats", "play_options", "play_filters", "report_export", "report_aggregator", "report_info"]}
      menuItemLabel={(item) => transformTextBySeparator(item)}
      setState={setReportFilter}
      state={reportFilter}
      stateKey={"excluded_columns"}
    />
    <Sort maxSort={3} header={"Report Sort"} sorts={reportSort} setSorts={setReportSort} items={["Score", "Time Taken", "Hints Used", "Verdict", "Type", "Difficulty", "Time Allocated", "Weight"]} menuItemLabel={(item) => item} />
    <Button variant="contained" color="primary" onClick={() => {
      setReportFilter(createDefaultReportFilterState())
    }} style={{ width: "calc(100% - 5px)" }}>Reset</Button>
  </div>
}