import * as CSS from 'csstype';
import React, { useContext } from 'react';
import { BiGridHorizontal, BiGridVertical } from "react-icons/bi";
import { HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings, useToggle } from '../../hooks';
import sounds from '../../sounds';
import IconGroup from '../IconGroup';
import "./style.scss";

export interface ViewProps {
  items: [JSX.Element, JSX.Element]
  lsKey?: string
}

export default function View(props: ViewProps) {
  const { settings } = useContext(SettingsContext)
  const { toggle: toggleOrder, current_toggle: order } = useToggle<string>("0", ["0", "1"], props.lsKey + "_ORDER");
  const { toggle: toggleLayout, current_toggle: layout } = useToggle<CSS.FlexDirectionProperty>("column", ["row", "column"], props.lsKey + "_LAYOUT");
  const { theme } = useThemeSettings();
  return <div className="View">
    <div className="View-content" style={{ flexDirection: layout + (order === "0" ? '' : '-reverse') as any }}>
      <div className="View-content-item" style={{ marginRight: order === "0" && layout === 'row' ? 5 : 0, width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[0]}
      </div>
      <div className="View-content-item" style={{ marginRight: order === "1" && layout === 'row' ? 5 : 0, width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[1]}
      </div>
    </div>
    <IconGroup className="View-icons" icons={[
      [`Click to switch to ${layout} layout`, layout === "row" ? <BiGridHorizontal size={15} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        toggleLayout();
      }} /> : <BiGridVertical size={15} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        toggleLayout();
      }} />],
      [`Click to switch to alternate order`, layout === "column" ? <HiSwitchVertical size={15} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        toggleOrder();
      }} /> : <HiSwitchHorizontal size={15} fill={theme.color.opposite_light} onClick={() => {
        settings.sound && sounds.swoosh.play()
        toggleOrder();
      }} />]
    ]} />
  </div>
}