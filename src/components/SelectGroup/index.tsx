import { FormGroup, InputLabel } from "@material-ui/core";
import { Select } from "..";
import { transformTextBySeparator } from "../../utils";
import "./style.scss";

export interface SelectGroupProps {
  label: string
  setState: (state: any) => void
  state: any
  stateKey: string
  groupItems: [string[], string, string][]
}

export default function SelectGroup(props: SelectGroupProps) {
  const { label, setState, state, stateKey, groupItems } = props;
  return <FormGroup className="Select-Group fd-c">
    <InputLabel className="Select-Group-header">
      {label}
    </InputLabel>
    <div className="Select-Group-content">
      {groupItems.map(([items, label, itemStateKey], index) => <Select key={index} className="Select-Group-content-item" items={items} label={label} setState={(newState) => {
        setState({
          ...state,
          [stateKey]: {
            ...state[stateKey],
            ...newState
          }
        })
      }} state={state[stateKey]} stateKey={itemStateKey} menuItemLabel={(item) => transformTextBySeparator(item)} />)}
    </div>
  </FormGroup>
}