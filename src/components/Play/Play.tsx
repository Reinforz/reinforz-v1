import React, { useContext } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/RootContext";
import { useThemeSettings } from '../../hooks';
import { IconGroup, List, Menu, View } from '../../shared';
import "./Play.scss";
import PlayErrorlogs from "./PlayErrorlogs/PlayErrorlogs";
import { PlayListTable } from "./PlayListTable/PlayListTable";
import PlaySettings from "./PlaySettings/PlaySettings";
import PlayUpload from "./PlayUpload/PlayUpload";

function Play() {
  const history = useHistory();
  const { theme } = useThemeSettings();
  const { selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds, uploadedQuizzes, errorLogs, setErrorLogs } = useContext(RootContext);

  return <Menu lsKey="PLAY_MENU" width={290} contents={[<PlaySettings />, <div className="Play">
    <IconGroup className="Play-icons" icons={[
      [`Go to Settings page`, <IoMdSettings size={25} fill={theme.color.opposite_light} onClick={() => history.push("/settings")} />],
      [`Go to Report page`, <HiDocumentReport size={25} fill={theme.color.opposite_light} onClick={() => history.push("/report")} />],
      [`Go to Create page`, <IoMdCreate size={25} fill={theme.color.opposite_light} onClick={() => history.push("/create")} />],
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