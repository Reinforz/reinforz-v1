import { Button } from '@material-ui/core';
import createDOMPurify from 'dompurify';
import marked from 'marked';
import React from 'react';
import { useDisabled, useThemeSettings } from '../../../hooks';
import "./QuestionHints.scss";

const DOMPurify = createDOMPurify(window);

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

  return <div className="QuestionHints">
    <Button disabled={is_disabled || hintsExhausted} color="primary" variant="contained" className="QuestionHints-button" onClick={() => {
      onButtonClick()
    }}>{hints.length > 0 ? `Show ${"hints"} ${totalUsedHints}/${hints.length}` : `No hints available`}</Button>
    <div className="QuestionHints-list" >
      {usedHints.map((hint, i) =>
        <div key={`hint${i}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(`${i + 1}: ${hint}`.toString())) }} style={{ backgroundColor: theme.color.dark }} className="QuestionHints-list-item" />)}
    </div>
  </div>
}