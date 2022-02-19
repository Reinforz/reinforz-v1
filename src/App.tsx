import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { ReactNode, useContext, useState } from "react";
import { SimpleModal } from "./components";
import { ModalContext } from './context/ModalContext';
import { SettingsContext } from "./context/SettingsContext";
import { generateDynamicStyleClasses } from "./utils";

interface Props {
  children: ReactNode | ReactNode[]
}

export default function App(props: Props) {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  const theme = useTheme();
  const sx = generateDynamicStyleClasses(theme);
  const { settings } = useContext(SettingsContext);

  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <Box sx={sx} className={`App line-numbers ${theme.palette.theme}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.palette.color.dark }}>
      <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
        <Box sx={sx} className={`Modal-content line-numbers ${theme.palette.theme}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.palette.color.dark }}>
          {modalState[1]}
        </Box>
      </SimpleModal>
      {props.children}
    </Box>
  </ModalContext.Provider>
}