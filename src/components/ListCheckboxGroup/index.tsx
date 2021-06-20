import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { ReactNode } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";

export interface ListCheckboxGroupProps {
  setState: (items: string[]) => any
  items: ReactNode[]
  value: string[]
}

export default function ListCheckboxGroup(props: ListCheckboxGroupProps) {
  const { items, setState, value } = props;
  const { settings } = useThemeSettings();
  return <FormGroup className="ListCheckboxGroup mb-5 bg-base" onChange={(e: any) => {
    if (e.target.checked) {
      settings.sound && sounds.pop_off.play();
      setState(value.concat(e.target.value))
    }
    else {
      settings.sound && sounds.pop_on.play();
      setState(value.filter(value => value !== e.target.value));
    }
  }}>
    {items.map((item, i) => {
      return <FormControlLabel
        key={`option${i}`} className={`ListCheckboxGroup-FormControlLabel bg-light`}
        control={<Checkbox checked={items.includes(`${i}`)} value={`${i}`} color="primary" />}
        label={item}
      />
    })}
  </FormGroup>
}