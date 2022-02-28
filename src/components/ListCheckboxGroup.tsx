import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ReactElement } from "react";
import useSounds from "../hooks/useSounds";
export interface ListCheckboxGroupProps {
    setState: (items: string[]) => any;
    items: ReactElement[];
    value: string[];
}
export default function ListCheckboxGroup(props: ListCheckboxGroupProps) {
    const { items, setState, value } = props;
    const { pop_off, pop_on } = useSounds();
    return <FormGroup className="ListCheckboxGroup bg-base pb-0" onChange={(e: any) => {
            if (e.target.checked) {
                pop_off();
                setState(value.concat(e.target.value));
            }
            else {
                pop_on();
                setState(value.filter(value => value !== e.target.value));
            }
        }}>
    {items.map((item, i) => {
            return <FormControlLabel key={`option${i}`} className={`ListCheckboxGroup-FormControlLabel bg-light mb-1 p-10`} control={<Checkbox className="mr-2" checked={value.includes(`${i}`)} value={`${i}`} color="primary"/>} label={item}/>;
        })}
  </FormGroup>;
}
