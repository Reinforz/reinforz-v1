import { useTheme } from "@material-ui/core";
import { ReactNode, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { SimpleModal } from "./components";
import { REINFORZ_PLAY_SETTINGS_LS_KEY, REINFORZ_SETTINGS_LS_KEY } from "./constants";
import { ModalContext } from './context/ModalContext';
import { RootContext } from "./context/RootContext";
import { SettingsContext } from "./context/SettingsContext";
import { ExtendedTheme } from "./types";
import { generateDynamicStyleClasses, navigateBetweenPresets } from "./utils";

interface Props {
  children: ReactNode | ReactNode[]
}

export default function App(props: Props) {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  const theme = useTheme() as ExtendedTheme;
  const classes = generateDynamicStyleClasses();
  const { settings, setSettingsPresets, settingsPresets } = useContext(SettingsContext);
  const { pathname } = useLocation();
  const { playSettingsPresets, setPlaySettingsPresets } = useContext(RootContext)

  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <div onKeyUp={(e) => {
      if (pathname === "/settings") {
        navigateBetweenPresets(e, settingsPresets, setSettingsPresets, REINFORZ_SETTINGS_LS_KEY)
      } else if (pathname === "/") {
        navigateBetweenPresets(e, playSettingsPresets, setPlaySettingsPresets, REINFORZ_PLAY_SETTINGS_LS_KEY)
      }
    }} className={`App line-numbers ${theme.theme} ${classes.root}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.color.dark }}>
      <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
        <div className="Modal-content">
          {modalState[1]}
        </div>
      </SimpleModal>
      {props.children}
    </div>
  </ModalContext.Provider>
}