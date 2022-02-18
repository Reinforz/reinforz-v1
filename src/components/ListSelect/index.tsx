import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import useSounds from "../../hooks/useSounds";
import { transformTextBySeparator } from "../../utils";

export interface ListSelectProps {
  item: string
  label?: string
  items: string[]
  menuItemLabel?: (item: string) => string
  onChange: (item: string) => void
}

export default function ListSelect(props: ListSelectProps) {
  const { items, onChange, item, label, menuItemLabel } = props;
  const { click } = useSounds();
  return <FormGroup className="ListSelect pb-0">
    {label && <InputLabel>{label}</InputLabel>}
    <div className="Select-content bg-light flex fd-c p-5">
      <MuiSelect disableUnderline value={item}
        onChange={(e) => {
          click();
          onChange(e.target.value as string)
        }}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}