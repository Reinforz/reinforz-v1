import { useTheme } from "@material-ui/styles";
import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { ExtendedTheme } from "../../types";
import { generateMenuStyles } from "../../utils";
import Icon from "../Icon";
import "./style.scss";

export interface MenuProps {
  initialPosition?: 'left' | 'right';
  initialOpen?: boolean;
  width?: number;
  lsKey?: string;
  contents: [JSX.Element, JSX.Element];
}

export default function Menu(props: MenuProps) {
  const { width = 300, initialPosition, lsKey, initialOpen, contents } = props;
  let menuLsState = {
    position: initialPosition || "right",
    isOpen: initialOpen || true
  };

  if (lsKey) {
    const lsValue = localStorage.getItem(lsKey);
    if (lsValue)
      menuLsState = JSON.parse(lsValue)
  }
  const [isOpen, setIsOpen] = useState<boolean>(menuLsState.isOpen);
  const [position, setPosition] = useState(menuLsState.position);
  const theme = useTheme() as ExtendedTheme;

  const { left, iconsContainerStyle, iconStyle, contentStyle } = generateMenuStyles(position, isOpen, width);

  return <div style={contentStyle}>
    {contents[1]}
    <div className="Menu" style={{ left, width }}>
      <div className="Menu-icons" style={{ ...iconsContainerStyle, backgroundColor: theme.color.base }}>
        <Icon popoverText={`${isOpen ? "Close" : "Open"} Menu`}>
          <FaArrowAltCircleRight className="Menu-icons-icon Menu-icons-icon--toggle" onClick={() => {
            const newValue = !isOpen
            setIsOpen(newValue)
            lsKey && localStorage.setItem(lsKey, JSON.stringify({
              isOpen: newValue,
              position
            }))
          }} style={{ fill: theme.color.opposite_dark, ...iconStyle }} />
        </Icon>
        <Icon popoverText={`Switch to ${position === "left" ? "right" : "left"}`} >
          <RiArrowLeftRightLine className="Menu-icons-icon Menu-icons-icon--position" onClick={() => {
            const newValue = position === "left" ? "right" : "left"
            setPosition(newValue)
            lsKey && localStorage.setItem(lsKey, JSON.stringify({
              isOpen,
              position: newValue
            }))
          }} style={{ fill: theme.color.opposite_dark }} />
        </Icon>
      </div>
      {contents[0]}
    </div>
  </div>
}