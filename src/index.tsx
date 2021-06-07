import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { RootContext } from './context/RootContext';
import { SettingsContext } from "./context/SettingsContext";
import './index.scss';
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IQuizFull, ISettingsPreset, TQuestionFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettings, getSettingsPresets } from './utils';

function findSettingsFromPresets(settingsPresets: ISettingsPreset) {
  return settingsPresets.presets.find(settingsPreset => settingsPreset.id === settingsPresets.current)!.data;
}

const Root = () => {
  const [settingsPresets, setSettingsPresets] = useState(getSettingsPresets());
  const [playSettings, setPlaySettings] = useState(getPlaySettings());
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters);
  const allShuffledQuestions: TQuestionFull[] = useMemo(() => {
    return playSettings.options.flatten_mix ? arrayShuffler(allQuestions) : allQuestions
  }, [allQuestions, playSettings.options.flatten_mix])

  const [settings, setSettings] = useState(findSettingsFromPresets(settingsPresets));

  useEffect(() => {
    setSettings(findSettingsFromPresets(settingsPresets))
    // eslint-disable-next-line
  }, [settingsPresets.current])

  const generatedTheme = generateTheme(settings.theme) as ExtendedTheme;
  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ settings, setSettingsPresets, settingsPresets, setSettings }}>
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