import { makeStyles, useTheme } from "@material-ui/core";
import { useContext, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { REINFORZ_PLAY_SETTINGS_LS_KEY, REINFORZ_SETTINGS_LS_KEY } from "./constants";
import { ModalContext } from './context/ModalContext';
import { RootContext } from "./context/RootContext";
import { SettingsContext } from "./context/SettingsContext";
import { Create } from "./pages/Create/Create";
import Play from "./pages/Play/Play";
import Quiz from "./pages/Quiz/Quiz";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import Shortcuts from "./pages/Shortcuts/Shortcuts";
import { NotFoundPage, SimpleModal } from "./shared";
import { ExtendedTheme } from "./types";
import { navigateBetweenPresets } from "./utils";

const useStyles = makeStyles((theme: ExtendedTheme) => ({
  root: {
    "& ::-webkit-scrollbar": {
      width: 10
    },
    "& ::-webkit-scrollbar-track": {
      backgroundColor: theme.color.dark
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: theme.color.light
    },
    "& pre": {
      background: theme.color.dark
    },
    '& :not(pre) > code[class*="language-"]': {
      background: theme.color.dark
    }
  }
}));

export default function App() {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  const theme = useTheme() as ExtendedTheme;
  const classes = useStyles();
  const { settings, setSettingsPresets, settingsPresets } = useContext(SettingsContext);
  const { pathname } = useLocation();
  const { playSettingsPresets, setPlaySettingsPresets } = useContext(RootContext)

  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <div onKeyUp={(e) => {
      if (pathname === "/settings") {
        navigateBetweenPresets(e, settingsPresets, setSettingsPresets, REINFORZ_SETTINGS_LS_KEY)
      } else if (pathname === "/") {
        navigateBetweenPresets(e, playSettingsPresets, setPlaySettingsPresets, REINFORZ_PLAY_SETTINGS_LS_KEY)
      }
    }} className={`App ${theme.theme} ${classes.root}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.color.dark }}>
      <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
        <div className="Modal-content">
          {modalState[1]}
        </div>
      </SimpleModal>
      <Switch>
        <Route exact path="/" render={() => <Play />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/create" render={() => <Create />} />
        <Route exact path="/report" render={() => <Report />} />
        <Route exact path="/play" render={() => <Quiz />} />
        <Route exact path="/shortcuts" render={() => <Shortcuts />} />
        <Route path="*" render={() => <NotFoundPage />} />
      </Switch>
    </div>
  </ModalContext.Provider>
}