import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { ChangeEvent, ReactNode, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";
import { transformTextBySeparator } from "../../utils";

export interface SelectProps<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  items: string[]
  menuItemLabel?: (item: string) => string
  renderValue?: (selected: unknown) => ReactNode
  multiple?: boolean
  onChange?: (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void
  lsKey?: string
  className?: string
  classNames?: {
    formGroup?: string
    inputLabel?: string
    content?: string
    select?: string
  }
}

export default function Select<T extends Record<string, any>>(props: SelectProps<T>) {
  const { settings } = useContext(SettingsContext);
  const { items, multiple = false, renderValue, className = '', menuItemLabel, state, stateKey, setState, classNames = {} } = props;
  return <FormGroup className={`Select ${className ?? ''} ${classNames.formGroup ?? ''}`}>
    <InputLabel className={`${classNames.inputLabel ?? ''}`}>{props.label}</InputLabel>
    <div className={`Select-content flex fd-c bg-light p-2_5 ${classNames.content ?? ''}`}>
      <MuiSelect disableUnderline className={`${classNames.select ?? ''}`} value={state[stateKey] as string[]}
        multiple={multiple}
        renderValue={(items) => renderValue ? renderValue(items) : multiple ? (items as string[]).map((item) => transformTextBySeparator(item)).join(", ") : transformTextBySeparator(items as string) as ReactNode}
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
          <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}