import { ThemeProvider } from "@material-ui/styles";
import { SettingsContext } from "../context/SettingsContext";
import { ExtendedTheme, ISettings } from "../types";
import { generateDefaultSettingsPreset, generateTheme } from "../utils";

interface Props {
  children: JSX.Element | ((settings: ISettings, theme: ExtendedTheme) => JSX.Element)
}

export default function Wrapper(props: Props) {
  const defaultSettingsPresets = generateDefaultSettingsPreset();
  const defaultSettings = defaultSettingsPresets.presets[0].data
  const generatedTheme = generateTheme(defaultSettings) as ExtendedTheme;

  return <ThemeProvider theme={generatedTheme}>
    <SettingsContext.Provider value={{ setSettings: () => { }, setSettingsPresets: () => { }, settings: defaultSettings, settingsPresets: defaultSettingsPresets }}>
      {typeof props.children === "function" ? props.children(defaultSettings, generatedTheme) : props.children}
    </SettingsContext.Provider>
  </ThemeProvider>
}