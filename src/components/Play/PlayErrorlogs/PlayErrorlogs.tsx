import React, { useContext } from 'react';
import { PlayContext } from '../../../context/PlayContext';
import { useThemeSettings } from '../../../hooks';
import "./PlayErrorlogs.scss";

export default function PlayErrorlogs() {
  const { theme } = useThemeSettings();
  const { errorLogs } = useContext(PlayContext)

  return <div className="PlayErrorLogs" style={{ backgroundColor: theme.color.base, color: theme.palette.text.secondary }}>
    <div className="PlayErrorLogs-header" style={{ backgroundColor: theme.color.dark }}>Errors {"&"} Warnings</div>
    <div className="PlayErrorLogs-content" style={{ backgroundColor: theme.color.dark }}>
      {errorLogs.length > 0 ?
        errorLogs.map((errorLog) => (
          <div key={errorLog._id} style={{ backgroundColor: errorLog.level === "ERROR" ? theme.palette.error.main : theme.palette.warning.main, color: theme.palette.text.primary }} className="PlayErrorLogs-content-item">{errorLog.quiz}: {errorLog.target}, {errorLog.message}</div>
        )) : <div style={{ fontSize: "1.25em", fontWeight: "bold", position: "absolute", transform: "translate(-50%,-50%)", top: "50%", left: "50%", textAlign: 'center' }}>No Errors or Warnings!</div>}
    </div>
  </div>
}