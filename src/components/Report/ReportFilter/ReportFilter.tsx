import { Button } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useContext } from "react";
import { PlayContext } from '../../../context/PlayContext';
import { useThemeSettings } from '../../../hooks';
import { CheckboxGroup, InputRange, RadioGroup, Select } from '../../../shared';
import { IReportFilter } from "../../../types";
import { createDefaultReportFilterState } from '../../../utils';
import "./ReportFilter.scss";

const transformLabel = (stat: string) => {
  let label = stat.replace(/(\.|_)/g, " ");
  return label.split(" ").map(c => c.charAt(0).toUpperCase() + c.substr(1)).join(" ");
}

interface Props {
  reportFilter: IReportFilter,
  setReportFilter: Dispatch<SetStateAction<IReportFilter>>
}

export default function ReportFilter(props: Props) {
  const { setReportFilter, reportFilter } = props;
  const { theme } = useThemeSettings();
  const { selectedQuizIds, selectedQuizzes } = useContext(PlayContext);

  return <div className="ReportFilter" style={{ backgroundColor: theme.color.dark }}>
    <InputRange label={"Time taken range"} min={0} max={120} setState={setReportFilter} state={reportFilter} stateKey={"time_taken"} />
    <RadioGroup lsKey={"REPORT_FILTERS"} items={["true", "false", "mixed"]} label={"Verdict"} setState={setReportFilter} state={reportFilter} stateKey={"verdict"} />
    <RadioGroup lsKey={"REPORT_FILTERS"} items={["0", "1", "2", "any"]} label={"Hints Used"} setState={setReportFilter} state={reportFilter} stateKey={"hints_used"} />
    <CheckboxGroup lsKey={"REPORT_FILTERS"} label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setReportFilter} stateKey={'excluded_difficulty'} state={reportFilter} />
    <CheckboxGroup lsKey={"REPORT_FILTERS"} label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setReportFilter} stateKey={'excluded_types'} state={reportFilter} />
    <Select multiple label={"Excluded Quizzes"} items={selectedQuizIds} menuItemLabel={(item) => {
      const selectedQuiz = selectedQuizzes.find(selectedQuiz => selectedQuiz._id === item)!;
      return `${selectedQuiz.subject} - ${selectedQuiz.topic}`
    }} setState={setReportFilter} state={reportFilter} stateKey={"excluded_quizzes"} />
    <Select lsKey={"REPORT_FILTERS"} multiple label={"Excluded Columns"}
      renderValue={(selected) => (selected as string[]).map((report_stat, index) => <div key={report_stat + "excluded_columns" + index}>{transformLabel(report_stat)}</div>)}
      items={["quiz", "subject", "question", "type", "difficulty", "verdict", "score", "time_allocated", "time_taken", "answers", "weight", "user_answers", "hints_used"]}
      menuItemLabel={(item) => transformLabel(item)}
      setState={setReportFilter}
      state={reportFilter}
      stateKey={"excluded_columns"}
    />
    <Button variant="contained" color="primary" onClick={() => {
      setReportFilter(createDefaultReportFilterState())
    }} style={{ width: "calc(100% - 5px)" }}>Reset</Button>
  </div>
}