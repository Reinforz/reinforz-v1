import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
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
import { QUIZ_1 } from './data/quizzes';
import './index.scss';
import "./styles/vscode-dark.css";
import { ExtendedTheme, IErrorLog, IPlaySettings, IQuizFull } from './types';
import { applyPlaySettingsOptions, arrayShuffler, createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState, generateQuestionsMap, generateTheme, getSettings } from './utils';

const a = Prism.highlight
a.bind(this);

const App = () => {
  const [settings, setSettings] = useState(getSettings());
  const generatedTheme = generateTheme(settings.theme) as ExtendedTheme;

  const [playSettings, setPlaySettings] = useState<IPlaySettings>(JSON.parse(localStorage.getItem('PLAY_SETTINGS') ?? JSON.stringify({
    options: createDefaultPlaySettingsOptionsState(),
    filters: createDefaultPlaySettingsFiltersState()
  })));
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([QUIZ_1]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([QUIZ_1._id]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);

  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);

  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters);

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ setSettings, settings }}>
        <RootContext.Provider value={{ selectedQuizzes, allQuestionsMap, allQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          <div className={`App ${generatedTheme.palette.type === "dark" ? "dark" : "light"}`} style={{ backgroundColor: generatedTheme.color.dark }}>
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