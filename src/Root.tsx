import { ThemeProvider } from "@mui/material";
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
import { IErrorLog, IGlobalSettings, IPlaySettings, IPresetConfig, IQuiz, TQuestion } from "./types";
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettingsPresets, getSettingsPresets } from "./utils";

initPrismLineNumbers();
export interface RootProps extends Partial<IRootContextData>, Partial<SettingsContextData> {
  children: ReactNode | ReactNode[]
}

function findSettingsFromPresets(preset: IPresetConfig<any>) {
  return preset.presets.find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

export const Root = (props: RootProps) => {
  const [settingsPresets, setSettingsPresetsConfigs] = useState(props.settingsPresets ?? getSettingsPresets());
  const [settings, setSettings] = useState<IGlobalSettings>(findSettingsFromPresets(settingsPresets));
  const [playSettingsPresets, setPlaySettingsPresets] = useState(props.playSettingsPresets ??getPlaySettingsPresets());
  const [playSettings, setPlaySettings] = useState<IPlaySettings>(findSettingsFromPresets(playSettingsPresets));

  const [uploadedQuizzes, setUploadedQuizzes] = useState<IQuiz[]>(props.uploadedQuizzes ?? []);
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>(props.selectedQuizIds ?? []);
  const [errorLogs, setErrorLogs] = useState<IErrorLog[]>(props.errorLogs ?? []);
  const [playing, setPlaying] = useState(false);
  const [uploadedPlayState, setUploadedPlayState] = useState(false);
  const [playQuizzes, setPlayQuizzes] = useState<{ selected: IQuiz[], settingsApplied: IQuiz[] }>({
    settingsApplied: [],
    selected: []
  });

  const [playQuestions, setPlayQuestions] = useState<{ array: TQuestion[], map: Map<string, TQuestion> }>({
    array: [],
    map: new Map()
  })
  const allQuizzesMap: Map<string, IQuiz> = new Map();

  useEffect(() => {
    if (!uploadedPlayState) {
      const selectedQuizIdsSet = new Set(selectedQuizIds);

      // Filter the selected quizzes
      const selectedQuizzes = uploadedQuizzes.filter((uploadedQuiz) =>
        selectedQuizIdsSet.has(uploadedQuiz._id)
      );

      const settingsAppliedQuizzes = applyPlaySettingsOptions(selectedQuizzes, playSettings.options);
      
      setPlayQuizzes({
        selected: selectedQuizzes,
        settingsApplied: settingsAppliedQuizzes
      })
    }
    // Call this effect if the uploaded quiz, selected quiz or the play settings option changes
  }, [uploadedQuizzes, selectedQuizIds, playSettings.options, uploadedPlayState]);

  useEffect(() => {
    if (!uploadedPlayState) {
      const allQuestionsMap = generateQuestionsMap(playQuizzes.settingsApplied, playSettings.filters);
      setPlayQuestions({
        array: Array.from(allQuestionsMap.values()),
        map: allQuestionsMap
      })
    }
  }, [playQuizzes.settingsApplied, playSettings.filters, uploadedPlayState]);

  const allShuffledQuestions: TQuestion[] = useMemo(() => {
    return playSettings.options.flatten_mix && !uploadedPlayState ? arrayShuffler(playQuestions.array) : playQuestions.array
  }, [playQuestions.array, playSettings.options.flatten_mix, uploadedPlayState])

  useEffect(() => {
    setSettings(findSettingsFromPresets(settingsPresets))
    // eslint-disable-next-line
  }, [settingsPresets.current]);

  useEffect(() => {
    setPlaySettings(findSettingsFromPresets(playSettingsPresets))
    // eslint-disable-next-line
  }, [playSettingsPresets.current]);

  const generatedTheme = useMemo(() => generateTheme(settings), [settings]);

  playQuizzes.settingsApplied.forEach(filteredQuiz => allQuizzesMap.set(filteredQuiz._id, filteredQuiz));

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ settings, setSettingsPresetsConfigs, settingsPresets, setSettings }}>
        <RootContext.Provider value={{ allQuizzesMap, playQuestions, setPlayQuestions, playQuizzes, setPlayQuizzes, uploadedPlayState, setUploadedPlayState, playSettingsPresets, setPlaySettingsPresets, playing, setPlaying, selectedQuizzes: playQuizzes.selected, allQuestionsMap: playQuestions.map, allQuestions: allShuffledQuestions, filteredQuizzes: playQuizzes.settingsApplied, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          {props.children}
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}