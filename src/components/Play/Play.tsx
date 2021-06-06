import { green, red } from "@material-ui/core/colors";
import React, { useContext, useState } from "react";
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
  const { theme } = useThemeSettings();
  const { setPlaying, filteredQuizzes, selectedQuizIds, playSettings, setUploadedQuizzes, setSelectedQuizIds, uploadedQuizzes, errorLogs, setErrorLogs } = useContext(RootContext);
  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  const cantStartPlay = (filteredQuestions === 0 && selectedQuizIds.length !== 0) || selectedQuizIds.length === 0;

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
      ['Play', <FaPlay fill={!cantStartPlay ? red[500] : green[500]} onClick={() => {
        if (!cantStartPlay) {
          setPlaying(true)
          history.push("/play")
        }
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