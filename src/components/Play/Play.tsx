import React, { useContext } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdSettings } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/RootContext";
import { useThemeSettings } from '../../hooks';
import { Icon, List, Menu, View } from '../../shared';
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
    <div className="Play-settings-icons" style={{ backgroundColor: theme.color.base }}>
      <Icon popoverText={`Go to Settings page`} className="Play-settings-icons-item">
        <IoMdSettings size={25} fill={theme.color.opposite_light} style={{ backgroundColor: theme.color.light }} onClick={() => history.push("/settings")} />
      </Icon>
      <Icon popoverText={`Go to Report page`} className="Play-settings-icons-item">
        <HiDocumentReport size={25} fill={theme.color.opposite_light} style={{ backgroundColor: theme.color.light }} onClick={() => history.push("/report")} />
      </Icon>
    </div>
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