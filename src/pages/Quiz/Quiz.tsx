import yaml, { safeDump } from 'js-yaml';
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaCloudDownloadAlt, FaKeyboard } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Hovertips, IconGroup, Stats, Upload } from "../../components";
import { RootContext } from "../../context/RootContext";
import { useCycle, useNavigationIcons, useThemeSettings } from "../../hooks";
import { IPlayDownloadedState, IResult, TQuestionFull } from "../../types";
import { download, generateNavigationStyles, generateQuizzesFromPlayState, getAnswerResult } from "../../utils";
import Question from "../Question/Question";
import "./Quiz.scss";

export default function Quiz() {
  const history = useHistory();
  const { setPlayQuestions, setPlayQuizzes, setUploadedPlayState, setPlaying, playSettings, selectedQuizzes, setPlaySettings, allQuestions, playing } = useContext(RootContext);
  const [results, setResults] = useState([] as IResult[]);
  const { theme, settings } = useThemeSettings();
  const { isLastItem, currentItem, getNextIndex, currentIndex, setCurrentIndex } = useCycle(allQuestions);
  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

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
      return <div className="Quiz bg-base">
        <div style={{ display: 'flex' }}>
          <Stats style={{ flex: 1 }} items={[["Title", `${currentQuestion.quiz.subject} - ${currentQuestion.quiz.topic}`], playSettings.options.instant_feedback ? ['Total Correct', totalCorrectAnswers] : null, ["Current", currentIndex + 1], ["Total", totalQuestions], ["Type", currentQuestion.type], ["Weight", currentQuestion.weight], !playSettings.options.disable_timer ? ["Time Allocated", currentQuestion.time_allocated] : null, ["Difficulty", currentQuestion.difficulty]]} />
          <Hovertips popoverText="Download current play state" style={{ height: "calc(100% - 10px)", padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FaCloudDownloadAlt fill={theme.color.opposite_light} size={25} onClick={() => {
              download(`Play-${Date.now()}.yaml`, safeDump({
                questions: allQuestions,
                results: results.map(result => ({ ...result, question: result.question._id })),
                playSettings,
                quizzes: selectedQuizzes.map(selectedQuiz => ({ _id: selectedQuiz._id, subject: selectedQuiz.subject, topic: selectedQuiz.topic }))
              }))
            }} />
          </Hovertips>
        </div>
        <Question isLast={isLastItem} question={currentQuestion} changeCounter={(user_answers, time_taken, hints_used) => {
          const [transformedQuestion, answerResult] = getAnswerResult(currentQuestion, user_answers, time_taken, hints_used, playSettings.options.partial_score, playSettings.options.disable_timer);
          const newResultState = [...results, { question: transformedQuestion, ...answerResult, time_taken, hints_used, user_answers }];
          if (allQuestions.length - 1 === currentIndex) {
            setPlaying(false);
            setUploadedPlayState(false)
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
      return <div ref={ref} className="Quiz" onKeyPress={onKeyPress} tabIndex={0}>
        <IconGroup className="Report-icons" icons={navigationIcons} direction={settings.navigation.direction} style={generatedNavigationStyles} />
        <Upload accept={[".yaml", ".yml"]} maxFiles={1} uploadMessage="Drag 'n' drop, or click to upload some play files (.json or .yaml)" onLoad={(result) => {
          const uploadedPlayState = yaml.safeLoad(result as string) as any;
          return uploadedPlayState;
        }} postRead={([playState]: IPlayDownloadedState[]) => {
          const allQuestionsMap: Map<string, TQuestionFull> = new Map();
          playState.questions.forEach((question) =>
            allQuestionsMap.set(question._id, question)
          );
          const generatedQuizzesMap = generateQuizzesFromPlayState(playState, allQuestionsMap);
          const generatedQuizzesArray = Array.from(generatedQuizzesMap.values());
          setUploadedPlayState(true)
          setPlayQuestions({
            array: playState.questions,
            map: allQuestionsMap
          })
          setPlayQuizzes({
            filtered: generatedQuizzesArray,
            selected: generatedQuizzesArray
          })
          setCurrentIndex(playState.results.length)
          setResults(playState.results as any)
          setPlaySettings(playState.playSettings)
          setPlaying(true)
        }} />
      </div>;
    }
  }

  return render();
}