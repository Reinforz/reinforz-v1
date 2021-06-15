import { Checkbox, FormControlLabel, FormGroup, InputLabel } from "@material-ui/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { FlexContent } from "../";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";
import { applyCheckboxShortcut } from "../../utils";

export interface CheckboxGroupProps<I extends Record<string, any>> {
  label: string
  setState: Dispatch<SetStateAction<I>>
  stateKey: keyof I
  items: string[]
  state: I
}

export default function CheckboxGroup<I extends Record<string, any>>(props: CheckboxGroupProps<I>) {
  const items: string[] = props.state[props.stateKey];
  const { settings } = useContext(SettingsContext);

  return <FormGroup className="CheckboxGroup p-5">
    <InputLabel>{props.label}</InputLabel>
    <FlexContent className="CheckboxGroup-content pb-0" direction="column">
      {props.items.map((item, index) => <FormControlLabel className="mb-5" key={item + index} label={item} control={<Checkbox checked={items.includes(item)} name={item} onChange={(e) => {
        e.persist();
        settings.sound && e.target.checked ? sounds.pop_off.play() : sounds.pop_on.play();
        props.setState({ ...props.state, [props.stateKey]: [...applyCheckboxShortcut(e, props.items, items, index)] });
      }}
        color="primary" />} />)}
    </FlexContent>
  </FormGroup>
}