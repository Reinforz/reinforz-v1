import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { IRootContextData, RootContext } from "./context/RootContext";
import { SettingsContext } from "./context/SettingsContext";
import { ExtendedTheme, IErrorLog, IPlaySettings, IPreset, IQuizFull, ISettings, TQuestionFull } from "./types";
import { applyPlaySettingsOptions, arrayShuffler, generateQuestionsMap, generateTheme, getPlaySettingsPresets, getSettingsPresets } from "./utils";

export interface RootProps extends Partial<IRootContextData> {
  children: ReactNode | ReactNode[]
}

function findSettingsFromPresets(preset: IPreset<any>) {
  return preset.presets.find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

export const Root = (props: RootProps) => {
  const [settingsPresets, setSettingsPresets] = useState(getSettingsPresets());
  const [settings, setSettings] = useState<ISettings>(findSettingsFromPresets(settingsPresets));
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

  const generatedTheme = generateTheme(settings) as ExtendedTheme;
  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ settings, setSettingsPresets, settingsPresets, setSettings }}>
        <RootContext.Provider value={{ playQuestions, setPlayQuestions, playQuizzes, setPlayQuizzes, uploadedPlayState, setUploadedPlayState, playSettingsPresets, setPlaySettingsPresets, playing, setPlaying, selectedQuizzes: playQuizzes.selected, allQuestionsMap: playQuestions.map, allQuestions: allShuffledQuestions, filteredQuizzes: playQuizzes.filtered, setPlaySettings, playSettings, errorLogs, setErrorLogs, uploadedQuizzes, selectedQuizIds, setUploadedQuizzes, setSelectedQuizIds }}>
          {props.children}
        </RootContext.Provider>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}