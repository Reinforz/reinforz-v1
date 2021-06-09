import { FormGroup, InputLabel, TextField } from "@material-ui/core";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
interface Props<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  min: number
  max: number
  step?: number
  direction?: 'row' | 'column'
}

export default function InputRange<T extends Record<string, any>>(props: Props<T>) {
  const { direction = 'row', min, max, setState, state, stateKey, label, step = 5 } = props;
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  const range: [number, number] = state[stateKey]
  return <FormGroup>
    <InputLabel>{label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: direction, padding: 2.5, margin: 2.5 }} className="InputRange-content">
      <TextField style={{ flex: 1 }} type="number" inputProps={{ step, min, max: range[1] }} value={range[0]} onChange={(e) => {
        setState({ ...state, [stateKey]: [e.target.value, range[1]] })
        settings.sound && sounds.click.play()
      }} />
      <TextField style={{ flex: 1 }} type="number" inputProps={{ step, min: range[0], max }} value={range[1]} onChange={(e) => {
        settings.sound && sounds.click.play()
        setState({ ...state, [stateKey]: [range[0], e.target.value] })
      }} />
    </div>
  </FormGroup>
}