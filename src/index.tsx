import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { RootContext } from './context/RootContext';
import { SettingsContext } from "./context/SettingsContext";
import './index.scss';
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IQuizFull, TQuestionFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettings, getSettings } from './utils';

const Root = () => {
  const [settings, setSettings] = useState(getSettings());
  const [playSettings, setPlaySettings] = useState(getPlaySettings());
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const generatedTheme = generateTheme(settings.theme) as ExtendedTheme;
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters);
  const allShuffledQuestions: TQuestionFull[] = useMemo(() => {
    return playSettings.options.flatten_mix ? arrayShuffler(allQuestions) : allQuestions
  }, [allQuestions, playSettings.options.flatten_mix])

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ setSettings, settings }}>
        <RootContext.Provider value={{ playing, setPlaying, selectedQuizzes, allQuestionsMap, allQuestions: allShuffledQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          <App />
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}

ReactDOM.render(<Router>
  <Root />
</Router >, document.getElementById('root'));