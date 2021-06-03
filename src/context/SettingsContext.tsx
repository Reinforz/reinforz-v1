import React from "react";
import { ISettings } from "../types";

export const SettingsContext = React.createContext({} as {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
})