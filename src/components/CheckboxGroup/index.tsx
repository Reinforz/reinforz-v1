import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { FlexContent } from "../";
import useSounds from "../../hooks/useSounds";
import { applyCheckboxShortcut } from "../../utils";

export interface CheckboxGroupProps<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
  classNames?: {
    formGroup?: string
    inputLabel?: string
    content?: string
    checkbox?: string
    formControlLabel?: string
  }
}

export default function CheckboxGroup<I extends Record<string, any>>(props: CheckboxGroupProps<I>) {
  const items: string[] = props.state[props.stateKey];
  const { classNames = {} } = props;
  const { pop_off, pop_on } = useSounds();

  return <FormGroup className={`CheckboxGroup flex flex-col gap-1 ${classNames.formGroup ?? ''}`}>
    <InputLabel className={`${classNames.inputLabel ?? ''} text-lg`}>{props.label}</InputLabel>
    <FlexContent className={`CheckboxGroup-content flex flex-col gap-1 ${classNames.content ?? ''}`} direction="column">
      {props.items.map((item, index) => <FormControlLabel className={classNames.formControlLabel ?? ''} key={item + index} label={item} control={<Checkbox className={`${classNames.checkbox ?? ''}`} checked={items.includes(item)} name={item} onChange={(e) => {
        e.persist();
        e.target.checked ? pop_off() : pop_on();
        props.setState({ ...props.state, [props.stateKey]: [...applyCheckboxShortcut(e, props.items, items, index)] });
      }}
        color="primary" />} />)}
    </FlexContent>
  </FormGroup>
}