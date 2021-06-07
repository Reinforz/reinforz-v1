import React from "react";

export interface IModalContext {
  modalState: [boolean, JSX.Element | null],
  setModalState: React.Dispatch<React.SetStateAction<[boolean, JSX.Element | null]>>
}

export const ModalContext = React.createContext({} as IModalContext)
