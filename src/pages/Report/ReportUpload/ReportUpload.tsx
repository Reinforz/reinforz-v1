import yaml from 'js-yaml';
import React, { useContext } from 'react';
import { Upload } from '../../../components';
import { ReportContext } from '../../../context/ReportContext';
import { IReport } from '../../../types';
import "./ReportUpload.scss";

export function ReportUpload() {
  const { setReport } = useContext(ReportContext);
  return <Upload uploadMessage="Drag 'n' drop, or click to upload some report files (.json or .yaml)" maxFiles={1} className="Report-Upload" onLoad={(result, ext, _, resolve) => {
    const reportData: IReport = ext.match(/(yaml|yml)/) ? yaml.safeLoad(result.toString()) : JSON.parse(result.toString());
    resolve(reportData);
  }} postRead={([report]: IReport[]) => {
    setReport(report)
  }} />
}