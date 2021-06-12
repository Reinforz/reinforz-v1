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
        e.persist();
        const { altKey, shiftKey, ctrlKey } = e.nativeEvent as unknown as {
          altKey: boolean
          shiftKey: boolean
          ctrlKey: boolean
        }

        const { checked } = e.target

        if (checked) {
          settings.sound && sounds.pop_off.play();
        } else {
          settings.sound && sounds.pop_on.play();
        }

        if (shiftKey && !ctrlKey && !altKey) {
          props.setState({ ...props.state, [props.stateKey]: (new Array(index + 1)).fill(null).map((_, index) => props.items[index]) });
        } else if (shiftKey && !ctrlKey && altKey) {
          const excludedItems = (new Array(index + 1)).fill(null).map((_, index) => props.items[index])
          props.setState({ ...props.state, [props.stateKey]: items.filter(item => !excludedItems.includes(item)) });
        } else if (!shiftKey && !ctrlKey && altKey) {
          if (checked) props.setState({ ...props.state, [props.stateKey]: props.items[index] });
          else {
            props.setState({ ...props.state, [props.stateKey]: props.items.filter(item => item !== props.items[index]) })
          }
        }
        else if (!shiftKey && !ctrlKey && !altKey) {
          const finalItems = checked ? items.concat(item) : items.filter(_item => _item !== item);
          props.onChange && props.onChange(finalItems)
          props.setState({ ...props.state, [props.stateKey]: finalItems });

          if (props.lsKey) {
            localStorage.setItem(props.lsKey, JSON.stringify({
              ...props.state,
              [props.stateKey]: finalItems
            }))
          }
        }
      }}
        color="primary" />} />)}
    </div>
  </FormGroup>
}