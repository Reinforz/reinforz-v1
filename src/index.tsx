import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { ErrorBoundary } from './components';
import { RootContext } from './context/RootContext';
import { SettingsContext } from "./context/SettingsContext";
import './index.scss';
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IPlaySettings, IPlaySettingsPreset, IQuizFull, ISettings, ISettingsPreset, TQuestionFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettingsPresets, getSettingsPresets } from './utils';

function findSettingsFromPresets(preset: ISettingsPreset | IPlaySettingsPreset) {
  return (preset.presets as any[]).find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

const Root = () => {
  const [settingsPresets, setSettingsPresets] = useState(getSettingsPresets());
  const [settings, setSettings] = useState<ISettings>(findSettingsFromPresets(settingsPresets));
  const [playSettingsPresets, setPlaySettingsPresets] = useState(getPlaySettingsPresets());
  const [playSettings, setPlaySettings] = useState<IPlaySettings>(findSettingsFromPresets(playSettingsPresets));
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [uploadedPlayState, setUploadedPlayState] = useState(false);
  const [playQuizzes, setPlayQuizzes] = useState<{ selected: IQuizFull[], filtered: IQuizFull[] }>({
    filtered: [],
    selected: []
  });

  const [playQuestions, setPlayQuestions] = useState<{ array: TQuestionFull[], map: Map<string, TQuestionFull> }>({
    array: [],
    map: new Map()
  })

  useEffect(() => {
    if (!uploadedPlayState) {
      const [selected, filtered] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
      setPlayQuizzes({
        selected,
        filtered
      })
    }
  }, [uploadedQuizzes, selectedQuizIds, playSettings.options, uploadedPlayState]);

  useEffect(() => {
    if (!uploadedPlayState) {
      const [allQuestions, allQuestionsMap] = generateQuestionsMap(playQuizzes.filtered, playSettings.filters);
      setPlayQuestions({
        array: allQuestions,
        map: allQuestionsMap
      })
    }
  }, [playQuizzes.filtered, playSettings.filters, uploadedPlayState]);

  const allShuffledQuestions: TQuestionFull[] = useMemo(() => {
    return playSettings.options.flatten_mix && !uploadedPlayState ? arrayShuffler(playQuestions.array) : playQuestions.array
  }, [playQuestions.array, playSettings.options.flatten_mix, uploadedPlayState])

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
        <RootContext.Provider value={{ playQuestions, setPlayQuestions, playQuizzes, setPlayQuizzes, uploadedPlayState, setUploadedPlayState, playSettingsPresets, setPlaySettingsPresets, playing, setPlaying, selectedQuizzes: playQuizzes.selected, allQuestionsMap: playQuestions.map, allQuestions: allShuffledQuestions, filteredQuizzes: playQuizzes.filtered, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
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