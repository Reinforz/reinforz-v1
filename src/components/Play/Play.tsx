import { green, red } from "@material-ui/core/colors";
import React, { useContext, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaPlay } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/RootContext";
import { useThemeSettings } from '../../hooks';
import { IconGroup, List, Menu, Preset, SimpleModal, View } from '../../shared';
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

function Play() {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { theme, settings } = useThemeSettings();
  const { setPlaying, filteredQuizzes, selectedQuizIds, playSettings, setUploadedQuizzes, setSelectedQuizIds, uploadedQuizzes, errorLogs, setErrorLogs } = useContext(RootContext);
  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  const canStartPlay = (filteredQuestions !== 0 && selectedQuizIds.length !== 0);

  const startPlay = () => {
    if (canStartPlay) {
      setPlaying(true)
      history.push("/play")
    }
  }

  useHotkeys('ctrl+shift+1', () => {
    settings.shortcuts && history.push("/settings")
  }, [settings.shortcuts, canStartPlay])

  useHotkeys('ctrl+shift+2', () => {
    settings.shortcuts && history.push("/report")
  }, [settings.shortcuts, canStartPlay])

  useHotkeys('ctrl+shift+3', () => {
    settings.shortcuts && history.push("/create")
  }, [settings.shortcuts, canStartPlay])

  useHotkeys('ctrl+shift+4', () => {
    settings.shortcuts && startPlay()
  }, [settings.shortcuts, canStartPlay])

  return <Menu lsKey="PLAY_MENU" width={290} modalOpen={() => setModalOpen(true)} contents={[<PlaySettings />, <div className="Play">
    <SimpleModal open={modalOpen} setOpen={setModalOpen}>
      <div className="Modal-content">
        <Preset closeModal={() => setModalOpen(false)} label={'Save Play Settings'} onSave={() => {
          localStorage.setItem('PLAY_SETTINGS', JSON.stringify(playSettings))
        }} />
      </div>
    </SimpleModal>
    <IconGroup className="Play-icons" icons={[
      [`Go to Settings page`, <IoMdSettings size={20} fill={theme.color.opposite_light} onClick={() => history.push("/settings")} />],
      [`Go to Report page`, <HiDocumentReport size={20} fill={theme.color.opposite_light} onClick={() => history.push("/report")} />],
      [`Go to Create page`, <IoMdCreate size={20} fill={theme.color.opposite_light} onClick={() => history.push("/create")} />],
      ['Play', <FaPlay fill={!canStartPlay ? red[500] : green[500]} onClick={startPlay} />]
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