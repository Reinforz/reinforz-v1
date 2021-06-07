import React, { useState } from "react";
import { FaArrowAltCircleRight, FaSave } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { useThemeSettings } from "../../hooks";
import { generateMenuStyles } from "../../utils";
import IconGroup from "../IconGroup";
import "./style.scss";

export interface MenuProps {
  initialPosition?: 'left' | 'right';
  initialOpen?: boolean;
  width?: number;
  lsKey?: string;
  contents: [JSX.Element, JSX.Element];
  modalOpen?: () => void
}

export default function Menu(props: MenuProps) {
  const { theme } = useThemeSettings();
  const { modalOpen, width = 300, initialPosition, lsKey, initialOpen, contents } = props;
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

  const { left, iconsContainerStyle, iconStyle, contentStyle } = generateMenuStyles(position, isOpen, width);

  return <div style={contentStyle}>
    {contents[1]}
    <div className="Menu" style={{ left, width }}>
      <IconGroup className="Menu-icons" direction="column" style={iconsContainerStyle} icons={[
        [`${isOpen ? "Close" : "Open"} Menu`, <FaArrowAltCircleRight fill={theme.color.opposite_light} onClick={() => {
          const newValue = !isOpen
          setIsOpen(newValue)
          lsKey && localStorage.setItem(lsKey, JSON.stringify({
            isOpen: newValue,
            position
          }))
        }} style={iconStyle} />],
        [`Switch to ${position === "left" ? "right" : "left"}`, <RiArrowLeftRightLine fill={theme.color.opposite_light} onClick={() => {
          const newValue = position === "left" ? "right" : "left"
          setPosition(newValue)
          lsKey && localStorage.setItem(lsKey, JSON.stringify({
            isOpen,
            position: newValue
          }))
        }} />,
        ],
        ['Save as preset', <FaSave fill={theme.color.opposite_light} onClick={() => modalOpen && modalOpen()} />]
      ]} />
      {contents[0]}
    </div>
  </div>
}