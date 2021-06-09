import { FormControlLabel, InputLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";

interface Props<I> {
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

export default function RadioGroup<I>(props: Props<I>) {
  const { theme, settings } = useThemeSettings();
  const itemDirection = props.itemDirection ?? 'column';

  return <MuiRadioGroup name={props.stateKey.toString()} value={props.state[props.stateKey]} >
    <InputLabel>{props.label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: itemDirection, padding: 2.5, margin: 2.5 }} className="RadioGroup-content">
      {props.items.map((item, index) => <FormControlLabel onClick={(e: any) => {
        settings.sound && sounds.click.play()
        props.setState({ ...props.state, [props.stateKey]: e.target.value })
        props.onClick && props.onClick(e);
        if (props.lsKey) {
          localStorage.setItem(props.lsKey, JSON.stringify({
            ...props.state,
            [props.stateKey]: e.target.value
          }))
        }
      }} key={item + index} value={item} control={<Radio size="small" color="primary" />} label={props.itemLabel ? props.itemLabel(item) : item} />)}
    </div>
  </MuiRadioGroup>
}