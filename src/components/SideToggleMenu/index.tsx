import { PopoverOrigin } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { generateMenuStyles } from "../../utils";
import IconGroup from "../IconGroup";
import "./style.scss";
export interface SideToggleMenuProps {
  initialPosition?: 'left' | 'right';
  initialOpen?: boolean;
  width?: number;
  lsKey?: string;
  contents: [JSX.Element, JSX.Element];
  icons?: [string, JSX.Element][]
}

export default function SideToggleMenu(props: SideToggleMenuProps) {
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);
  const { icons = [], width = 300, initialPosition, lsKey, initialOpen, contents } = props;
  let menuLsState = {
    position: initialPosition ?? "right",
    isOpen: initialOpen ?? true
  };

  if (lsKey) {
    const lsValue = localStorage.getItem(lsKey);
    if (lsValue)
      menuLsState = JSON.parse(lsValue)
  }
  const [isOpen, setIsOpen] = useState<boolean>(menuLsState.isOpen);
  const [position, setPosition] = useState(menuLsState.position);

  const { left, iconsContainerStyle, iconStyle, containerStyle } = generateMenuStyles(position, isOpen, width);
  const popoverOrigin: {
    popoverAnchorOrigin: PopoverOrigin
    popoverTransformOrigin: PopoverOrigin
  } = position === "left" ? {
    popoverAnchorOrigin: {
      vertical: 'center',
      horizontal: 'right',
    },
    popoverTransformOrigin: {
      vertical: 'center',
      horizontal: 'left',
    }
  } : {
      popoverAnchorOrigin: {
        vertical: 'center',
        horizontal: 'left',
      },
      popoverTransformOrigin: {
        vertical: 'center',
        horizontal: 'right',
      }
    };

  const contentStyle: React.CSSProperties = {};

  if (isOpen) {
    if (position === 'left') contentStyle.marginLeft = 5;
    else contentStyle.marginRight = 5;
  }

  return <div style={containerStyle} className="SideToggleMenu">
    <div style={contentStyle}>
      {contents[1]}
    </div>
    <div className="SideToggleMenu-sidebar p-5" style={{ left, width }}>
      <IconGroup className="SideToggleMenu-sidebar-icons" direction="column" style={iconsContainerStyle} icons={[
        [`${isOpen ? "Close" : "Open"} Menu`, <FaArrowAltCircleRight fill={theme.color.opposite_light} onClick={() => {
          if (settings.sound && isOpen === false) {
            sounds.switch_on.play();
          } else if (settings.sound && isOpen === true) {
            sounds.switch_off.play();
          }
          const newValue = !isOpen
          setIsOpen(newValue)
          lsKey && localStorage.setItem(lsKey, JSON.stringify({
            isOpen: newValue,
            position
          }))
        }} style={iconStyle} />, popoverOrigin],
        [`Switch to ${position === "left" ? "right" : "left"}`, <RiArrowLeftRightLine fill={theme.color.opposite_light} onClick={() => {
          settings.sound && sounds.swoosh.play();
          const newValue = position === "left" ? "right" : "left"
          setPosition(newValue)
          lsKey && localStorage.setItem(lsKey, JSON.stringify({
            isOpen,
            position: newValue
          }))
        }} />, popoverOrigin
        ],
        ...icons,
      ]} />
      {contents[0]}
    </div>
  </div>
}