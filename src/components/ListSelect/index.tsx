import { Box, FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
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
  return <FormGroup className="ListSelect">
    {label && <InputLabel>{label}</InputLabel>}
    <Box className="Select-content bg-light flex flex-col p-1">
      <MuiSelect variant="standard" value={item}
        onChange={(e) => {
          click();
          onChange(e.target.value as string)
        }}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
        )}
      </MuiSelect>
    </Box>
  </FormGroup>
}