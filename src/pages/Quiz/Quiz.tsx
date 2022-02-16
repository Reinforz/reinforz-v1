import yaml, { safeDump } from 'js-yaml';
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaCloudDownloadAlt, FaKeyboard } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Hovertips, IconGroup, StackList, Upload } from "../../components";
import { RootContext } from "../../context/RootContext";
import { useCycle, useNavigationIcons, useThemeSettings } from "../../hooks";
import { IPlayDownloadedState, IQuestionResult, TQuestion } from "../../types";
import { download, generateNavigationStyles, generateQuizzesFromPlayState, getAnswerResult } from "../../utils";
import Question from "../Question/Question";
import "./Quiz.scss";

export default function Quiz() {
  const history = useHistory();
  const rootContext = useContext(RootContext);
  const { setPlayQuestions, setPlayQuizzes, setUploadedPlayState, setPlaying, playSettings, selectedQuizzes, setPlaySettings, allQuestions, playing, allQuizzesMap } = rootContext;
  const [results, setResults] = useState([] as IQuestionResult[]);
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
        currentQuestion = JSON.parse(JSON.stringify(currentItem)) as TQuestion;
      const currentQuiz = allQuizzesMap.get(currentQuestion.quiz)!;
      const stackListItems: [ReactNode, ReactNode][] = [["Title", `${currentQuiz.subject} - ${currentQuiz.topic}`]];
      if (playSettings.options.instant_feedback)
        stackListItems.push(['Total Correct', totalCorrectAnswers])
      stackListItems.push(["Current", currentIndex + 1], ["Total", totalQuestions], ["Type", currentQuestion.type], ["Weight", currentQuestion.weight], ["Difficulty", currentQuestion.difficulty])
      if (!playSettings.options.disable_timer)
        stackListItems.push(["Time Allocated", currentQuestion.time_allocated])
      return <div className="Quiz bg-base flex fd-c p-5">
        <div className="flex ai-c mb-5" style={{ height: 60 }}>
          <StackList direction="row" items={stackListItems} classNames={{
            container: 'p-0 flex-1',
            content: 'jc-sb'
          }} />
          <Hovertips popoverText="Download current play state" className="p-5 bg-light flex jc-c ai-c" style={{ height: 'calc(100% - 20px)', marginLeft: 5 }}>
            <FaCloudDownloadAlt fill={theme.palette.color.opposite_light} size={25} onClick={() => {
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
              allQuizzesMap: allQuizzesMap
            })
          } else {
            setResults(newResultState)
            getNextIndex();
          }
        }} />
      </div>
    } else {
      return <div ref={ref} className="Quiz flex fd-c" onKeyPress={onKeyPress} tabIndex={0}>
        <IconGroup className="Report-icons" icons={navigationIcons} direction={settings.navigation.direction} style={generatedNavigationStyles} />
        <Upload className="center" accept={[".yaml", ".yml"]} maxFiles={1} uploadMessage="Drag 'n' drop, or click to upload some play files (.json or .yaml)" onLoad={(result) => {
          const uploadedPlayState = yaml.safeLoad(result as string) as any;
          return uploadedPlayState;
        }} postRead={([playState]: IPlayDownloadedState[]) => {
          const allQuestionsMap: Map<string, TQuestion> = new Map();
          playState.questions.forEach((question) =>
            allQuestionsMap.set(question._id, question)
          );
          const generatedQuizzesMap = generateQuizzesFromPlayState(allQuizzesMap, playState, allQuestionsMap);
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