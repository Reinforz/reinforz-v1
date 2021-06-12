import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@material-ui/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { applyCheckboxShortcut } from "../../utils";

interface Props<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
}

export default function CheckboxGroup<I extends Record<string, any>>(props: Props<I>) {
  const items: string[] = props.state[props.stateKey];
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  return <FormGroup>
    <InputLabel>{props.label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="CheckboxGroup-content">
      {props.items.map((item, index) => <FormControlLabel key={item + index} label={item} control={<Checkbox checked={items.includes(item)} name={item} onChange={(e) => {
        e.persist();
        const { checked } = e.target

        if (checked) {
          settings.sound && sounds.pop_off.play();
        } else {
          settings.sound && sounds.pop_on.play();
        }

        const finalItems = applyCheckboxShortcut(e, props.items, items, index);
        props.setState({ ...props.state, [props.stateKey]: finalItems });
      }}
        color="primary" />} />)}
    </div>
  </FormGroup>
}