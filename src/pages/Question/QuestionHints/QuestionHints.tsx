import { Box, Button } from '@mui/material';
import { Markdown } from '../../../components';
import { useDisabled } from '../../../hooks';
import useSounds from '../../../hooks/useSounds';
import "./QuestionHints.scss";

interface Props {
  hints: string[]
  usedHints: string[]
  setUsedHints: React.Dispatch<React.SetStateAction<string[]>>
}

export default function QuestionHints(props: Props) {
  const { hints, usedHints, setUsedHints } = props;
  const { is_disabled, disable } = useDisabled(2500);
  const totalUsedHints = usedHints.length;
  const hintsExhausted = totalUsedHints === hints.length;
  const { click } = useSounds();

  const onButtonClick = () => {
    if (!hintsExhausted && !is_disabled) {
      setUsedHints([...usedHints, hints[totalUsedHints]])
      disable()
    }
  }

  return <Box className="QuestionHints mb-5">
    <Box className="flex justify-center items-center mb-5" style={{ height: 50 }}>
      <Button disabled={is_disabled || hintsExhausted} color="primary" variant="contained" className="QuestionHints-button flex-1" onClick={() => {
        click()
        onButtonClick()
      }}>{hints.length > 0 ? `Show ${"hints"} ${totalUsedHints}/${hints.length}` : `No hints available`}</Button>
    </Box>
    <Box className="QuestionHints-list bg-dark p-5 pb-0">
      {usedHints.map((hint, i) =>
        <Box key={`hint${i}`} className="QuestionHints-list-item p-10 bg-light mb-5">
          <Markdown content={hint} />
        </Box>)}
    </Box>
  </Box>
}