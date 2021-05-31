import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Create } from './components/Create/Create';
import Play from "./components/Play/Play";
import Settings from './components/Settings/Settings';
import SettingsContext from "./context/SettingsContext";
import './index.scss';
import { ExtendedTheme } from './types';
import { generateTheme, getSettings } from './utils';

const App = () => {
  const [settings, setSettings] = useState(getSettings());
  const generatedTheme = generateTheme(settings.theme) as ExtendedTheme;

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={settings}>
        <div className={`App ${generatedTheme.palette.type === "dark" ? "dark" : "light"}`} style={{ backgroundColor: generatedTheme.color.dark }}>
          <Switch>
            <Route exact path="/" render={() => <Play />} />
            <Route exact path="/settings" render={() => <Settings settings={settings} setSettings={setSettings} />} />
            <Route exact path="/create" render={() => <Create />} />
          </Switch>
        </div>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}

ReactDOM.render(<Router>
  <App />
</Router >, document.getElementById('root'));