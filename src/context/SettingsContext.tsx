import React from "react";
import { ISettings } from "../types";

export const SettingsContext = React.createContext({} as {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>
})