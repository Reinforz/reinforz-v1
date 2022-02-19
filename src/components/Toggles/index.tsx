import styled from '@emotion/styled';
import { Box, FormGroup, InputLabel, Switch } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React from 'react';
import useSounds from '../../hooks/useSounds';
import { transformTextBySeparator } from '../../utils';

const OnOffSwitch = styled(Switch)`
  &	.MuiSwitch-switchBase {
    color: ${red[500]};
  }

  &.Mui-checked {
    color: ${green[500]};
  }

  &.Mui-checked + .MuiSwitch-track {
    background-color: ${green[500]};
  }

  & .MuiSwitch-track {
    background-color: ${red[500]};
  }
`;

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

  return <Box className={`Toggles bg-dark w-full ${classNames.container ?? ''}`}> {items.map((item, index) =>
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