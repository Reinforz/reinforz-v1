import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";
import { transformTextBySeparator } from "../../utils";

export interface ListSelectProps {
  item: string
  label?: string
  items: string[]
  menuItemLabel?: (item: string) => string
  onChange: (item: string) => void
}

export default function ListSelect(props: ListSelectProps) {
  const { settings } = useContext(SettingsContext);
  const { items, onChange, item, label, menuItemLabel } = props;
  return <FormGroup className="ListSelect pb-0">
    {label && <InputLabel>{label}</InputLabel>}
    <div className="Select-content bg-light flex fd-c p-5 mb-5">
      <MuiSelect value={item}
        onChange={(e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
          settings.sound && sounds.click.play();
          onChange(e.target.value as string)
        }}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}