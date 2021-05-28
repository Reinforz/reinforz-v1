import { useContext, useState } from "react";
import { Select } from '../../../shared';
import { TQuizSortBy } from "../../../types";
import { generateSortHavingItems } from "../../../utils";
import { PlayContext } from "../Play";
import "./PlayQuizzes.scss";

interface IPlayQuizzesState {
  sort_by: TQuizSortBy,
  sort_having: string,
  sort_order: 'ASC' | 'DESC'
}

export default function PlayQuizzes() {
  const [playQuizzesState, setPlayQuizzesState] = useState<IPlayQuizzesState>({
    sort_by: 'Difficulty',
    sort_having: 'Beginner',
    sort_order: 'ASC'
  });
  const { uploadedQuizzes } = useContext(PlayContext);

  return <div className="PlayQuizzes">
    <div className="PlayQuizzes-Selects">
      <Select items={["ASC", "DESC"]} label={"Sort Order"} menuItemLabel={(item) => item} setState={setPlayQuizzesState} state={playQuizzesState} stateKey={"sort_order"} />
      <Select items={['Difficulty', 'Time Allocated', 'Question Types']} label={"Sort By"} menuItemLabel={(item) => item} setState={setPlayQuizzesState} state={playQuizzesState} stateKey={"sort_by"} />
      <Select items={generateSortHavingItems(playQuizzesState.sort_by)} label={"Sort Having"} menuItemLabel={(item) => item} setState={setPlayQuizzesState} state={playQuizzesState} stateKey={"sort_having"} />
    </div>
    <div className="PlayQuizzes-Items">
      {uploadedQuizzes.map(uploadedQuiz => <div>
        {uploadedQuiz.title}
        {uploadedQuiz.subject}
      </div>)}
    </div>
  </div>
}