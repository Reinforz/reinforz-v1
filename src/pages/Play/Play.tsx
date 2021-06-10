import { green, red } from "@material-ui/core/colors";
import { OptionsObject, useSnackbar } from "notistack";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaKeyboard, FaPlay } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoLogoGameControllerB, IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { IconGroup, List, Menu, View } from '../../components';
import { RootContext } from "../../context/RootContext";
import { useNavigationIcons, useThemeSettings } from '../../hooks';
import { generateNavigationStyles } from "../../utils";
import "./Play.scss";
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
  const [selectedErrorLogIds, setSelectedErrorLogIds] = useState<string[]>([]);
  const history = useHistory();
  const { settings, theme } = useThemeSettings();
  const { setPlaying, filteredQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds, uploadedQuizzes, errorLogs, setErrorLogs } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<HTMLDivElement | null>(null);
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
  const { navigationIcons, onKeyPress } = useNavigationIcons([{
    path: "/settings",
    component: IoMdSettings
  }, {
    path: "/report",
    component: HiDocumentReport
  }, {
    path: "/create",
    component: IoMdCreate
  }, {
    path: "/play",
    component: IoLogoGameControllerB
  }, {
    path: "/play",
    component: FaPlay,
    onClick: startPlay,
    popoverText: 'Start play',
    fill: !canStartPlay ? red[500] : green[500],
    size: 17.5
  }, {
    component: FaKeyboard,
    path: "/shortcuts"
  }]);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

  return <Menu lsKey="PLAY_MENU" width={290} contents={[<PlaySettings />, <div className="Play" ref={ref} tabIndex={0} onKeyPress={onKeyPress}>
    <IconGroup style={generatedNavigationStyles} direction={settings.navigation.direction} className="Play-icons" icons={navigationIcons} />
    <PlayUpload />
    <div style={{ gridArea: '2/1/5/2' }}>
      <View lsKey="PLAY_VIEW" items={
        [<List onDelete={(_, deletedItems) => {
          setErrorLogs(errorLogs.filter(errorLog => !deletedItems.includes(errorLog.quiz_id)))
        }} selectedItems={selectedQuizIds} setSelectedItems={setSelectedQuizIds} header="Uploaded Quizzes" items={uploadedQuizzes} setItems={setUploadedQuizzes} fields={[(item) => `${item.subject} - ${item.topic}`, (item) => item.questions.length + " Qs"]} />,
        <List className="Play-ErrorLogs" emptyListMessage="No Errors or Warnings!" selectedItems={selectedErrorLogIds} setSelectedItems={setSelectedErrorLogIds} header="Error & Warnings" items={errorLogs} setItems={setErrorLogs} fields={[(errorLog) => <div className="Play-ErrorLogs-item" style={{ backgroundColor: errorLog.level === "ERROR" ? theme.palette.error.main : theme.palette.warning.main }}>{errorLog.quiz}: {errorLog.target}, {errorLog.message}</div>]} />]}
      />
    </div>
    <PlayListTable />
  </div>]} />
}

export default Play;