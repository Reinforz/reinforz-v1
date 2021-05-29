import { Button } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useContext } from "react";
import { PlayContext } from '../../../context/PlayContext';
import { CheckboxGroup, InputRange, RadioGroup, Select } from '../../../shared';
import { IReportFilterState } from "../../../types";
import { createDefaultReportFilterState } from '../../../utils';
import "./ReportFilter.scss";

const transformLabel = (stat: string) => {
  let label = stat.replace(/(\.|_)/g, " ");
  return label.split(" ").map(c => c.charAt(0).toUpperCase() + c.substr(1)).join(" ");
}

interface Props {
  reportFilter: IReportFilterState,
  setReportFilter: Dispatch<SetStateAction<IReportFilterState>>
}

export default function ReportFilter(props: Props) {
  const { setReportFilter, reportFilter } = props;

  const { selectedQuizzes } = useContext(PlayContext);

  return <div className="ReportFilter">
    <InputRange label={"Time taken range"} min={0} max={60} setState={setReportFilter} state={reportFilter} stateKey={"time_taken"} />
    <RadioGroup items={["true", "false", "mixed"]} label={"Verdict"} setState={setReportFilter} state={reportFilter} stateKey={"verdict"} />
    <RadioGroup items={["0", "1", "2", "any"]} label={"Hints Used"} setState={setReportFilter} state={reportFilter} stateKey={"hints_used"} />
    <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setReportFilter} stateKey={'excluded_difficulty'} state={reportFilter} />
    <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setReportFilter} stateKey={'excluded_types'} state={reportFilter} />
    <Select multiple label={"Excluded Quizzes"} items={selectedQuizzes} menuItemLabel={(item) => item} setState={setReportFilter} state={reportFilter} stateKey={"excluded_quizzes"} />
    <Select multiple label={"Excluded Columns"}
      renderValue={(selected) => (selected as string[]).map((report_stat, index) => <div key={report_stat + "excluded_columns" + index}>{transformLabel(report_stat)}</div>)}
      items={["quiz", "subject", "question", "type", "difficulty", "verdict", "score", "time_allocated", "time_taken", "answers", "weight", "user_answers", "hints_used"]}
      menuItemLabel={(item) => transformLabel(item)}
      setState={setReportFilter}
      state={reportFilter}
      stateKey={"excluded_columns"}
    />
    <Button variant="contained" color="primary" onClick={() => {
      setReportFilter(createDefaultReportFilterState())
    }} style={{ width: "100%" }}>Reset</Button>
  </div>
}