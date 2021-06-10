import yaml from 'js-yaml';
import React, { useContext } from 'react';
import { Upload } from '../../../components';
import { RootContext } from '../../../context/RootContext';
import { IQuizPartial } from '../../../types';
import { filterUploadedQuizzes } from "../../../utils";
import "./PlayUpload.scss";

const trimLower = (data: string) => data.replace(/\s/g, '').toLowerCase();

export default function PlayUpload() {
  const { uploadedQuizzes, setSelectedQuizIds, errorLogs, setUploadedQuizzes, setErrorLogs } = useContext(RootContext);

  return <Upload className="PlayUpload" onLoad={(result, ext, { enqueueSnackbar, notistackOptionsObject }, resolve) => {
    const quizData = ext.match(/(yaml|yml)/) ? yaml.safeLoad(result as string) as any : JSON.parse(result.toString());
    const matchedQuiz = uploadedQuizzes.find((currentQuiz) => trimLower(currentQuiz.topic) === trimLower(quizData.topic) && trimLower(currentQuiz.subject) === trimLower(quizData.subject));
    if (matchedQuiz)
      enqueueSnackbar(`${matchedQuiz.subject} - ${matchedQuiz.topic} has already been added`, notistackOptionsObject);
    else
      resolve(quizData);
  }} postRead={(quizzes: IQuizPartial[]) => {
    const [logMessages, filteredUploadedQuizzes] = filterUploadedQuizzes(quizzes)
    const mergedUploadedQuizzes = [...uploadedQuizzes, ...filteredUploadedQuizzes];
    setErrorLogs([...errorLogs, ...logMessages]);
    setUploadedQuizzes(mergedUploadedQuizzes);
    setSelectedQuizIds(mergedUploadedQuizzes.map(mergedUploadedQuiz => mergedUploadedQuiz._id))
  }} />
}