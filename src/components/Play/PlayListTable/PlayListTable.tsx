import { useContext, useEffect, useState } from "react";
import { useThemeSettings } from "../../../hooks";
import { PlayContext } from "../Play";
import "./PlayListTable.scss";
interface Props {
  itemKey: "time_allocated" | "type" | "difficulty"
  headers: string[]
}

export function PlayListTable(props: Props) {
  const { theme } = useThemeSettings();
  const { filteredQuizzes } = useContext(PlayContext);
  const [itemsMap, setItemsMap] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setItemsMap(filteredQuizzes.map(({ questions, title, _id }, index) => {
      const itemMap: Record<string, any> = {
        _id,
        title,
        index: index + 1
      };
      props.headers.forEach(header => {
        itemMap[header] = 0
      })

      questions.forEach((question) => {
        itemMap[question[props.itemKey]]++;
      })
      return itemMap;
    }))
  }, [filteredQuizzes, props.headers, props.itemKey])

  return <div className="PlayListTable" style={{ backgroundColor: theme.color.base }}>
    <div className="PlayListTable-headers" style={{ backgroundColor: theme.color.dark, color: theme.palette.text.secondary }}>
      <div className="PlayListTable-headers-row">
        {["Sl", "Quiz", ...props.headers].map(header => <span className={`PlayListTable-headers-row-item PlayListTable-headers-row-item--${header}`} key={header}>{header}</span>)}
      </div>
    </div>
    <div className="PlayListTable-body" style={{ color: theme.palette.text.secondary }}>
      {itemsMap.map((itemMap) => <div key={itemMap._id} className="PlayListTable-body-row" style={{ backgroundColor: theme.color.light }}>
        {["index", "title", ...props.headers].map(header => <span className={`PlayListTable-body-row-item PlayListTable-body-row-item--${header}`} key={header}>{itemMap[header]}</span>)}
      </div>)}
    </div>
  </div>
}