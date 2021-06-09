import { FormGroup, InputLabel } from "@material-ui/core";
import { Select } from "..";
import { transformTextBySeparator } from "../../utils";
import "./style.scss";

interface Props {
  label: string
  setState: (state: any) => void
  state: any
  stateKey: string
  groupItems: [string[], string, string][]
}

export default function SelectGroup(props: Props) {
  const { label, setState, state, stateKey, groupItems } = props;
  return <FormGroup className="Select-Group" style={{
    flexDirection: 'column'
  }}>
    <InputLabel className="Select-Group-header">
      {label}
    </InputLabel>
    <div className="Select-Group-content">
      {groupItems.map(([items, label, itemStateKey]) => <Select className="Select-Group-content-item" items={items} label={label} setState={(newState) => {
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