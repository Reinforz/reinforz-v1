import * as CSS from 'csstype';
import React from 'react';
import { BiGridHorizontal, BiGridVertical } from "react-icons/bi";
import { HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";
import { useThemeSettings, useToggle } from '../../hooks';
import Icon from '../Icon';
import "./style.scss";

interface Props {
  items: [JSX.Element, JSX.Element]
  lsKey?: string
}

export default function View(props: Props) {
  const { theme } = useThemeSettings();

  const { toggle: toggleOrder, current_toggle: order } = useToggle<number>(0, [0, 1], props.lsKey + "_ORDER");
  const { toggle: toggleLayout, current_toggle: layout } = useToggle<CSS.FlexDirectionProperty>("column", ["row", "column"], props.lsKey + "_LAYOUT");

  return <div className="View">
    <div className="View-content" style={{ flexDirection: layout + (order === 0 ? '' : '-reverse') as any }}>
      <div className="View-content-item" style={{ width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[0]}
      </div>
      <div className="View-content-item" style={{ width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[1]}
      </div>
    </div>
    <div className="View-icons" style={{ backgroundColor: theme.color.base }}>
      <div className="View-icons-layout" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.light }}>
        <Icon popoverText="Click to switch to column layout">
          <BiGridHorizontal size={15} style={{ display: layout === "row" ? "initial" : "none" }} onClick={() => {
            toggleLayout();
          }} />
        </Icon>
        <Icon popoverText="Click to switch to row layout">
          <BiGridVertical size={15} onClick={() => {
            toggleLayout();
          }} style={{ display: layout === "column" ? "initial" : "none" }} />
        </Icon>
      </div>
      <div className="View-icons-order" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.light }}>
        <Icon popoverText="Click to switch to alternate order" >
          <HiSwitchVertical size={15} onClick={() => {
            toggleOrder();
          }} style={{ display: layout === "column" ? "initial" : "none" }} />
        </Icon>
        <Icon popoverText="Click to switch to alternate order" >
          <HiSwitchHorizontal size={15} onClick={() => {
            toggleOrder();
          }} style={{ display: layout === "row" ? "initial" : "none" }} />
        </Icon>
      </div>
    </div>
  </div>


  /* return props.children({
    ViewComponent: ,
    ViewExtra: {
      ViewContainerProps: {
        style: { flexDirection: layout },
        className: "View"
      },
      ViewComponentsStyle: [{ order, height: layout === "column" ? "50%" : "100%" }, { order: "initial", height: layout === "column" ? "50%" : "100%" }]
    }
  }) */
}