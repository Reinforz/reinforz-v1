import { FormGroup, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { TNumberOperator } from "../../types";
import { transformTextBySeparator } from "../../utils";

export interface InputRangeProps<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  min: number
  max: number
  step?: number
  direction?: 'row' | 'column'
}

export default function InputRange<T extends Record<string, any>>(props: InputRangeProps<T>) {
  const { direction = 'row', min, max, setState, state, stateKey, label, step = 5 } = props;
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  const [operator, range]: [TNumberOperator, [string, string]] = state[stateKey]
  return <FormGroup>
    <InputLabel>{label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: direction, padding: 2.5, margin: 2.5 }} className="InputRange-content">
      <div style={{ background: theme.color.light, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }}>
        <Select value={operator}
          onChange={(e: ChangeEvent<{ value: unknown }>) => {
            setState({ ...state, [stateKey]: [e.target.value, range] })
            settings.sound && sounds.click.play();
          }}>
          {["=", "<=", "<>", ">=", "<", ">", "!", "><"].map(item =>
            <MenuItem key={item} value={item}>{transformTextBySeparator(item)}</MenuItem>
          )}
        </Select>
      </div>
      <TextField style={{ flex: 1 }} type="number" inputProps={{ step, min, max: parseInt(range[1]) }} value={parseInt(range[0])} onChange={(e) => {
        setState({ ...state, [stateKey]: [operator, [e.target.value, parseInt(range[1])]] })
        settings.sound && sounds.click.play()
      }} />
      {["<>", "><"].includes(operator) && <TextField style={{ flex: 1 }} type="number" inputProps={{ step, min: parseInt(range[0]), max }} value={parseInt(range[1])} onChange={(e) => {
        settings.sound && sounds.click.play()
        setState({ ...state, [stateKey]: [operator, [parseInt(range[0]), e.target.value]] })
      }} />}
    </div>
  </FormGroup>
}