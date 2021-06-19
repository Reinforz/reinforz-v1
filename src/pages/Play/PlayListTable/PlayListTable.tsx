import { useContext, useEffect, useState } from "react";
import { ListTable } from "../../../components";
import { RootContext } from "../../../context/RootContext";
import { divideTimeAllocated } from "../../../utils";
import "./PlayListTable.scss";

export function PlayListTable() {
  const [rowHeight, setRowHeight] = useState((document.body.clientHeight / 3) - 7)
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries =>
      setRowHeight((entries[0].target.clientHeight / 3) - 7)
    )
    resizeObserver.observe(document.body)
    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  const { selectedQuizzes } = useContext(RootContext);
  return <div className="PlayListTable" style={{ gridGap: 5, gridTemplateRows: `${rowHeight}px ${rowHeight}px ${rowHeight}px` }}>
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["Beginner", "Intermediate", "Advanced"]} itemKey={"questions"} itemKeyKey={"difficulty"} items={selectedQuizzes} />
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["MCQ", "MS", "FIB", "Snippet"]} itemKey={"questions"} itemKeyKey={"type"} items={selectedQuizzes} />
    <ListTable generateTitle={(item) => `${item.subject} - ${item.topic}`} headers={["15", "30", "45", "60", "90", "120"]} itemKey={"questions"} itemKeyKey={"time_allocated"} items={selectedQuizzes} itemMapKey={(item) => divideTimeAllocated(item.time_allocated)} />
  </div>
}