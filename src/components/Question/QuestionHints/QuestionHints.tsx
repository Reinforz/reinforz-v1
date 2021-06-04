import { Button } from '@material-ui/core';
import { useDisabled, useThemeSettings } from '../../../hooks';
import { Markdown } from '../../../shared/Markdown';
import "./QuestionHints.scss";

interface Props {
  hints: string[]
  usedHints: string[]
  setUsedHints: React.Dispatch<React.SetStateAction<string[]>>
}

export default function QuestionHints(props: Props) {
  const { hints, usedHints, setUsedHints } = props;
  const { is_disabled, disable } = useDisabled(2500);
  const { theme } = useThemeSettings();
  const totalUsedHints = usedHints.length;
  const hintsExhausted = totalUsedHints === hints.length;

  const onButtonClick = () => {
    if (!hintsExhausted && !is_disabled) {
      setUsedHints([...usedHints, hints[totalUsedHints]])
      disable()
    }
  }

  return <div className="QuestionHints" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    <Button disabled={is_disabled || hintsExhausted} color="primary" variant="contained" className="QuestionHints-button" onClick={() => {
      onButtonClick()
    }}>{hints.length > 0 ? `Show ${"hints"} ${totalUsedHints}/${hints.length}` : `No hints available`}</Button>
    <div className="QuestionHints-list" style={{ backgroundColor: theme.color.dark }}>
      {usedHints.map((hint, i) =>
        <div key={`hint${i}`} style={{ backgroundColor: theme.color.light }} className="QuestionHints-list-item">
          <Markdown content={hint} />
        </div>)}
    </div>
  </div>
}