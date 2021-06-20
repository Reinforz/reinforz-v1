import { Button, useTheme } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Hovertips } from "../../components";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { RootContext } from "../../context/RootContext";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";
import { ExtendedTheme, TQuestionFull } from "../../types";
import { applyOptionsShortcut, displayTime } from "../../utils";
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
  const { settings } = useContext(SettingsContext)
  const { playSettings } = useContext(RootContext);
  const { changeCounter, isLast, question: { hints, time_allocated, type, options } } = props;
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [timeout, setTimeout] = useState<null | number>(null);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [timeBreak, setTimeBreak] = useState(false);
  const theme = useTheme() as ExtendedTheme;
  const ref = useRef<HTMLDivElement | null>(null);

  const { disable_timer } = playSettings.options

  useEffect(() => {
    return () => {
      setTimer(null)
      setTimeout(null)
    }
  }, [])

  useEffect(() => {
    props.question.type.match(/(MCQ|MS)/) && ref.current && ref.current.focus();
  }, [props.question])

  const onNextButtonPress = () => {
    settings.sound && sounds.swoosh.play()
    setUserAnswers([])
    setUsedHints([])
    if (!disable_timer) {
      setTimer(null)
      setTimeout(null)
      setTimeBreak(false)
      typeof timer === "number" && clearInterval(timer)
    }
    changeCounter(userAnswers, !disable_timer ? time_allocated - (timeout as number) : 0, usedHints.length)
  }

  if (timeout === 0) {
    onNextButtonPress()
  }

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

  const memoizedFIBQuestionComponent = useMemo(() => {
    return <QuestionDisplay question={props.question} userAnswers={userAnswers} />
  }, [props.question, userAnswers])

  const memoizedSelectionQuestionComponent = useMemo(() => {
    return <QuestionDisplay question={props.question} userAnswers={userAnswers} />
    // eslint-disable-next-line
  }, [props.question])

  return <div className="Question bg-dark p-5" ref={ref} style={{ color: theme.palette.text.primary }} onKeyUp={(e) => {
    if (settings.shortcuts) {
      if (e.nativeEvent.altKey && e.nativeEvent.key === "a")
        onNextButtonPress();
      if (Array.isArray(options))
        applyOptionsShortcut(e, type, options.length, userAnswers, setUserAnswers)
    }
  }} tabIndex={0}>
    {props.question.type === "FIB" ? memoizedFIBQuestionComponent : memoizedSelectionQuestionComponent}
    <div className="">
      {props.question.type === "MCQ" || props.question.type === "MS"
        ? <QuestionOptions setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />
        : <QuestionInputs setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />}
      <QuestionHints usedHints={usedHints} setUsedHints={setUsedHints} hints={hints} />
    </div>
    {<div style={{ display: 'flex', gridArea: `3/2/4/3`, alignItems: `center`, height: '65px' }}>
      {!disable_timer && <Hovertips popoverAnchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }} popoverTransformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }} className="Question-timer bg-base" popoverText={timeBreak ? "Stop time break" : "Start time break"} style={{ height: 'calc(100% - 15px)' }} onClick={() => {
        setTimeBreak((timeBreak) => !timeBreak);
        if (timeBreak === false) {
          setTimer(null);
          typeof timer === "number" && clearInterval(timer)
        } else {
          const timer = setInterval(() => {
            setTimeout((seconds) => {
              return typeof seconds === "number" ? seconds - 1 : 0
            })
          }, 1000);
          setTimer(timer)
        }
      }}>
        <FaClock fill={timeBreak ? red[500] : green[500]} size={20} />
      </Hovertips>}
      <Button disabled={timeBreak} className="QuestionButton" variant="contained" color="primary" onClick={onNextButtonPress}>{!isLast ? "Next" : "Report"}</Button>
      {timeout && !playSettings.options.disable_timer && <div style={{ color: theme.palette.text.primary }} className="QuestionTimer bg-base">{displayTime(timeout)}</div>}
    </div>}
  </div>
}
