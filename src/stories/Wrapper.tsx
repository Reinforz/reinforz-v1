import { ThemeProvider } from "@material-ui/styles";
import { SettingsContext } from "../context/SettingsContext";
import initPrismLineNumbers from "../scripts/prism-line-numbers";
import { ExtendedTheme, ISettings } from "../types";
import { generateDefaultSettingsPreset, generateDynamicStyleClasses, generateTheme } from "../utils";

initPrismLineNumbers();
interface Props {
  children: JSX.Element | null | string | ((settings: ISettings, theme: ExtendedTheme) => JSX.Element)
}

function Root(props: Props & { settings: ISettings, theme: ExtendedTheme }) {
  const { settings, theme } = props;
  const classes = generateDynamicStyleClasses();
  return <div className={`${classes.root}`} style={{ backgroundColor: theme.color.dark, height: 'fit-content', padding: 5, overflow: 'hidden' }}>
    {typeof props.children === "function" ? props.children(settings, theme) : props.children}
  </div>
}

export default function Wrapper(props: Props) {
  const defaultSettingsPresets = generateDefaultSettingsPreset();
  const defaultSettings = defaultSettingsPresets.presets[0].data;
  const generatedTheme = generateTheme(defaultSettings) as ExtendedTheme;

  return <ThemeProvider theme={generatedTheme}>
    <SettingsContext.Provider value={{ setSettings: () => { }, setSettingsPresets: () => { }, settings: defaultSettings, settingsPresets: defaultSettingsPresets }}>
      <Root theme={generatedTheme} settings={defaultSettings}>
        {props.children}
      </Root>
    </SettingsContext.Provider>
  </ThemeProvider>
}

