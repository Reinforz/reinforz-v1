import React, { useContext } from 'react';
import { RootContext } from '../../../context/RootContext';
import { useThemeSettings } from '../../../hooks';
import "./PlayErrorlogs.scss";

export default function PlayErrorlogs() {
  const { theme } = useThemeSettings();
  const { errorLogs } = useContext(RootContext)

  return <div className="PlayErrorLogs" style={{ backgroundColor: theme.color.base, color: theme.palette.text.secondary }}>
    <div className="PlayErrorLogs-header" style={{ backgroundColor: theme.color.dark }}>Errors {"&"} Warnings</div>
    <div className="PlayErrorLogs-content" style={{ backgroundColor: theme.color.dark }}>
      {errorLogs.length > 0 ?
        errorLogs.map((errorLog) => (
          <div key={errorLog._id} style={{ backgroundColor: errorLog.level === "ERROR" ? theme.palette.error.main : theme.palette.warning.main }} className="PlayErrorLogs-content-item">{errorLog.quiz}: {errorLog.target}, {errorLog.message}</div>
        )) : <div className="center">No Errors or Warnings!</div>}
    </div>
  </div>
}