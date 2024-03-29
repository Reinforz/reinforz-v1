import { Box, FormGroup, InputLabel } from "@mui/material";
import { ReactNode } from "react";
import { Select } from "./";
import { transformTextBySeparator } from "../utils";
import { ISelectClassNames } from "./Select";
import "./SelectGroup.scss";
export interface SelectGroupProps {
    label: string;
    setState: (state: any) => void;
    state: any;
    stateKey: string;
    groupItems: [
        string[],
        string,
        string
    ][];
    menuItemLabel?: (item: string) => string;
    renderValue?: (selected: unknown) => ReactNode;
    className?: string;
    classNames?: {
        formGroup?: string;
        inputLabel?: string;
        content?: string;
        select?: ISelectClassNames;
    };
}
export default function SelectGroup(props: SelectGroupProps) {
    const { label, menuItemLabel, setState, state, stateKey, className = "", renderValue, groupItems, classNames = {} } = props;
    return <FormGroup className={`Select-Group flex-col ${className} ${classNames.formGroup}`}>
    <InputLabel className={`Select-Group-header ${classNames.inputLabel}`}>
      {label}
    </InputLabel>
    <Box className={`Select-Group-content flex justify-center items-center ${classNames.content}`}>
      {groupItems.map(([items, label, itemStateKey], index) => <Select key={index} renderValue={renderValue} classNames={classNames.select ?? {}} className={`Select-Group-content-item flex-1 p-0 ${index !== groupItems.length - 1 ? " " : ""}`} items={items} label={label} setState={(newState) => {
                setState({
                    ...state,
                    [stateKey]: {
                        ...state[stateKey],
                        ...newState
                    }
                });
            }} state={state[stateKey]} stateKey={itemStateKey} menuItemLabel={menuItemLabel ? menuItemLabel : (item) => transformTextBySeparator(item)}/>)}
    </Box>
  </FormGroup>;
}
