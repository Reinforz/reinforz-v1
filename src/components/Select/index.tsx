import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";

interface Props<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: (value: React.SetStateAction<T>) => void
  items: string[]
  menuItemLabel: (item: string) => string
  renderValue?: (selected: any) => JSX.Element[]
  multiple?: boolean
  onChange?: (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void
  lsKey?: string
  className?: string
}

export default function Select<T extends Record<string, any>>(props: Props<T>) {
  const { settings } = useContext(SettingsContext);
  const { items, multiple, renderValue, className = '', menuItemLabel, state, stateKey, setState } = props;
  return <FormGroup className={`Select ${className}`}>
    <InputLabel>{props.label}</InputLabel>
    <div style={{ display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Select-content bg-light">
      <MuiSelect value={state[stateKey] as string[]}
        multiple={Boolean(multiple)}
        renderValue={renderValue}
        onChange={(e) => {
          settings.sound && sounds.click.play();
          setState({ ...state, [stateKey]: e.target.value as string[] })
          props.onChange && props.onChange(e)
          if (props.lsKey) {
            localStorage.setItem(props.lsKey, JSON.stringify({
              ...props.state,
              [stateKey]: e.target.value
            }))
          }
        }}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}