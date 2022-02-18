import { Box, FormGroup, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import useSounds from "../../hooks/useSounds";
import { transformTextBySeparator } from "../../utils";

export interface ISelectClassNames {
  formGroup?: string
  inputLabel?: string
  content?: string
  select?: string
}

export interface SelectProps<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  items: string[]
  menuItemLabel?: (item: string) => string
  renderValue?: (selected: unknown) => ReactNode
  multiple?: boolean
  onChange?: (e: SelectChangeEvent<string[]>) => void
  lsKey?: string
  className?: string
  classNames?: ISelectClassNames
}

export default function Select<T extends Record<string, any>>(props: SelectProps<T>) {
  const { click } = useSounds();
  const { items, multiple = false, renderValue, className = '', menuItemLabel, state, stateKey, setState, classNames = {} } = props;
  return <FormGroup className={`Select ${className ?? ''} ${classNames.formGroup ?? ''}`}>
    <InputLabel className={`${classNames.inputLabel ?? ''}`}>{props.label}</InputLabel>
    <Box className={`Select-content flex fd-c bg-light p-2_5 ${classNames.content ?? ''}`}>
      <MuiSelect disableUnderline className={`${classNames.select ?? ''}`} value={state[stateKey] as string[]}
        multiple={multiple}
        renderValue={(items) => renderValue ? renderValue(items) : multiple ? (items as string[]).map((item) => transformTextBySeparator(item)).join(", ") : transformTextBySeparator(items.join("") as string) as ReactNode}
        onChange={(e) => {
          click();
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
    </Box>
  </FormGroup>
}