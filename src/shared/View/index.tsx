import * as CSS from 'csstype';
import React from 'react';
import { BiGridHorizontal, BiGridVertical } from "react-icons/bi";
import { HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";
import { useThemeSettings, useToggle } from '../../hooks';
import Icon from '../Icon';
import "./style.scss";

export default function View(props: { children: any, lskey: string }) {
  const { theme } = useThemeSettings();

  const { toggle: toggleOrder, current_toggle: order } = useToggle<number>(0, [0, 1], props.lskey + "order");
  const { toggle: toggleLayout, current_toggle: layout } = useToggle<CSS.FlexDirectionProperty>("column", ["row", "column"], props.lskey + "layout");
  return props.children({
    ViewComponent: <div className="View-icons">
      <div className="View-icons-layout" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.light }}>
        <Icon popoverText="Click to switch to column layout">
          <BiGridHorizontal style={{ display: layout === "row" ? "initial" : "none" }} onClick={() => {
            toggleLayout();
          }} />
        </Icon>
        <Icon popoverText="Click to switch to row layout">
          <BiGridVertical onClick={() => {
            toggleLayout();
          }} style={{ display: layout === "column" ? "initial" : "none" }} />
        </Icon>
      </div>
      <div className="View-icons-order" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.light }}>
        <Icon popoverText="Click to switch to alternate order" >
          <HiSwitchVertical onClick={() => {
            toggleOrder();
          }} style={{ display: layout === "column" ? "initial" : "none" }} />
        </Icon>
        <Icon popoverText="Click to switch to alternate order" >
          <HiSwitchHorizontal onClick={() => {
            toggleOrder();
          }} style={{ display: layout === "row" ? "initial" : "none" }} />
        </Icon>
      </div>
    </div>,
    ViewExtra: {
      ViewContainerProps: {
        style: { flexDirection: layout },
        className: "View"
      },
      ViewComponentsStyle: [{ order, height: layout === "column" ? "50%" : "100%" }, { order: "initial", height: layout === "column" ? "50%" : "100%" }]
    }
  })
}