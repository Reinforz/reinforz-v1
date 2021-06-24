import { Button } from '@material-ui/core';
import { safeDump } from 'js-yaml';
import React, { useCallback, useContext } from 'react';
import { Header, Hovertips, Select } from '../../../components';
import { ReportContext } from '../../../context/ReportContext';
import { useThemeSettings } from '../../../hooks';
import sounds from '../../../sounds';
import { IQuizFull } from '../../../types';
import { download, transformFullQuestions } from "../../../utils";
import "./ReportExport.scss";

export default function ReportExport() {
  const { sortedResults, filteredQuizzesMap, report: { settings: playSettings }, reportSettings, setReportSettings } = useContext(ReportContext);
  const { settings } = useThemeSettings();
  // ?: Convert to util module
  const quizzes: Record<string, Omit<IQuizFull, "questions">> = {};
  for (const [key, value] of filteredQuizzesMap) {
    const duplicateQuiz = JSON.parse(JSON.stringify(value))
    delete duplicateQuiz.questions;
    quizzes[key] = duplicateQuiz;
  }
  const { export: exportState } = reportSettings;
  const { export_type, export_as } = exportState;

  const clonedDownload = useCallback((type) => {
    for (const [, quiz] of filteredQuizzesMap) {
      quiz.questions = transformFullQuestions(quiz.questions);
      type === "yaml" ? download(`${quiz.subject} - ${quiz.topic}.yaml`, safeDump(quiz)) : download(`${quiz.subject} - ${quiz.topic}.json`, JSON.stringify(quiz, undefined, 2))
    }
  }, [filteredQuizzesMap])

  const downloadFiles = () => {
    if (export_as === "JSON") {
      if (export_type === "Report") download(`Report-${Date.now()}.json`, JSON.stringify({
        settings: playSettings,
        results: sortedResults,
        createdAt: Date.now(),
        quizzes
      }, undefined, 2));
      else
        clonedDownload("json")
    } else {
      if (export_type === "Report") download(`Report-${Date.now()}.yaml`, safeDump({
        settings: playSettings,
        results: sortedResults,
        createdAt: Date.now(),
        quizzes
      }));
      else
        clonedDownload("yaml")
    }
  }

  return (
    <div className="Report-Export bg-base p-5 mb-5">
      <Header header={"Report Export"} />
      <div className="Report-Export-content bg-dark p-5">
        <Select classNames={{ formGroup: 'mb-5' }} lsKey={"REPORT_EXPORT"} items={['Quizzes', 'Report']} label={"Export Type"} menuItemLabel={(item) => item} setState={(exportState) => {
          setReportSettings({
            ...reportSettings,
            export: {
              ...reportSettings.export,
              ...exportState
            }
          })
        }} state={exportState} stateKey={"export_type"} />
        <Select classNames={{ formGroup: 'mb-5' }} lsKey={"REPORT_EXPORT"} items={['YAML', 'JSON']} label={"Export As"} menuItemLabel={(item) => item} setState={(exportState) => {
          setReportSettings({
            ...reportSettings,
            export: {
              ...reportSettings.export,
              ...exportState
            }
          })
        }} state={exportState} stateKey={"export_as"} />

        <Hovertips popoverText={`Export ${export_type} as ${export_as}`} className="Report-Export-button jc-c flex p-5">
          <Button variant="contained" color="primary" onClick={() => {
            settings.sound && sounds.swoosh.play();
            downloadFiles()
          }}>Download</Button>
        </Hovertips>
      </div>
    </div>
  );
}

