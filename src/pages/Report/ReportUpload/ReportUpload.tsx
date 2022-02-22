import yaml from 'js-yaml';
import { useContext } from 'react';
import { Upload } from '../../../components';
import { ReportContext } from '../../../context/ReportContext';
import { IReport } from '../../../types';
import "./ReportUpload.scss";

export function ReportUpload() {
  const { setReport } = useContext(ReportContext);
  return <Upload uploadMessage="Drag 'n' drop, or click to upload some report files (.json or .yaml)" maxFiles={1} className="Report-Upload" onLoad={(result, file) => {
    const dotSeparatedChunks = file.name.split(".");
    const ext = dotSeparatedChunks[dotSeparatedChunks.length - 1];
    return ext.match(/(yaml|yml)/) ? yaml.load(result.toString()) : JSON.parse(result.toString());
  }} postRead={([report]: IReport[]) => {
    setReport(report)
  }} />
}