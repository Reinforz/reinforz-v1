import { Theme } from "@emotion/react";
import { ThemeProvider } from "@material-ui/styles";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { SettingsContext } from "../context/SettingsContext";
import initPrismLineNumbers from "../scripts/prism-line-numbers";
import { IGlobalSettings } from "../types";
import { generateDefaultSettingsPreset, generateDynamicStyleClasses, generateTheme } from "../utils";

initPrismLineNumbers();
interface Props {
  children: ReactNode | ReactNode[] | ((settings: IGlobalSettings, theme: Theme) => JSX.Element)
}

function Root(props: Props & { settings: IGlobalSettings, theme: Theme }) {
  const { settings, theme } = props;
  const classes = generateDynamicStyleClasses();
  return <Box className={`App ${classes.root}`} style={{ backgroundColor: theme.palette.color.dark, height: 'fit-content', padding: 5, overflow: 'hidden' }}>
    {typeof props.children === "function" ? props.children(settings, theme) : props.children}
  </Box>
}

export default function Wrapper(props: Props) {
  const defaultSettingsPresets = generateDefaultSettingsPreset();
  const defaultSettings = defaultSettingsPresets.presets[0].data;
  defaultSettings.theme = 'polar_night';
  const generatedTheme = generateTheme(defaultSettings) as Theme;

  return <ThemeProvider theme={generatedTheme}>
    <SnackbarProvider maxSnack={4}>
      <SettingsContext.Provider value={{ setSettings: () => { }, setSettingsPresets: () => { }, settings: defaultSettings, settingsPresets: defaultSettingsPresets }}>
        <Root theme={generatedTheme} settings={defaultSettings}>
          {props.children}
        </Root>
      </SettingsContext.Provider>
    </SnackbarProvider>
  </ThemeProvider>
}

