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
    <Route path="/" element={<Play />}/>
    <Route path="/settings" element={<Settings />}/>
    <Route path="/create" element={<Create />}/>
    <Route path="/report" element={<Report />}/>
    <Route path="/play" element={<Quiz />}/>
    <Route path="/shortcuts" element={<Shortcuts />}/>
    <Route path="*" element={<NotFoundPage />}/>
  </Routes>
}