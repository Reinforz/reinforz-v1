import React from "react";
import { IGlobalSettings, IGlobalSettingsPresetConfig } from "../types";

export interface SettingsContextData {
  settingsPresets: IGlobalSettingsPresetConfig;
  settings: IGlobalSettings
}

export interface ISettingsContext extends SettingsContextData {
  setSettingsPresets: React.Dispatch<React.SetStateAction<IGlobalSettingsPresetConfig>>
  setSettings: React.Dispatch<React.SetStateAction<IGlobalSettings>>
}

export const SettingsContext = React.createContext({} as ISettingsContext)