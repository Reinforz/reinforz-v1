import { useTheme } from "@material-ui/styles";
import React from "react";
import { useTimer } from "../../hooks";
import { ExtendedTheme } from "../../types";
import { displayTime } from "../../utils";
import "./style.scss";

export interface Props {
  timeout: number,
  onTimerEnd: any,
}

export default function Timer(props: Props) {
  const { timeout } = useTimer(props.timeout, props.onTimerEnd);
  const theme = useTheme() as ExtendedTheme
  return <div style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }} className="Timer">{displayTime(timeout)}</div>
}