import { Button } from '@material-ui/core';
import { safeDump } from 'js-yaml';
import React, { useCallback, useContext, useState } from 'react';
import { ReportContext } from '../../../context/ReportContext';
import { Icon, Select } from '../../../shared';
import { download, transformFullQuestions } from "../../../utils";
import "./ReportExport.scss";
interface IReportExportState {
  export_type: 'Original' | 'Report',
  export_as: 'JSON' | 'YAML'
}

export default function ReportExport() {
  const { filteredResults, filteredQuizzesMap, report: { settings } } = useContext(ReportContext);
  let REPORT_EXPORT: any = localStorage.getItem('REPORT_EXPORT');
  REPORT_EXPORT = REPORT_EXPORT ? JSON.parse(REPORT_EXPORT) : undefined;

  const [exportState, setExportState] = useState<IReportExportState>({
    export_type: REPORT_EXPORT ? REPORT_EXPORT.export_type : 'Original',
    export_as: REPORT_EXPORT ? REPORT_EXPORT.export_as : 'YAML'
  });

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
    <div className="Report-Export">
      <Select lsKey={"REPORT_EXPORT"} items={['Original', 'Report']} label={"Export Type"} menuItemLabel={(item) => item} setState={setExportState} state={exportState} stateKey={"export_type"} />
      <Select lsKey={"REPORT_EXPORT"} items={['YAML', 'JSON']} label={"Export As"} menuItemLabel={(item) => item} setState={setExportState} state={exportState} stateKey={"export_as"} />
      <Icon popoverText={`Export ${export_type} as ${export_as}`} className="Report-Export-button">
        <Button variant="contained" color="primary" onClick={() => {
          downloadFiles()
        }}>Download</Button>
      </Icon>
    </div>
  );
}

