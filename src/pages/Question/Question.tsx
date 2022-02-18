import { Button, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Hovertips } from "../../components";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { RootContext } from "../../context/RootContext";
import { SettingsContext } from "../../context/SettingsContext";
import useSounds from "../../hooks/useSounds";
import { TQuestion, TSelectQuestion } from "../../types";
import { applyOptionsShortcut, displayTime } from "../../utils";
import "./Question.scss";
import QuestionHints from "./QuestionHints/QuestionHints";
import QuestionInputs from "./QuestionInputs/QuestionInputs";
import QuestionOptions from "./QuestionOptions/QuestionOptions";

interface Props {
  question: TQuestion,
  changeCounter: (userAnswers: string[], time_taken: number, hints_used: number) => void,
  isLast: boolean,
};

export default function Question(props: Props) {
  const { settings } = useContext(SettingsContext)
  const { playSettings, allQuizzesMap } = useContext(RootContext);
  const { changeCounter, isLast, question: { hints, time_allocated, type } } = props;
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [timeout, setTimeout] = useState<null | number>(null);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [timeBreak, setTimeBreak] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { swoosh } = useSounds();

  const { disable_timer } = playSettings.options
  const options = (props.question as TSelectQuestion).options;


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
    swoosh()
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
    return <QuestionDisplay contexts={allQuizzesMap.get(props.question.quiz)!.contexts} question={props.question} userAnswers={userAnswers} showImage={Boolean(props.question.image)} />
  }, [allQuizzesMap, props.question, userAnswers])

  const memoizedSelectionQuestionComponent = useMemo(() => {
    return <QuestionDisplay contexts={allQuizzesMap.get(props.question.quiz)!.contexts} question={props.question} userAnswers={userAnswers} showImage={Boolean(props.question.image)} />
    // eslint-disable-next-line
  }, [allQuizzesMap, props.question])

  return <div className="Question bg-dark p-5" ref={ref} onKeyUp={(e) => {
    if (settings.shortcuts) {
      if (e.nativeEvent.altKey && e.nativeEvent.key === "a")
        onNextButtonPress();
      if (Array.isArray(options))
        applyOptionsShortcut(e, type, options.length, userAnswers, setUserAnswers)
    }
  }} tabIndex={0}>
    {props.question.type === "FIB" ? memoizedFIBQuestionComponent : memoizedSelectionQuestionComponent}
    <div className="flex" style={{ height: "calc(100% - 255px)" }}>
      <div className="overflowY-auto flex-1 mr-5">
        {props.question.type === "MCQ" || props.question.type === "MS"
          ? <QuestionOptions setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />
          : <QuestionInputs setUserAnswers={setUserAnswers} userAnswers={userAnswers} question={props.question} />}
      </div>
      <div className="flex fd-c bg-base p-5 pb-0" style={{ width: 300 }}>
        <QuestionHints usedHints={usedHints} setUsedHints={setUsedHints} hints={hints} />
        {<div className="flex ai-c mb-5" style={{ height: '65px' }}>
          {<Hovertips popoverAnchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }} popoverTransformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }} style={{ height: 'calc(100% - 10px)' }} className="Question-timerBreak bg-light p-5 mr-5 jc-c ai-c flex br-5 c-p h-calc_100p_m_10px" popoverText={timeBreak ? "Stop time break" : "Start time break"} onClick={() => {
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
          <Button disabled={timeBreak} className="QuestionButton flex-1" variant="contained" color="primary" onClick={() => {
            if (
              window.location.host === 'localhost:3000' ||
              window.location.host === 'reinforz.vercel.app'
            ) {
              onNextButtonPress()
            }
          }}>{!isLast ? "Next" : "Report"}</Button>
          {timeout && !playSettings.options.disable_timer && <Typography className="QuestionTimer bg-light p-5 flex jc-c ai-c flex-1 bold fs-20 ml-5 h-calc_100p_m_10px">{displayTime(timeout)}</Typography>}
        </div>}
      </div>
    </div>

  </div>
}
