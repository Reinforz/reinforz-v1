import { Popover, PopoverOrigin, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useContext, useEffect } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { ExtendedTheme } from '../../types';

const useStyles = makeStyles((theme: ExtendedTheme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    backgroundColor: theme.color.dark,
    padding: theme.spacing(1),
  },
}));

export interface HovertipsProps {
  className?: string,
  popoverText: string,
  children: JSX.Element
  style?: React.CSSProperties
  onClick?: () => void
  popoverAnchorOrigin?: PopoverOrigin
  popoverTransformOrigin?: PopoverOrigin
}

export default function Hovertips(props: HovertipsProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { settings } = useContext(SettingsContext);

  const open = Boolean(anchorEl);

  const {
    className,
    popoverText,
    children,
    popoverAnchorOrigin = {
      vertical: 'bottom',
      horizontal: 'center',
    },
    popoverTransformOrigin = {
      vertical: 'top',
      horizontal: 'center',
    }
  } = props;

  useEffect(() => {
    return () => {
      setAnchorEl(null)
    }
  }, [])

  const generatedProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> = {};
  if (props.onClick)
    generatedProps.onClick = props.onClick;

  return <Fragment>
    <span {...generatedProps} className={`${className ?? ''} flex icon`} style={{ cursor: 'pointer', height: 'fit-content', ...props.style ?? {}, }} onMouseEnter={(e: any) => setAnchorEl(e.currentTarget)} onMouseLeave={() => setAnchorEl(null)}>{children}</span>
    {settings.hovertips && <Popover className={classes.popover}
      classes={{
        paper: classes.paper,
      }} open={open} anchorEl={anchorEl} anchorOrigin={popoverAnchorOrigin}
      transformOrigin={popoverTransformOrigin}
      onClose={() => setAnchorEl(null)} disableRestoreFocus ><Typography>{popoverText}</Typography></Popover>}
  </Fragment>
}