import { green, red } from "@material-ui/core/colors";
import { OptionsObject, useSnackbar } from "notistack";
import React, { useContext, useEffect, useRef } from "react";
import { FaGithub, FaPlay } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdDocument, IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { REINFORZ_DOC_URL, REINFORZ_REPO_URL } from "../../constants";
import { RootContext } from "../../context/RootContext";
import { useThemeSettings } from '../../hooks';
import { IconGroup, List, Menu, View } from '../../shared';
import sounds from "../../sounds";
import { generateNavigationStyles } from "../../utils";
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

const centerBottomErrorNotistack = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;

function Play() {
  const history = useHistory();
  const { theme, settings } = useThemeSettings();
  const { setPlaying, filteredQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds, uploadedQuizzes, errorLogs, setErrorLogs } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);
  const canStartPlay = (filteredQuestions !== 0 && selectedQuizIds.length !== 0);
  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);

  const startPlay = () => {
    if (uploadedQuizzes.length === 0) {
      enqueueSnackbar(`No quiz has been uploaded.`, centerBottomErrorNotistack);
    } else if (selectedQuizIds.length === 0) {
      enqueueSnackbar(`No quiz has been selected.`, centerBottomErrorNotistack);
    } else if (filteredQuestions === 0) {
      enqueueSnackbar(`There are in total 0 questions to be played after applying the filters. Make the filters less strict.`, centerBottomErrorNotistack);
    }

    if (canStartPlay) {
      setPlaying(true)
      history.push("/play")
    }
  }

  return <Menu lsKey="PLAY_MENU" width={290} contents={[<PlaySettings />, <div className="Play" ref={ref} tabIndex={0} onKeyPress={(e) => {
    switch (e.nativeEvent.code) {
      case "Digit1": {
        settings.sound && sounds.swoosh.play()
        settings.shortcuts && history.push("/settings")
        break;
      }
      case "Digit2": {
        settings.sound && sounds.swoosh.play()
        settings.shortcuts && history.push("/report")
        break;
      }
      case "Digit3": {
        settings.sound && sounds.swoosh.play()
        settings.shortcuts && history.push("/create")
        break;
      }
    }
  }}>
    <IconGroup style={generatedNavigationStyles} direction={settings.navigation.direction} className="Play-icons" icons={[
      [`Go to Settings page`, <IoMdSettings size={20} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        history.push("/settings")
      }} />],
      [`Go to Report page`, <HiDocumentReport size={20} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        history.push("/report")
      }} />],
      [`Go to Create page`, <IoMdCreate size={20} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        history.push("/create")
      }} />],
      ['Play', <FaPlay fill={!canStartPlay ? red[500] : green[500]} onClick={() => {
        settings.sound && sounds.swoosh.play()
        startPlay()
      }} />],
      ['Go to documentation', <IoMdDocument size={20} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        const win = window.open(REINFORZ_DOC_URL, "_blank")!;
        win.focus();
      }} />],
      ['Go to repo', <FaGithub size={20} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        const win = window.open(REINFORZ_REPO_URL, "_blank")!;
        win.focus();
      }} />]
    ]} />
    <PlayUpload />
    <div style={{ gridArea: '2/1/5/2' }}>
      <View lsKey="PLAY_VIEW" items={
        [<List onDelete={(remainingItems) => {
          setErrorLogs(errorLogs.filter(errorLog => !remainingItems.map(remainingItem => remainingItem._id).includes(errorLog.quiz_id)))
        }} selectedItems={selectedQuizIds} setSelectedItems={setSelectedQuizIds} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={[(item) => `${item.subject} - ${item.topic}`, (item) => item.questions.length + " Qs"]} />, <PlayErrorlogs />]}
      />
    </div>
    <PlayListTable />
  </div>]} />
}

export default Play;