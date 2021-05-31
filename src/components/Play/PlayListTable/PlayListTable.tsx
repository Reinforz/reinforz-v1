import { useContext } from "react";
import { PlayContext } from "../../../context/PlayContext";
import { ListTable } from "../../../shared";
import { divideTimeAllocated } from "../../../utils";
import "./PlayListTable.scss";

export function PlayListTable() {
  const { selectedQuizzes } = useContext(PlayContext);
  return <div className="PlayListTable">
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["Beginner", "Intermediate", "Advanced"]} itemKey={"questions"} itemKeyKey={"difficulty"} items={selectedQuizzes} />
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["MCQ", "MS", "FIB", "Snippet"]} itemKey={"questions"} itemKeyKey={"type"} items={selectedQuizzes} />
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["15", "30", "45", "60", "90", "120"]} itemKey={"questions"} itemKeyKey={"time_allocated"} items={selectedQuizzes} itemMapKey={(item) => divideTimeAllocated(item.time_allocated)} />
  </div>
}