import { Box, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import useSounds from "../../hooks/useSounds";
import { TNumberOperator } from "../../types";
import { transformTextBySeparator } from "../../utils";

export interface InputRangeProps<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  min: number
  max: number
  step?: number
  direction?: 'row' | 'column'
  classNames?: {
    formGroup?: string
    inputLabel?: string
    content?: string
    operatorSelect?: string
    numberField?: string
  }
}

export default function InputRange<T extends Record<string, any>>(props: InputRangeProps<T>) {
  const { direction = 'row', min, max, setState, state, stateKey, label, step = 5, classNames = {} } = props;
  const { click } = useSounds();
  const [operator, range]: [TNumberOperator, [string, string]] = state[stateKey]
  return <FormGroup className={`InputRange flex-col-1 ${classNames.formGroup ?? ''}`}>
    <InputLabel className={`${classNames.inputLabel ?? ''} text-lg`}>{label}</InputLabel>
    <Box style={{ flexDirection: direction }} className={`InputRange-content p-1 gap-1 flex ${classNames.content ?? ''}`}>
      <Box className={`bg-light flex p-1 flex-col rounded-sm`}>
        <Select variant="standard" className={`${classNames.operatorSelect ?? ''}`} value={operator}
          onChange={(e) => {
            setState({ ...state, [stateKey]: [e.target.value, range] })
            click()
          }}>
          {["=", "<=", "<>", ">=", "<", ">", "!", "><"].map(item =>
            <MenuItem key={item} value={item}>{transformTextBySeparator(item)}</MenuItem>
          )}
        </Select>
      </Box>
      <TextField variant="standard" className={`flex-1 ${classNames.numberField ?? ''}`} type="number" inputProps={{ step, min, max: parseInt(range[1]) }} value={parseInt(range[0])} onChange={(e) => {
        setState({ ...state, [stateKey]: [operator, [e.target.value, parseInt(range[1])]] })
        click()
      }} />
      {["<>", "><"].includes(operator) && <TextField variant="standard" className={`flex-1 ${classNames.numberField ?? ''}`} type="number" inputProps={{ step, min: parseInt(range[0]), max }} value={parseInt(range[1])} onChange={(e) => {
        click()
        setState({ ...state, [stateKey]: [operator, [parseInt(range[0]), e.target.value]] })
      }} />}
    </Box>
  </FormGroup>
}