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
  className?: string
  classNames?: {
    formGroup?: string
    inputLabel?: string
    content?: string
    select?: {
      formGroup?: string
      inputLabel?: string
      content?: string
      select?: string
    }
  }
}

export default function SelectGroup(props: SelectGroupProps) {
  const { label, setState, state, stateKey, className = '', groupItems, classNames = {} } = props;
  return <FormGroup className={`Select-Group fd-c ${className} ${classNames.formGroup}`}>
    <InputLabel className={`Select-Group-header ${classNames.inputLabel}`}>
      {label}
    </InputLabel>
    <div className={`Select-Group-content flex jc-c ai-c ${classNames.content}`}>
      {groupItems.map(([items, label, itemStateKey], index) => <Select key={index} classNames={classNames.select ?? {}} className={`Select-Group-content-item flex-1 p-0 ${index !== groupItems.length - 1 ? ' mr-5' : ''}`} items={items} label={label} setState={(newState) => {
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