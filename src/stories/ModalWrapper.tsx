import { Box } from "@mui/material";
import { useState } from "react";
import { SimpleModal } from "../components";
import { ModalContext } from "../context/ModalContext";

interface Props {
  children: JSX.Element | null | string
}

export default function ModalWrapper(props: Props) {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
      <Box className="Modal-content">
        {modalState[1]}
      </Box>
    </SimpleModal>
    {props.children}
  </ModalContext.Provider>
}