import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@material-ui/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { applyCheckboxShortcut } from "../../utils";

export interface CheckboxGroupProps<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
}

export default function CheckboxGroup<I extends Record<string, any>>(props: CheckboxGroupProps<I>) {
  const items: string[] = props.state[props.stateKey];
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  return <FormGroup>
    <InputLabel>{props.label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="CheckboxGroup-content">
      {props.items.map((item, index) => <FormControlLabel key={item + index} label={item} control={<Checkbox checked={items.includes(item)} name={item} onChange={(e) => {
        e.persist();
        settings.sound && e.target.checked ? sounds.pop_off.play() : sounds.pop_on.play();
        props.setState({ ...props.state, [props.stateKey]: [...applyCheckboxShortcut(e, props.items, items, index)] });
      }}
        color="primary" />} />)}
    </div>
  </FormGroup>
}