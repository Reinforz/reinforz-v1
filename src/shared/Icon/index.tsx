import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useContext, useEffect } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

interface Props {
  className?: string,
  popoverText: string,
  children: JSX.Element
  style?: React.CSSProperties
}

export default function Icon(props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { settings } = useContext(SettingsContext);

  const open = Boolean(anchorEl);

  const {
    className,
    popoverText,
    children
  } = props;

  useEffect(() => {
    return () => {
      setAnchorEl(null)
    }
  }, [])

  return settings.hovertips ? <Fragment>
    <span className={`${className ?? ''} icon`} style={{ ...props.style ?? {}, display: "flex", height: 'fit-content' }} onMouseEnter={(e: any) => setAnchorEl(e.currentTarget)} onMouseLeave={() => setAnchorEl(null)}>{children}</span>
    {<Popover className={classes.popover}
      classes={{
        paper: classes.paper,
      }} open={open} anchorEl={anchorEl} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={() => setAnchorEl(null)} disableRestoreFocus ><Typography>{popoverText}</Typography></Popover>}
  </Fragment> : children
}