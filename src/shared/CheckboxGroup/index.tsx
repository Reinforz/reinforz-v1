import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

interface Props<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
}

export default function CheckboxGroup<I extends Record<string, any>>(props: Props<I>) {
  const items: string[] = props.state[props.stateKey];
  return <FormGroup>
    <InputLabel>{props.label}</InputLabel>
    {props.items.map((item, index) => <FormControlLabel key={item + index} label={item} control={<Checkbox checked={items.includes(item)} name={item} onChange={(e) => {
      if ((e.target as any).checked) {
        props.setState({ ...props.state, [props.stateKey]: items.concat(item) });
      }
      else {
        props.setState({ ...props.state, [props.stateKey]: items.filter(_item => _item !== item) })
      }
    }}
      color="primary" />} />)}
  </FormGroup>
}