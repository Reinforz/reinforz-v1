import { useContext } from "react";
import { ListTable } from "../../../shared";
import { PlayContext } from "../Play";
import "./PlayListTable.scss";

export function PlayListTable() {
  const { filteredQuizzes } = useContext(PlayContext);
  return <div className="PlayListTable">
    <ListTable className="PlayListTable--difficulty" generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["Beginner", "Intermediate", "Advanced"]} itemKey={"questions"} itemKeyKey={"difficulty"} items={filteredQuizzes} />
    <ListTable className="PlayListTable--type" generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["MCQ", "MS", "FIB", "Snippet"]} itemKey={"questions"} itemKeyKey={"type"} items={filteredQuizzes} />
    <ListTable className="PlayListTable--time_allocated" generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["15", "30", "45", "60", "90", "120"]} itemKey={"questions"} itemKeyKey={"time_allocated"} items={filteredQuizzes} itemMapKey={(item) => {
      if (item.time_allocated <= 15) return "15";
      else if (item.time_allocated <= 30) return "30";
      else if (item.time_allocated <= 45) return "45";
      else if (item.time_allocated <= 60) return "60";
      else if (item.time_allocated <= 90) return "90";
      else if (item.time_allocated <= 120) return "120";
    }} />
  </div>
}