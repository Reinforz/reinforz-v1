import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { ChangeEvent } from "react";
import { useThemeSettings } from "../../hooks";

interface Props {
  item: string
  label?: string
  items: string[]
  menuItemLabel: (item: string) => string
  onChange: (item: string) => void
}

export default function ListSelect(props: Props) {
  const { theme } = useThemeSettings();
  const { items, onChange, item, label, menuItemLabel } = props;
  return <FormGroup>
    {label && <InputLabel>{label}</InputLabel>}
    <div style={{ background: theme.color.light, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Select-content">
      <MuiSelect value={item}
        onChange={(e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => onChange(e.target.value as string)}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}