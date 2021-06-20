import { Route, Switch } from "react-router-dom";
import { NotFoundPage } from "./components";
import { Create } from "./pages/Create/Create";
import Play from "./pages/Play/Play";
import Quiz from "./pages/Quiz/Quiz";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import Shortcuts from "./pages/Shortcuts/Shortcuts";

export default function Routes() {

  return <Switch>
    <Route exact path="/" render={() => <Play />} />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/create" render={() => <Create />} />
    <Route exact path="/report" render={() => <Report />} />
    <Route exact path="/play" render={() => <Quiz />} />
    <Route exact path="/shortcuts" render={() => <Shortcuts />} />
    <Route path="*" render={() => <NotFoundPage />} />
  </Switch>
}