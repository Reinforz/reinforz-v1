import { FormControlLabel, InputLabel, Radio, RadioGroup as MuiRadioGroup } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import useSounds from "../../hooks/useSounds";
import { transformTextBySeparator } from "../../utils";

export interface RadioGroupProps<I> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => any
  lsKey?: string
  itemLabel?: (item: string) => JSX.Element | string
  itemDirection?: 'row' | 'column'
  classNames?: {
    radioGroup?: string
    inputLabel?: string
    content?: string
    formControlLabel?: string
    radio?: string
  }
}

export default function RadioGroup<I>(props: RadioGroupProps<I>) {
  const { click } = useSounds();
  const { classNames = {} } = props;

  const itemDirection = props.itemDirection ?? 'column';
  const contentPaddingStyle = itemDirection === 'column' ? 'pb-0' : 'pr-0';
  const itemPaddingStyle = itemDirection === 'column' ? 'mb-5' : 'mr-5';
  return <MuiRadioGroup className={`${classNames.radioGroup ?? ''}`} name={props.stateKey.toString()} value={props.state[props.stateKey]} >
    <InputLabel className={`${classNames.inputLabel ?? ''}`}>{props.label}</InputLabel>
    <div style={{ flexDirection: itemDirection }} className={`RadioGroup-content bg-dark p-5 ${contentPaddingStyle} flex ${classNames.content ?? ''}`}>
      {props.items.map((item, index) => <FormControlLabel className={`${itemPaddingStyle} flex-1 ${classNames.formControlLabel ?? ''}`} onClick={(e: any) => {
        click()
        props.setState({ ...props.state, [props.stateKey]: e.target.value })
        props.onClick && props.onClick(e);
        if (props.lsKey) {
          localStorage.setItem(props.lsKey, JSON.stringify({
            ...props.state,
            [props.stateKey]: e.target.value
          }))
        }
      }} key={item + index} value={item} control={<Radio className={`${classNames.radio ?? ''}`} size="small" color="primary" />} label={props.itemLabel ? props.itemLabel(item) : transformTextBySeparator(item)} />)}
    </div>
  </MuiRadioGroup>
}