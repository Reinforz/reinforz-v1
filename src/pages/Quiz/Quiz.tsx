import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Stats } from "../../components";
import { RootContext } from "../../context/RootContext";
import { useCycle, useThemeSettings } from "../../hooks";
import { IResult, TQuestionFull } from "../../types";
import { getAnswerResult } from "../../utils";
import Question from "../Question/Question";
import "./Quiz.scss";

export default function Quiz() {
  const history = useHistory();
  const rootContext = useContext(RootContext);
  const { setPlaying, playSettings, allQuestions, playing } = rootContext;
  const [results, setResults] = useState([] as IResult[]);
  const { theme } = useThemeSettings();
  const { isLastItem, currentItem, getNextIndex, currentIndex } = useCycle(allQuestions);

  if (!playing) {
    history.push("/")
  }

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
      return null;
    }
  }

  return render();
}