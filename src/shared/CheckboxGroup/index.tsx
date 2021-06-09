import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@material-ui/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";

interface Props<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
  onChange?: (items: string[]) => void
  lsKey?: string
}

export default function CheckboxGroup<I extends Record<string, any>>(props: Props<I>) {
  const items: string[] = props.state[props.stateKey];
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  return <FormGroup>
    <InputLabel>{props.label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="CheckboxGroup-content">
      {props.items.map((item, index) => <FormControlLabel key={item + index} label={item} control={<Checkbox checked={items.includes(item)} name={item} onChange={(e) => {
        const finalItems = e.target.checked ? items.concat(item) : items.filter(_item => _item !== item);
        props.onChange && props.onChange(finalItems)
        props.setState({ ...props.state, [props.stateKey]: finalItems });
        if (e.target.checked) {
          settings.sound && sounds.pop_on.play();
        } else {
          settings.sound && sounds.pop_off.play();
        }

        if (props.lsKey) {
          localStorage.setItem(props.lsKey, JSON.stringify({
            ...props.state,
            [props.stateKey]: finalItems
          }))
        }
      }}
        color="primary" />} />)}
    </div>
  </FormGroup>
}