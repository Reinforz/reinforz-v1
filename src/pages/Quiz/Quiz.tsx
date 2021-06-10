import React, { useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { IconGroup, Stats, Upload } from "../../components";
import { RootContext } from "../../context/RootContext";
import { useCycle, useNavigationIcons, useThemeSettings } from "../../hooks";
import { IResult, TQuestionFull } from "../../types";
import { generateNavigationStyles, getAnswerResult } from "../../utils";
import Question from "../Question/Question";
import "./Quiz.scss";

export default function Quiz() {
  const history = useHistory();
  const rootContext = useContext(RootContext);
  const { setPlaying, playSettings, allQuestions, playing } = rootContext;
  const [results, setResults] = useState([] as IResult[]);
  const { theme, settings } = useThemeSettings();
  const { isLastItem, currentItem, getNextIndex, currentIndex } = useCycle(allQuestions);
  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);

  const { navigationIcons, onKeyPress } = useNavigationIcons([{
    path: "/settings",
    component: IoMdSettings
  }, {
    path: "/",
    page: "Home",
    component: AiFillHome,
  }, {
    path: "/report",
    component: HiDocumentReport
  }, {
    path: "/create",
    component: IoMdCreate
  }, {
    component: FaKeyboard,
    path: "/shortcuts"
  }]);

  const render = () => {
    if (playing) {
      const totalQuestions = allQuestions.length,
        totalCorrectAnswers = results.filter(result => result.verdict).length,
        currentQuestion = JSON.parse(JSON.stringify(currentItem)) as TQuestionFull;
      return <div className="Quiz" style={{ backgroundColor: theme.color.base }}>
        <Stats items={[["Title", `${currentQuestion.quiz.subject} - ${currentQuestion.quiz.topic}`], playSettings.options.instant_feedback ? ['Total Correct', totalCorrectAnswers] : null, ["Current", currentIndex + 1], ["Total", totalQuestions], ["Type", currentQuestion.type], ["Weight", currentQuestion.weight], !playSettings.options.disable_timer ? ["Time Allocated", currentQuestion.time_allocated] : null, ["Difficulty", currentQuestion.difficulty]]} />
        <Question isLast={isLastItem} question={currentQuestion} changeCounter={(user_answers, time_taken, hints_used) => {
          const [transformedQuestion, answerResult] = getAnswerResult(currentQuestion, user_answers, time_taken, hints_used, playSettings.options.partial_score, playSettings.options.disable_timer);
          const newResultState = [...results, { question: transformedQuestion, ...answerResult, time_taken, hints_used, user_answers }];
          if (allQuestions.length - 1 === currentIndex) {
            setPlaying(false);
            history.push("/report", {
              results: newResultState,
            })
          } else {
            setResults(newResultState)
            getNextIndex();
          }
        }} />
      </div>
    } else {
      return <div className="Quiz" onKeyPress={onKeyPress}>
        <IconGroup className="Report-icons" icons={navigationIcons} direction={settings.navigation.direction} style={generatedNavigationStyles} />
        <Upload uploadMessage="Drag 'n' drop, or click to upload some play files (.json or .yaml)" onLoad={() => { }} postRead={() => { }} />
      </div>;
    }
  }

  return render();
}