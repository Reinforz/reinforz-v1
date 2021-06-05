import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Create } from './components/Create/Create';
import Play from "./components/Play/Play";
import Quiz from './components/Quiz/Quiz';
import Report from './components/Report/Report';
import Settings from './components/Settings/Settings';
import { RootContext } from './context/RootContext';
import { SettingsContext } from "./context/SettingsContext";
import './index.scss';
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IQuizFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettings, getSettings } from './utils';

const App = () => {
  const [settings, setSettings] = useState(getSettings());
  const [playSettings, setPlaySettings] = useState(getPlaySettings());
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);

  const generatedTheme = generateTheme(settings.theme) as ExtendedTheme;
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters);

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ setSettings, settings }}>
        <RootContext.Provider value={{ playing, setPlaying, selectedQuizzes, allQuestionsMap, allQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          <div className={`App ${generatedTheme.palette.type}`} style={{ backgroundColor: generatedTheme.color.dark }}>
            <Switch>
              <Route exact path="/" render={() => <Play />} />
              <Route exact path="/settings" render={() => <Settings />} />
              <Route exact path="/create" render={() => <Create />} />
              <Route exact path="/report" render={() => <Report />} />
              <Route exact path="/play" render={() => <Quiz />} />
            </Switch>
          </div>
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}

ReactDOM.render(<Router>
  <App />
</Router >, document.getElementById('root'));