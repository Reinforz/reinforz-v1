import { useContext } from "react";
import { ListTable } from "../../../shared";
import { PlayContext } from "../Play";
import "./PlayListTable.scss";

export function PlayListTable() {
  const { filteredQuizzes } = useContext(PlayContext);
  return <div className="PlayListTable">
    <ListTable generateTitle={(item) => `${item.subject} - ${item.title}`} headers={["Beginner", "Intermediate", "Advanced"]} itemKey={"questions"} itemKeyKey={"difficulty"} items={filteredQuizzes} />
  </div>
}