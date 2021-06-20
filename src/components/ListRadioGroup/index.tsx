import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { ReactNode } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";

interface Props {
  setState: (items: string[]) => any
  items: ReactNode[]
  value: string[]
}

export default function ListRadioGroup(props: Props) {
  const { items, setState, value } = props;
  const { settings } = useThemeSettings();
  return <RadioGroup className="ListRadioGroup-container ListRadioGroup-container-MCQ bg-base" value={value.length === 0 ? [''] : value[0]} onChange={e => {
    settings.sound && sounds.option_click.play();
    setState([e.target.value])
  }}>
    {items.map((label, i) => {
      return <div key={`option${i}`} className="ListRadioGroup-container-item bg-light">
        <FormControlLabel
          control={<Radio color="primary" />}
          value={`${i}`}
          label={label}
          labelPlacement="end"
        />
      </div>
    })}
  </RadioGroup>
}