import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-latex";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { IRootContextData, RootContext } from "./context/RootContext";
import { SettingsContext, SettingsContextData } from "./context/SettingsContext";
import initPrismLineNumbers from "./scripts/prism-line-numbers";
import './styles/index.scss';
import "./styles/prism-line-highlight.scss";
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";
import { ExtendedTheme, IErrorLog, IPlaySettings, IPreset, IQuizFull, ISettings, TQuestionFull } from "./types";
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettingsPresets, getSettingsPresets } from "./utils";

initPrismLineNumbers();
export interface RootProps extends Partial<IRootContextData>, Partial<SettingsContextData> {
  children: ReactNode | ReactNode[]
}

function findSettingsFromPresets(preset: IPreset<any>) {
  return preset.presets.find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

export const Root = (props: RootProps) => {
  const [settingsPresets, setSettingsPresets] = useState(props.settingsPresets ?? getSettingsPresets());
  const [settings, setSettings] = useState<ISettings>(props.settings ?? findSettingsFromPresets(settingsPresets));
  const [playSettingsPresets, setPlaySettingsPresets] = useState(props.playSettingsPresets ?? getPlaySettingsPresets());
  const [playSettings, setPlaySettings] = useState<IPlaySettings>(props.playSettings ?? findSettingsFromPresets(playSettingsPresets));
  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuizFull[]>(props.uploadedQuizzes ?? []);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>(props.selectedQuizIds ?? []);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>(props.errorLogs ?? []);
  const [playing, setPlaying] = useState<boolean>(props.playing ?? false);
  const [uploadedPlayState, setUploadedPlayState] = useState(props.uploadedPlayState ?? false);
  const [playQuizzes, setPlayQuizzes] = useState<{ selected: IQuizFull[], filtered: IQuizFull[] }>(props.playQuizzes ?? {
    filtered: [],
    selected: []
  });

  const [playQuestions, setPlayQuestions] = useState<{ array: TQuestionFull[], map: Map<string, TQuestionFull> }>(props.playQuestions ?? {
    array: [],
    map: new Map()
  })

  useEffect(() => {
    if (!uploadedPlayState) {
      const [selected, filtered] = applyPlaySettingsOptions(uploadedQuizzes, selectedQuizIds, playSettings.options, arrayShuffler);
      setPlayQuizzes({
        selected,
        filtered
      })
    }
  }, [uploadedQuizzes, selectedQuizIds, playSettings.options, uploadedPlayState]);

  useEffect(() => {
    if (!uploadedPlayState) {
      const [allQuestions, allQuestionsMap] = generateQuestionsMap(playQuizzes.filtered, playSettings.filters);
      setPlayQuestions({
        array: allQuestions,
        map: allQuestionsMap
      })
    }
  }, [playQuizzes.filtered, playSettings.filters, uploadedPlayState]);

  const allShuffledQuestions: TQuestionFull[] = useMemo(() => {
    return playSettings.options.flatten_mix && !uploadedPlayState ? arrayShuffler(playQuestions.array) : playQuestions.array
  }, [playQuestions.array, playSettings.options.flatten_mix, uploadedPlayState])

  useEffect(() => {
    setSettings(findSettingsFromPresets(settingsPresets))
    // eslint-disable-next-line
  }, [settingsPresets.current])

  useEffect(() => {
    setPlaySettings(findSettingsFromPresets(playSettingsPresets))
    // eslint-disable-next-line
  }, [playSettingsPresets.current])

  const allQuizzesMap: Map<string, IQuizFull> = new Map();
  playQuizzes.filtered.forEach(filteredQuiz => allQuizzesMap.set(filteredQuiz._id, filteredQuiz))

  const generatedTheme = generateTheme(settings) as ExtendedTheme;
  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ settings, setSettingsPresets, settingsPresets, setSettings }}>
        <RootContext.Provider value={{ allQuizzesMap, playQuestions, setPlayQuestions, playQuizzes, setPlayQuizzes, uploadedPlayState, setUploadedPlayState, playSettingsPresets, setPlaySettingsPresets, playing, setPlaying, selectedQuizzes: playQuizzes.selected, allQuestionsMap: playQuestions.map, allQuestions: allShuffledQuestions, filteredQuizzes: playQuizzes.filtered, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          {props.children}
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}