import { makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlayContext } from "../../context/PlayContext";
import { useThemeSettings } from '../../hooks';
import { List, Menu } from "../../shared";
import {
  ExtendedTheme,
  IErrorLog, IPlaySettings, IQuizFull
} from "../../types";
import { arrayShuffler, createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState, generateQuestionsMap } from "../../utils";
import Quiz from "../Quiz/Quiz";
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

const useStyles = makeStyles((theme: ExtendedTheme) => ({
  root: {
    fill: theme.color.opposite_light
  }
}))

function Play() {
  const history = useHistory();
  const classes = useStyles();
  const { theme } = useThemeSettings();
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
      <SettingsIcon fill={theme.color.opposite_light} className={`${classes.root} Play-settings-icon`} onClick={() => history.push("/settings")} />
      <PlayUpload />
      <PlayErrorlogs />
      <List onDelete={(remainingItems) => {
        setErrorLogs(errorLogs.filter(errorLog => !remainingItems.map(remainingItem => remainingItem._id).includes(errorLog.quiz_id)))
      }} selectedItems={selectedQuizzes} setSelectedItems={setSelectedQuizzes} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={[(item) => `${item.subject} - ${item.topic}`, (item) => item.questions.length + " Qs"]} />
      <PlayListTable />
    </div>]} /> : <Quiz />}
  </PlayContext.Provider>
}

export default Play;