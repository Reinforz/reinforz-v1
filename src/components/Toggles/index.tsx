import { Box, FormGroup, InputLabel, Switch, withStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import React from 'react';
import useSounds from '../../hooks/useSounds';
import { transformTextBySeparator } from '../../utils';

const OnOffSwitch = withStyles({
  switchBase: {
    color: red[500],

    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  'track': {
    backgroundColor: red[500],
  },
  checked: {},
})(Switch);

export interface TogglesProps<I extends Record<string, any>> {
  items: (keyof I)[]
  state: I
  setState: React.Dispatch<React.SetStateAction<I>>
  classNames?: {
    container?: string
    formGroup?: string
    inputLabel?: string
    switch?: string
  }
}

export default function Toggles<I extends Record<string, any>>(props: TogglesProps<I>) {
  const { state, setState, classNames = {} } = props;
  const items = props.items as string[];

  const { switch_off, switch_on} = useSounds();

  return <Box className={`Toggles bg-dark w-100p ${classNames.container ?? ''}`}> {items.map((item, index) =>
    <FormGroup key={item} row className={`Toggles-item bg-base p-5${items.length - 1 !== index ? " mb-5" : ""} ${classNames.formGroup ?? ''}`}>
      <InputLabel className={`Toggles-item-label mb-0 ${classNames.inputLabel ?? ''}`}>{transformTextBySeparator(item)}</InputLabel>
      <OnOffSwitch
        className={`${classNames.switch ?? ''}`}
        checked={Boolean(state[item])}
        onChange={() => {
          const checked = state[item];
          if (checked) {
            switch_off()
          } else if (!checked) {
            switch_on()
          }
          setState({ ...state, [item]: !checked })
        }}
      />
    </FormGroup>
  )}
  </Box>
}