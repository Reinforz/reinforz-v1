import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { RootContext } from './context/RootContext';
import { SettingsContext } from "./context/SettingsContext";
import './index.scss';
import { ErrorBoundary } from './shared';
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IPlaySettingsPreset, IQuizFull, ISettingsPreset, TQuestionFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettingsPresets, getSettingsPresets } from './utils';

function findSettingsFromPresets(preset: ISettingsPreset | IPlaySettingsPreset) {
  return (preset.presets as any[]).find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

const Root = () => {
  const [settingsPresets, setSettingsPresets] = useState(getSettingsPresets());
  const [settings, setSettings] = useState(findSettingsFromPresets(settingsPresets));

  const [playSettingsPresets, setPlaySettingsPresets] = useState(getPlaySettingsPresets());
  const [playSettings, setPlaySettings] = useState(findSettingsFromPresets(playSettingsPresets));

  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters);
  const allShuffledQuestions: TQuestionFull[] = useMemo(() => {
    return playSettings.options.flatten_mix ? arrayShuffler(allQuestions) : allQuestions
  }, [allQuestions, playSettings.options.flatten_mix])

  useEffect(() => {
    setSettings(findSettingsFromPresets(settingsPresets))
    // eslint-disable-next-line
  }, [settingsPresets.current])

  useEffect(() => {
    setPlaySettings(findSettingsFromPresets(playSettingsPresets))
    // eslint-disable-next-line
  }, [playSettingsPresets.current])

  const generatedTheme = generateTheme(settings) as ExtendedTheme;
  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ settings, setSettingsPresets, settingsPresets, setSettings }}>
        <RootContext.Provider value={{ playSettingsPresets, setPlaySettingsPresets, playing, setPlaying, selectedQuizzes, allQuestionsMap, allQuestions: allShuffledQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          <App />
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}

ReactDOM.render(<Router>
  <ErrorBoundary>
    <Root />
  </ErrorBoundary>
</Router >, document.getElementById('root'));