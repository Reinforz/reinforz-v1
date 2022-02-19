import { Box, Button } from '@mui/material';
import { safeDump } from 'js-yaml';
import { useCallback, useContext } from 'react';
import { Header, Hovertips, Select } from '../../../components';
import { ReportContext } from '../../../context/ReportContext';
import useSounds from '../../../hooks/useSounds';
import { download, generateReportQuizzesFromQuizzesMap, transformFullQuestions } from "../../../utils";
import "./ReportExport.scss";

export default function ReportExport() {
  const { sortedResults, filteredQuizzesMap, report: { settings: playSettings }, reportSettings, setReportSettings } = useContext(ReportContext);
  const generatedReportQuizzes = generateReportQuizzesFromQuizzesMap(filteredQuizzesMap);
  const { export: exportState } = reportSettings;
  const { export_type, export_as } = exportState;
  const { swoosh } = useSounds();

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
        quizzes: generatedReportQuizzes
      }, undefined, 2));
      else
        clonedDownload("json")
    } else {
      if (export_type === "Report") download(`Report-${Date.now()}.yaml`, safeDump({
        settings: playSettings,
        results: sortedResults,
        createdAt: Date.now(),
        quizzes: generatedReportQuizzes
      }));
      else
        clonedDownload("yaml")
    }
  }

  return (
    <Box className="Report-Export bg-base p-5 mb-5">
      <Header header={"Report Export"} />
      <Box className="Report-Export-content bg-dark p-5">
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

        <Hovertips popoverText={`Export ${export_type} as ${export_as}`} className="Report-Export-button justify-center flex p-5">
          <Button variant="contained" color="primary" onClick={() => {
            swoosh();
            downloadFiles()
          }}>Download</Button>
        </Hovertips>
      </Box>
    </Box>
  );
}

