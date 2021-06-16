import { FormGroup, InputLabel, Switch, withStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import sounds from '../../sounds';
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
}

export default function Toggles<I extends Record<string, any>>(props: TogglesProps<I>) {
  const { settings } = useContext(SettingsContext);
  const { state, setState } = props;
  const items = props.items as string[];
  return <div className="Toggles bg-dark p-5"> {items.map((item, index) =>
    <FormGroup key={item} row className={`Toggles-item bg-base p-5${items.length - 1 !== index ? " mb-5" : ""}`}>
      <InputLabel className={"Toggles-item-label mb-0"}>{transformTextBySeparator(item)}</InputLabel>
      <OnOffSwitch
        checked={Boolean(state[item])}
        onChange={(e) => {
          const checked = state[item];
          if (checked && settings.sound) {
            sounds.switch_off.play()
          } else if (!checked && settings.sound) {
            sounds.switch_on.play()
          }
          setState({ ...state, [item]: !checked })
        }}
      />
    </FormGroup>
  )}
  </div>
}