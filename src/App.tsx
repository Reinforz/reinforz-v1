import { makeStyles, useTheme } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { Create } from "./components/Create/Create";
import Play from "./components/Play/Play";
import Quiz from "./components/Quiz/Quiz";
import Report from "./components/Report/Report";
import Settings from "./components/Settings/Settings";
import { ExtendedTheme } from "./types";

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
    }
  }
}));

export default function App() {
  const theme = useTheme() as ExtendedTheme;
  const classes = useStyles();
  return <div className={`App ${theme.theme} ${classes.root}`} style={{ backgroundColor: theme.color.dark }}>
    <Switch>
      <Route exact path="/" render={() => <Play />} />
      <Route exact path="/settings" render={() => <Settings />} />
      <Route exact path="/create" render={() => <Create />} />
      <Route exact path="/report" render={() => <Report />} />
      <Route exact path="/play" render={() => <Quiz />} />
    </Switch>
  </div>
}