import { Button } from "@material-ui/core";
import { useCycle, useDisabled, useThemeSettings } from "../../hooks";
import { sanitizeMarkdown } from "../../utils";

interface Props {
  items: string[],
  name: string,
}

export default function Cycle(props: Props) {
  const { items, name } = props;
  const { hasEnded, getNextIndex, currentIndex } = useCycle(items);
  const { is_disabled, disable } = useDisabled(2500);

  const { theme } = useThemeSettings();

  const onButtonClick = () => {
    if (!hasEnded && !is_disabled) {
      getNextIndex()
      disable()
    }
  }

  return <div className="Cycle">
    <div className="Cycle-list" >
      {Array(currentIndex).fill(0).map((_, i) =>
        <div key={`hint${i}`} dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(`${i + 1}: ${items[i]}`) }} style={{ backgroundColor: theme.color.dark }} className="Cycle-list-item" />)}
    </div>
    <Button disabled={is_disabled || hasEnded} color="primary" variant="contained" className="Cycle-button" onClick={() => {
      onButtonClick()
    }}>{items.length > 0 ? `Show ${name || "item"} ${currentIndex}/${items.length}` : `No ${name || "items"} available`}</Button>
  </div>
}