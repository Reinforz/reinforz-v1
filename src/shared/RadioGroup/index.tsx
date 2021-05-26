import { FormControlLabel, InputLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

interface Props<I> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
}

export default function RadioGroup<I>(props: Props<I>) {
  return <MuiRadioGroup name={props.stateKey.toString()} value={props.state[props.stateKey]} >
    <InputLabel>{props.label}</InputLabel>
    {props.items.map((item, index) => <FormControlLabel onClick={(e: any) => {
      props.setState({ ...props.state, [props.stateKey]: e.target.value })
    }} key={item + index} value={item} control={<Radio color="primary" />} label={item} />)}
  </MuiRadioGroup>
}