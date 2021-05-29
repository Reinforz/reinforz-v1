import { useTheme } from "@material-ui/styles";
import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { ExtendedTheme } from "../../types";
import Icon from "../Icon";
import "./style.scss";

export interface MenuProps {
  initial_position?: 'left' | 'right';
  initial_open?: boolean;
  children: any;
  width?: number;
  lskey: string;
  content: JSX.Element;
}

export interface MenuRProps {
  MenuComponent: JSX.Element;
  MenuExtra: {
    content_elem_style: any;
  };
}

export default function Menu(props: MenuProps) {
  const { width = 300, initial_position, lskey, initial_open, content, children } = props;
  let menu_ls_state = {
    position: initial_position || "left",
    is_open: initial_open || false
  };

  if (lskey) {
    const ls_value = localStorage.getItem(lskey);
    if (ls_value)
      menu_ls_state = JSON.parse(ls_value)
  }
  const [is_open, setIsOpen] = useState(menu_ls_state.is_open);
  const [position, setPosition] = useState(menu_ls_state.position);
  const theme = useTheme() as ExtendedTheme;

  const content_elem_style: any = {};
  content_elem_style.position = `absolute`;
  content_elem_style.transition = `width 250ms ease-in-out, left 250ms ease-in-out`;

  let left = null, icons_style = {
    backgroundColor: theme.color.dark
  } as any, icon_style = {} as any;

  if (position === "right") {
    if (is_open) {
      left = `calc(100% - ${width}px)`;
      icon_style.transform = "rotate(0deg)";
      icons_style.left = "-40px"
      content_elem_style.width = `calc(100% - ${width}px)`;
      content_elem_style.left = `0px`;
    }
    else {
      left = "100%"
      icon_style.transform = "rotate(-180deg)";
      icons_style.left = "-40px"
      content_elem_style.width = `100%`;
      content_elem_style.left = `0px`;
    }
  } else {
    if (is_open) {
      left = "0px"
      icon_style.transform = "rotate(-180deg)";;
      icons_style.left = "100%"
      content_elem_style.width = `calc(100% - ${width}px)`;
      content_elem_style.left = `${width}px`;
    }
    else {
      left = `-${width}px`
      icon_style.transform = "rotate(0deg)"
      icons_style.left = "100%"
      content_elem_style.width = `100%`;
      content_elem_style.left = `0px`;
    }
  }

  return children({
    MenuComponent: <div className="Menu" style={{ left }}>
      <div className="Menu-icons" style={icons_style}>
        <Icon popoverText={`${is_open ? "Close" : "Open"} Menu`}>
          <FaArrowAltCircleRight className="Menu-icons-icon Menu-icons-icon--toggle" onClick={() => {
            const new_value = !is_open
            setIsOpen(new_value)
            lskey && localStorage.setItem(lskey, JSON.stringify({
              is_open: new_value,
              position
            }))
          }} style={{ fill: theme.color.opposite_dark, ...icon_style }} />
        </Icon>
        <Icon popoverText={`Switch to ${position === "left" ? "right" : "left"}`} >
          <RiArrowLeftRightLine className="Menu-icons-icon Menu-icons-icon--position" onClick={() => {
            const new_value = position === "left" ? "right" : "left"
            setPosition(new_value)
            lskey && localStorage.setItem(lskey, JSON.stringify({
              is_open,
              position: new_value
            }))
          }} style={{ fill: theme.color.opposite_dark }} />
        </Icon>
      </div>
      {content}
    </div>,
    MenuExtra: {
      content_elem_style
    }
  })
}