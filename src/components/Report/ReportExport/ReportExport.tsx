import { Button } from '@material-ui/core';
import { safeDump } from 'js-yaml';
import React, { useCallback, useContext, useState } from 'react';
import { ReportContext } from '../../../context/ReportContext';
import { useThemeSettings } from '../../../hooks';
import { Icon, Select } from '../../../shared';
import { download, getReportExport, transformFullQuestions } from "../../../utils";
import "./ReportExport.scss";

export default function ReportExport() {
  const { filteredResults, filteredQuizzesMap, report: { settings } } = useContext(ReportContext);
  const { theme } = useThemeSettings();

  const [exportState, setExportState] = useState(getReportExport());

  const { export_type, export_as } = exportState;

  const clonedDownload = useCallback((type) => {
    for (const [, quiz] of filteredQuizzesMap) {
      quiz.questions = transformFullQuestions(quiz.questions);
      type === "yaml" ? download(`${quiz.subject} - ${quiz.topic}.yaml`, safeDump(quiz)) : download(`${quiz.subject} - ${quiz.topic}.json`, JSON.stringify(quiz, undefined, 2))
    }
  }, [filteredQuizzesMap])

  const downloadFiles = () => {
    if (export_as === "JSON") {
      if (export_type === "Report") download(`Report${Date.now()}.json`, JSON.stringify({
        settings,
        results: filteredResults,
        createdAt: Date.now()
      }, undefined, 2));
      else
        clonedDownload("json")
    } else {
      if (export_type === "Report") download(`Report${Date.now()}.yaml`, safeDump({
        settings,
        results: filteredResults,
        createdAt: Date.now()
      }));
      else
        clonedDownload("yaml")
    }
  }

  return (
    <div className="Report-Export" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.base }}>
      <div className="Report-Export-header" style={{ backgroundColor: theme.color.dark }}>Report Export</div>
      <div className="Report-Export-content" style={{ backgroundColor: theme.color.dark }}>
        <Select lsKey={"REPORT_EXPORT"} items={['Original', 'Report']} label={"Export Type"} menuItemLabel={(item) => item} setState={setExportState} state={exportState} stateKey={"export_type"} />
        <Select lsKey={"REPORT_EXPORT"} items={['YAML', 'JSON']} label={"Export As"} menuItemLabel={(item) => item} setState={setExportState} state={exportState} stateKey={"export_as"} />
        <Icon popoverText={`Export ${export_type} as ${export_as}`} className="Report-Export-button">
          <Button variant="contained" color="primary" onClick={() => {
            downloadFiles()
          }}>Download</Button>
        </Icon>
      </div>
    </div>
  );
}

