import yaml from 'js-yaml';
import { OptionsObject, useSnackbar } from "notistack";
import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useThemeSettings } from '../../../hooks';
import { IReport } from '../../../types';

const centerBottomErrorNotistack = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;

export function ReportUpload() {
  const { setReport } = useContext(ReportContext);
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useThemeSettings();

  const onDrop = (acceptedFiles: any) => {
    let filePromises: Promise<IReport>[] = [];

    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      filePromises.push(new Promise((resolve, reject) => {
        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = () => {
          const dotSplitChunks = file.name.split(".");
          const ext = dotSplitChunks[dotSplitChunks.length - 1]
          const { result } = reader;
          if (result) {
            try {
              const reportData: IReport = ext.match(/(yaml|yml)/) ? yaml.safeLoad(result.toString()) : JSON.parse(result.toString());
              resolve(reportData);
            } catch (err) {
              enqueueSnackbar(`${file.name} Error: ${err.message}`, centerBottomErrorNotistack)
            }
          }
        }
      }));
      reader.readAsText(file);
    });

    Promise.all(filePromises).then(report => {
      setReport(report)
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: [".yml", ".yaml", "application/json"] })

  return <div style={{ backgroundColor: theme.color.light, color: theme.palette.text.secondary }} className="Report-Upload" {...getRootProps()}>
    <input {...getInputProps()} />
    <p>click to upload report files (.json or .yaml)</p>
  </div>
}