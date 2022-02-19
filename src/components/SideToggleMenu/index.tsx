import { Box, PopoverOrigin } from "@mui/material";
import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { useThemeSettings } from "../../hooks";
import useSounds from "../../hooks/useSounds";
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
  const { switch_off, switch_on, swoosh } = useSounds();
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

  return <Box style={containerStyle} className="SideToggleMenu">
    <Box style={contentStyle} className="SideToggleMenu-content">
      {contents[1]}
    </Box>
    <Box className="SideToggleMenu-sidebar p-1" style={{ left, width }}>
      <IconGroup className="SideToggleMenu-sidebar-icons" direction="column" style={iconsContainerStyle} icons={[
        [`${isOpen ? "Close" : "Open"} Menu`, <FaArrowAltCircleRight fill={theme.palette.color.opposite_light} onClick={() => {
          if (isOpen === false) {
            switch_on();
          } else if (isOpen === true) {
            switch_off();
          }
          const newValue = !isOpen
          setIsOpen(newValue)
          lsKey && localStorage.setItem(lsKey, JSON.stringify({
            isOpen: newValue,
            position
          }))
        }} style={iconStyle} />, popoverOrigin],
        [`Switch to ${position === "left" ? "right" : "left"}`, <RiArrowLeftRightLine fill={theme.palette.color.opposite_light} onClick={() => {
          swoosh();
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
    </Box>
  </Box>
}