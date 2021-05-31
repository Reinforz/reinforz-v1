import React, { Fragment, useContext, useState } from "react";
import { PlayContext } from "../../context/PlayContext";
import { useCycle, useThemeSettings } from "../../hooks";
import { Stats } from "../../shared";
import { TQuestionFull, TQuestionResult } from "../../types";
import { getAnswerResult } from "../../utils";
import Question from "../Question/Question";
import Report from "../Report/Report";
import "./Quiz.scss";

export default function Quiz() {
  const { playSettings, allQuestions } = useContext(PlayContext);
  const [results, setResults] = useState([] as TQuestionResult[]);
  const { theme } = useThemeSettings();
  const { isLastItem, currentItem, getNextIndex, hasEnded, currentIndex } = useCycle(allQuestions);

  const totalQuestions = allQuestions.length,
    totalCorrectAnswers = results.filter(result => result.verdict).length;

  const generateContent = () => {
    if (!hasEnded) {
      const currentQuestion = JSON.parse(JSON.stringify(currentItem)) as TQuestionFull;
      return <Fragment>
        <Stats items={[["Title", `${currentQuestion.quiz.subject} - ${currentQuestion.quiz.topic}`], ['Total Correct', totalCorrectAnswers], ["Current", currentIndex + 1], ["Total", totalQuestions], ["Type", currentQuestion.type], ["Weight", currentQuestion.weight], ["Time Allocated", currentQuestion.time_allocated], ["Difficulty", currentQuestion.difficulty]]} />
        <Question isLast={isLastItem} question={currentQuestion} changeCounter={(user_answers, time_taken, hints_used) => {
          setResults([...results, { ...currentQuestion, ...getAnswerResult(currentQuestion, user_answers, time_taken, hints_used, playSettings.options.partial_score), time_taken, hints_used, question_id: currentQuestion._id, user_answers }])
          getNextIndex();
        }} />
      </Fragment>
    }
    else return <Report setResults={setResults} results={results} />
  }

  return <div className="Quiz" style={{ backgroundColor: theme.color.base }}>
    {generateContent()}
  </div>
}