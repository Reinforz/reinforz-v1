import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./components";
import { Create } from "./pages/Create/Create";
import Play from "./pages/Play/Play";
import Quiz from "./pages/Quiz/Quiz";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import Shortcuts from "./pages/Shortcuts/Shortcuts";

export default function CustomRoutes() {
  return <Routes>
    <Route path="/">
      <Play />
    </Route>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/create">
      <Create />
    </Route>
    <Route path="/report">
      <Report />
    </Route>
    <Route path="/play">
      <Quiz />
    </Route>
    <Route path="/shortcuts">
      <Shortcuts />
    </Route>
    <Route path="*">
      <NotFoundPage />
    </Route>
  </Routes>
}