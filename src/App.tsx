import { useTheme } from "@material-ui/core";
import { ReactNode, useContext, useState } from "react";
import { SimpleModal } from "./components";
import { ModalContext } from './context/ModalContext';
import { SettingsContext } from "./context/SettingsContext";
import { ExtendedTheme } from "./types";
import { generateDynamicStyleClasses } from "./utils";

interface Props {
  children: ReactNode | ReactNode[]
}

export default function App(props: Props) {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  const theme = useTheme() as ExtendedTheme;
  const classes = generateDynamicStyleClasses();
  const { settings } = useContext(SettingsContext);

  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <div className={`App line-numbers ${theme.theme} ${classes.root}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.color.dark }}>
      <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
        <div className="Modal-content">
          {modalState[1]}
        </div>
      </SimpleModal>
      {props.children}
    </div>
  </ModalContext.Provider>
}