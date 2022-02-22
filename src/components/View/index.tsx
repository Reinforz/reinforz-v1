import { Box } from '@mui/material';
import * as CSS from 'csstype';
import { BiGridHorizontal, BiGridVertical } from "react-icons/bi";
import { HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";
import { useThemeSettings, useToggle } from '../../hooks';
import useSounds from '../../hooks/useSounds';
import IconGroup from '../IconGroup';
import "./style.scss";

export interface ViewProps {
  items: [JSX.Element, JSX.Element]
  lsKey?: string
}

export default function View(props: ViewProps) {
  const { toggle: toggleOrder, current_toggle: order } = useToggle<string>("0", ["0", "1"], props.lsKey + "_ORDER");
  const { toggle: toggleLayout, current_toggle: layout } = useToggle<CSS.FlexDirectionProperty>("column", ["row", "column"], props.lsKey + "_LAYOUT");
  const { theme } = useThemeSettings();
  const { swoosh } = useSounds();

  return <Box className="View">
    <Box className="View-content gap-1" style={{ flexDirection: layout + (order === "0" ? '' : '-reverse') as any }}>
      <Box className="View-content-item" style={{ width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[0]}
      </Box>
      <Box className="View-content-item" style={{ width: layout === 'column' ? '100%' : '50%', height: layout === 'column' ? '50%' : '100%' }}>
        {props.items[1]}
      </Box>
    </Box>
    <IconGroup className="View-icons" icons={[
      [`Click to switch to ${layout} layout`, layout === "row" ? <BiGridHorizontal size={15} fill={theme.palette.color.opposite_light} onClick={() => {
        swoosh()
        toggleLayout();
      }} /> : <BiGridVertical size={15} fill={theme.palette.color.opposite_light} onClick={() => {
        swoosh()
        toggleLayout();
      }} />],
      [`Click to switch to alternate order`, layout === "column" ? <HiSwitchVertical size={15} fill={theme.palette.color.opposite_light} onClick={() => {
        swoosh()
        toggleOrder();
      }} /> : <HiSwitchHorizontal size={15} fill={theme.palette.color.opposite_light} onClick={() => {
        swoosh()
        toggleOrder();
      }} />]
    ]} />
  </Box>
}