import { makeStyles } from '@material-ui/core';
import React, { useState } from "react";
import { IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { PlayContext } from "../../context/PlayContext";
import { useThemeSettings } from '../../hooks';
import { List, Menu } from "../../shared";
import {
  ExtendedTheme,
  IErrorLog, IPlaySettings, IQuizFull
} from "../../types";
import { applyPlaySettingsOptions, arrayShuffler, createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState, generateQuestionsMap } from "../../utils";
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
    options: PLAY_SETTINGS && PLAY_SETTINGS.play_options ? PLAY_SETTINGS.play_options : createDefaultPlaySettingsOptionsState(),
    filters: PLAY_SETTINGS && PLAY_SETTINGS.play_filters ? PLAY_SETTINGS.play_filters : createDefaultPlaySettingsFiltersState()
  });
  const [playing, setPlaying] = useState(false);
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>([]);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>([]);

  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);

  const [allQuestions, allQuestionsMap] = generateQuestionsMap(filteredQuizzes, playSettings.filters)

  return <PlayContext.Provider value={{ selectedQuizzes, allQuestionsMap, allQuestions, filteredQuizzes, setPlaySettings, playSettings, errorLogs, setErrorLogs, setPlaying, playing, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
    {!playing ? <Menu width={290} contents={[<PlaySettings />, <div className="Play">
      <IoMdSettings size={25} fill={theme.color.opposite_light} className={`${classes.root} Play-settings-icon`} onClick={() => history.push("/settings")} />
      <PlayUpload />
      <PlayErrorlogs />
      <List onDelete={(remainingItems) => {
        setErrorLogs(errorLogs.filter(errorLog => !remainingItems.map(remainingItem => remainingItem._id).includes(errorLog.quiz_id)))
      }} selectedItems={selectedQuizIds} setSelectedItems={setSelectedQuizIds} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={[(item) => `${item.subject} - ${item.topic}`, (item) => item.questions.length + " Qs"]} />
      <PlayListTable />
    </div>]} /> : <Quiz />}
  </PlayContext.Provider>
}

export default Play;