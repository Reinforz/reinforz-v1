import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ReactElement } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";

export interface ListRadioGroupProps {
  setState: (items: string[]) => any
  items: ReactElement[]
  value: string[]
}

export default function ListRadioGroup(props: ListRadioGroupProps) {
  const { items, setState, value } = props;
  const { settings } = useThemeSettings();
  return <RadioGroup className="ListRadioGroup bg-base pb-0" value={value.length === 0 ? [''] : value[0]} onChange={e => {
    settings.sound && sounds.option_click.play();
    setState([e.target.value])
  }}>
    {items.map((label, i) => {
      return <FormControlLabel
        key={`option${i}`} className="ListRadioGroup-FormControlLabel bg-light mb-5"
        control={<Radio color="primary" />}
        value={`${i}`}
        label={label}
        labelPlacement="end"
      />
    })}
  </RadioGroup>
}