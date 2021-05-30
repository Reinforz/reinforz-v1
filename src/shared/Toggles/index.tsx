import { FormGroup, InputLabel, Switch, withStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import clsx from "clsx";
import React from 'react';
import { useThemeSettings } from '../../hooks';

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

interface Props<I extends Record<string, any>> {
  items: (keyof I)[]
  itemsMap: I
  setItems: (item: I) => void
  classNames?: {
    FormGroup?: string
    InputLabel?: string
  }
}

export default function Toggles<I extends Record<string, any>>(props: Props<I>) {
  const { theme: THEME } = useThemeSettings();
  const { itemsMap, setItems } = props;
  const items = props.items as string[];
  return <> {items.map((item) =>
    <FormGroup key={item} row className={clsx("Toggles-item", props?.classNames?.FormGroup && props.classNames.FormGroup)} style={{ backgroundColor: THEME.color.base }}>
      <InputLabel className={clsx("Toggles-item-label", props?.classNames?.InputLabel && props.classNames.InputLabel)}>{(item as string).charAt(0).toUpperCase() + (item as string).substr(1)}</InputLabel>
      <OnOffSwitch
        checked={itemsMap[item]}
        onChange={(e) => {
          setItems({ ...itemsMap, [item]: !itemsMap[item] })
        }}
      />
    </FormGroup>
  )}
  </>
}