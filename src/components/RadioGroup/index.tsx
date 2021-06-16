import { FormControlLabel, InputLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
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
}

export default function RadioGroup<I>(props: RadioGroupProps<I>) {
  const { settings } = useThemeSettings();
  const itemDirection = props.itemDirection ?? 'column';
  const contentPaddingStyle = itemDirection === 'column' ? 'pb-0' : 'pr-0';
  const itemPaddingStyle = itemDirection === 'column' ? 'mb-5' : 'mr-5';
  return <MuiRadioGroup name={props.stateKey.toString()} value={props.state[props.stateKey]} >
    <InputLabel>{props.label}</InputLabel>
    <div style={{ flexDirection: itemDirection }} className={`RadioGroup-content bg-dark p-5 ${contentPaddingStyle} flex`}>
      {props.items.map((item, index) => <FormControlLabel className={`${itemPaddingStyle} flex-1`} onClick={(e: any) => {
        settings.sound && sounds.click.play()
        props.setState({ ...props.state, [props.stateKey]: e.target.value })
        props.onClick && props.onClick(e);
        if (props.lsKey) {
          localStorage.setItem(props.lsKey, JSON.stringify({
            ...props.state,
            [props.stateKey]: e.target.value
          }))
        }
      }} key={item + index} value={item} control={<Radio size="small" color="primary" />} label={props.itemLabel ? props.itemLabel(item) : transformTextBySeparator(item)} />)}
    </div>
  </MuiRadioGroup>
}