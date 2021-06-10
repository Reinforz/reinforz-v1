import yaml from 'js-yaml';
import React, { useContext } from 'react';
import { Upload } from '../../../components';
import { RootContext } from '../../../context/RootContext';
import { IQuizPartial } from '../../../types';
import { filterUploadedQuizzes } from "../../../utils";

const trimLower = (data: string) => data.replace(/\s/g, '').toLowerCase();

export default function PlayUpload() {
  const { uploadedQuizzes, setSelectedQuizIds, errorLogs, setUploadedQuizzes, setErrorLogs } = useContext(RootContext);

  return <Upload uploadMessage="Drag 'n' drop, or click to upload some quiz files (.json or .yaml)" className="PlayUpload" onLoad={(result, ext, { enqueueSnackbar, notistackOptionsObject }, resolve) => {
    const quizData = ext.match(/(yaml|yml)/) ? yaml.safeLoad(result as string) as any : JSON.parse(result.toString());
    const matchedQuiz = uploadedQuizzes.find((currentQuiz) => trimLower(currentQuiz.topic) === trimLower(quizData.topic) && trimLower(currentQuiz.subject) === trimLower(quizData.subject));
    if (matchedQuiz)
      enqueueSnackbar(`${matchedQuiz.subject} - ${matchedQuiz.topic} has already been added`, notistackOptionsObject);
    else
      resolve(quizData);
  }} postRead={(quizzes: IQuizPartial[]) => {
    const [generatedErrorLogs, filteredUploadedQuizzes] = filterUploadedQuizzes(quizzes)
    const mergedUploadedQuizzes = [...uploadedQuizzes, ...filteredUploadedQuizzes];
    const quizIds = mergedUploadedQuizzes.map(mergedUploadedQuiz => mergedUploadedQuiz._id)
    setErrorLogs([...errorLogs, ...generatedErrorLogs]);
    setUploadedQuizzes(mergedUploadedQuizzes);
    setSelectedQuizIds(quizIds)
  }} />
}