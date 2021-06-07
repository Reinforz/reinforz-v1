import React from "react";
import { ISettings, ISettingsPreset } from "../types";

export const SettingsContext = React.createContext({} as {
  settingsPresets: ISettingsPreset;
  setSettingsPresets: React.Dispatch<React.SetStateAction<ISettingsPreset>>
  settings: ISettings
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>
})