import React from "react";
import { ISettings, ISettingsPreset } from "../types";

export interface SettingsContextData {
  settingsPresets: ISettingsPreset;
  settings: ISettings
}

export interface ISettingsContext extends SettingsContextData {
  setSettingsPresets: React.Dispatch<React.SetStateAction<ISettingsPreset>>
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}

export const SettingsContext = React.createContext({} as ISettingsContext)