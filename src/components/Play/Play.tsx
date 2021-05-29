import React, { useState } from "react";
import { List } from "../../shared";
import {
  IErrorLog, IPlaySettings, IQuizFull, TQuestionFull
} from "../../types";
import { arrayShuffler, createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState, generateQuestionsMap } from "../../utils";
import Quiz from "../Quiz/Quiz";
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

interface IPlayContext {
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  uploadedQuizzes: IQuizFull[],
  setUploadedQuizzes: React.Dispatch<React.SetStateAction<IQuizFull[]>>
  selectedQuizzes: string[],
  setSelectedQuizzes: React.Dispatch<React.SetStateAction<string[]>>
  filteredQuizzes: IQuizFull[],
  errorLogs: IErrorLog[],
  setErrorLogs: React.Dispatch<React.SetStateAction<IErrorLog[]>>
  playSettings: IPlaySettings
  setPlaySettings: React.Dispatch<React.SetStateAction<IPlaySettings>>
  allQuestions: TQuestionFull[]
  allQuestionsMap: Map<string, TQuestionFull>
}

export const PlayContext = React.createContext({} as IPlayContext)

function Play() {
  let PLAY_SETTINGS: any = localStorage.getItem('PLAY_SETTINGS');
  PLAY_SETTINGS = PLAY_SETTINGS ? JSON.parse(PLAY_SETTINGS) : undefined;

  const [playSettings, setPlaySettings] = useState<IPlaySettings>({
    options: PLAY_SETTINGS ? PLAY_SETTINGS.play_options : createDefaultPlaySettingsOptionsState(),
    filters: PLAY_SETTINGS ? PLAY_SETTINGS.play_filters : createDefaultPlaySettingsFiltersState()
  });

  const [playing, setPlaying] = useState(true);
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);

  let filteredQuizzes = JSON.parse(JSON.stringify(uploadedQuizzes.filter(quiz => selectedQuizzes.includes(quiz._id)))) as IQuizFull[];

  if (playSettings.options.shuffle_quizzes && !playSettings.options.flatten_mix) filteredQuizzes = arrayShuffler(filteredQuizzes);
  if (playSettings.options.shuffle_questions && !playSettings.options.flatten_mix) filteredQuizzes.forEach(quiz => quiz.questions = arrayShuffler(quiz.questions));

  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters)

  return <PlayContext.Provider value={{ allQuestionsMap, allQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, setPlaying, playing, uploadedQuizzes, selectedQuizzes, setUploadedQuizzes, setSelectedQuizzes }}>
    {!playing ? <div className="Play">
      <PlayUpload />
      <PlayErrorlogs />
      <List selectedItems={selectedQuizzes} setSelectedItems={setSelectedQuizzes} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={["subject", "title", (item: any) => item.questions.length + " Qs"]} />
      <PlayListTable />
      <PlaySettings />
    </div> : <Quiz />}
  </PlayContext.Provider>
}

export default Play;