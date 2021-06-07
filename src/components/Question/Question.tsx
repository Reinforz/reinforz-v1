import { Button, useTheme } from "@material-ui/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { RootContext } from "../../context/RootContext";
import { Markdown } from "../../shared";
import { ExtendedTheme, TQuestionFull } from "../../types";
import { displayTime } from "../../utils";
import FibQuestionDisplay from "./FibQuestionDisplay";
import "./Question.scss";
import QuestionHints from "./QuestionHints/QuestionHints";
import QuestionInputs from "./QuestionInputs/QuestionInputs";
import QuestionOptions from "./QuestionOptions/QuestionOptions";

interface Props {
  question: TQuestionFull,
  changeCounter: (userAnswers: string[], time_taken: number, hints_used: number) => void,
  isLast: boolean,
};

export default function Question(props: Props) {
  const { playSettings } = useContext(RootContext);
  const { changeCounter, isLast, question: { image, hints, question, time_allocated } } = props;
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [timeout, setTimeout] = useState<null | number>(null);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const theme = useTheme() as ExtendedTheme;

  const { disable_timer } = playSettings.options

  const onNextButtonPress = () => {
    setUserAnswers([])
    setUsedHints([])
    if (!disable_timer) {
      setTimer(null)
      setTimeout(null)
      typeof timer === "number" && clearInterval(timer)
    }
    changeCounter(userAnswers, !disable_timer ? time_allocated - (timeout as number) : 0, usedHints.length)
  }

  if (timeout === 0) {
    onNextButtonPress()
  }

  useHotkeys("ctrl+shift+z", () => {
    onNextButtonPress()
  })

  useEffect(() => {
    if (!disable_timer) {
      setTimeout(props.question.time_allocated)
      const timer = setInterval(() => {
        setTimeout((seconds) => {
          return typeof seconds === "number" ? seconds - 1 : 0
        })
      }, 1000);
      setTimer(timer)
    }
  }, [props.question, disable_timer])

  const memoizedQuestionComponent = useMemo(() =>
    props.question.type === "FIB" ? <FibQuestionDisplay question={props.question.question} userAnswers={userAnswers} image={props.question.image} /> : <div className="Question-question" style={{ gridArea: image ? `1/1/2/2` : `1/1/2/3`, backgroundColor: theme.color.light }}>
      <Markdown content={question as string} />
    </div>,
    // eslint-disable-next-line
    [props.question, userAnswers])

  return <div className="Question" style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
    {memoizedQuestionComponent}
    {image && <div className="Question-image" style={{ gridArea: `1/2/2/3`, backgroundColor: theme.color.light }}><img src={image} alt="Question" /></div>}
    {props.question.type === "MCQ" || props.question.type === "MS"
      ? <QuestionOptions setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />
      : <QuestionInputs setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />}
    <QuestionHints usedHints={usedHints} setUsedHints={setUsedHints} hints={hints} />
    {<div style={{ display: 'flex', gridArea: `3/2/4/3`, alignItems: `center`, height: '65px' }}>
      <Button className="QuestionButton" variant="contained" color="primary" onClick={onNextButtonPress}>{!isLast ? "Next" : "Report"}</Button>
      {timeout && !playSettings.options.disable_timer && <div style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }} className="QuestionTimer">{displayTime(timeout)}</div>}
    </div>}
  </div>
}
