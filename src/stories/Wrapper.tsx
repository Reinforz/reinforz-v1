import { ThemeProvider } from "@material-ui/styles";
import { SettingsContext } from "../context/SettingsContext";
import { ExtendedTheme } from "../types";
import { generateDefaultSettingsPreset, generateTheme } from "../utils";

interface Props {
  children: JSX.Element
}

export default function Wrapper(props: Props) {
  const defaultSettingsPresets = generateDefaultSettingsPreset();
  const defaultSettingsPreset = defaultSettingsPresets.presets[0].data
  const generatedTheme = generateTheme(defaultSettingsPreset) as ExtendedTheme;

  return <ThemeProvider theme={generatedTheme}>
    <SettingsContext.Provider value={{ setSettings: () => { }, setSettingsPresets: () => { }, settings: defaultSettingsPreset, settingsPresets: defaultSettingsPresets }}>
      {props.children}
    </SettingsContext.Provider>
  </ThemeProvider>
}