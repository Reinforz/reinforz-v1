import { useContext } from "react";
import { ListTable } from "../../../shared";
import { PlayContext } from "../Play";
import "./PlayListTable.scss";

export function PlayListTable() {
  const { filteredQuizzes } = useContext(PlayContext);
  return <div className="PlayListTable">
    <ListTable className="PlayListTable--difficulty" generateTitle={(item) => `${item.subject} - ${item.title}`} headers={["Beginner", "Intermediate", "Advanced"]} itemKey={"questions"} itemKeyKey={"difficulty"} items={filteredQuizzes} />
    <ListTable className="PlayListTable--type" generateTitle={(item) => `${item.subject} - ${item.title}`} headers={["MCQ", "MS", "FIB", "Snippet"]} itemKey={"questions"} itemKeyKey={"type"} items={filteredQuizzes} />
    <ListTable className="PlayListTable--type" generateTitle={(item) => `${item.subject} - ${item.title}`} headers={["MCQ", "MS", "FIB", "Snippet"]} itemKey={"questions"} itemKeyKey={"type"} items={filteredQuizzes} />
  </div>
}