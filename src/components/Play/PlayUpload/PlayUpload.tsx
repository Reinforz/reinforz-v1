import yaml from 'js-yaml';
import { OptionsObject, useSnackbar } from "notistack";
import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useThemeSettings } from '../../../hooks';
import { IQuizPartial } from '../../../types';
import { filterUploadedQuizzes } from "../../../utils";
import { PlayContext } from '../Play';
import "./PlayUpload.scss";

const trimLower = (data: string) => data.replace(/\s/g, '').toLowerCase();
const centerBottomErrorNotistack = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;

export default function PlayUpload() {
  const { uploadedQuizzes, errorLogs, setUploadedQuizzes, setErrorLogs } = useContext(PlayContext);
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useThemeSettings();

  const onDrop = (acceptedFiles: any) => {
    let filePromises: Promise<IQuizPartial>[] = [];

    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      filePromises.push(new Promise((resolve, reject) => {
        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = () => {
          const ext = file.name.split(".")[1];
          const { result } = reader;
          if (result) {
            try {
              const QuizData = ext.match(/(yaml|yml)/) ? yaml.safeLoad(result as string) as any : JSON.parse(result.toString());
              const isAdded = uploadedQuizzes.find((currentQuiz) => trimLower(currentQuiz.title) === trimLower(QuizData.title) && trimLower(currentQuiz.subject) === trimLower(QuizData.subject));
              if (isAdded)
                enqueueSnackbar(`${file.name} has already been added`, centerBottomErrorNotistack);
              else
                resolve(QuizData);
            } catch (err) {
              enqueueSnackbar(`${file.name} Error: ${err.message}`, centerBottomErrorNotistack)
            }
          } else
            enqueueSnackbar(`${file.name} is empty`, centerBottomErrorNotistack);
        }
      }));
      reader.readAsText(file);
    });

    Promise.all(filePromises).then(quizzes => {
      const [logMessages, filteredUploadedQuizzes] = filterUploadedQuizzes(quizzes)
      setErrorLogs([...errorLogs, ...logMessages]);
      setUploadedQuizzes([...uploadedQuizzes, ...filteredUploadedQuizzes]);
    });
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, accept: [".yml", ".yaml", "application/json"] })
  let borderColor = '#404040';
  if (isDragAccept)
    borderColor = '#00e676';
  if (isDragReject)
    borderColor = '#ff1744';
  if (isDragActive)
    borderColor = '#2196f3';

  return <div style={{ borderColor, backgroundColor: theme.color.light, color: theme.palette.text.secondary }} className="PlayUpload" {...getRootProps()}>
    <input {...getInputProps()} />
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to upload files (.json or .yaml files)</p>
    }
  </div>
}