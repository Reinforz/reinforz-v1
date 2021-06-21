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
  return <FormGroup className="ListCheckboxGroup bg-base pb-0" onChange={(e: any) => {
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
        key={`option${i}`} className={`ListCheckboxGroup-FormControlLabel bg-light mb-5 p-10`}
        control={<Checkbox className="mr-10" checked={value.includes(`${i}`)} value={`${i}`} color="primary" />}
        label={item}
      />
    })}
  </FormGroup>
}