import React, { useState } from "react";
import { PlayContext } from "../../context/PlayContext";
import { List, Menu } from "../../shared";
import {
  IErrorLog, IPlaySettings, IQuizFull
} from "../../types";
import { arrayShuffler, createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState, generateQuestionsMap } from "../../utils";
import Quiz from "../Quiz/Quiz";
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

function Play() {
  let PLAY_SETTINGS: any = localStorage.getItem('PLAY_SETTINGS');
  PLAY_SETTINGS = PLAY_SETTINGS ? JSON.parse(PLAY_SETTINGS) : undefined;

  const [playSettings, setPlaySettings] = useState<IPlaySettings>({
    options: PLAY_SETTINGS ? PLAY_SETTINGS.play_options : createDefaultPlaySettingsOptionsState(),
    filters: PLAY_SETTINGS ? PLAY_SETTINGS.play_filters : createDefaultPlaySettingsFiltersState()
  });

  const [playing, setPlaying] = useState(false);
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);

  let filteredQuizzes = JSON.parse(JSON.stringify(uploadedQuizzes.filter(quiz => selectedQuizzes.includes(quiz._id)))) as IQuizFull[];

  if (playSettings.options.shuffle_quizzes && !playSettings.options.flatten_mix) filteredQuizzes = arrayShuffler(filteredQuizzes);
  if (playSettings.options.shuffle_questions && !playSettings.options.flatten_mix) filteredQuizzes.forEach(quiz => quiz.questions = arrayShuffler(quiz.questions));

  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters)

  return <PlayContext.Provider value={{ allQuestionsMap, allQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, setPlaying, playing, uploadedQuizzes, selectedQuizzes, setUploadedQuizzes, setSelectedQuizzes }}>
    {!playing ? <Menu contents={[<PlaySettings />, <div className="Play">
      <PlayUpload />
      <PlayErrorlogs />
      <List selectedItems={selectedQuizzes} setSelectedItems={setSelectedQuizzes} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={["subject", "topic", (item: any) => item.questions.length + " Qs"]} />
      <PlayListTable />
    </div>]} /> : <Quiz />}
  </PlayContext.Provider>
}

export default Play;