import { Box, Typography } from '@mui/material';
import { blue, green, indigo, orange, red, yellow } from '@mui/material/colors';
import { useContext, useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaKeyboard } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoLogoGameControllerB, IoMdCreate } from 'react-icons/io';
import { IconGroup, Preset, Select, SelectGroup, Toggles } from '../../components';
import { REINFORZ_GLOBAL_SETTINGS_LS_KEY } from '../../constants';
import { SettingsContext } from '../../context/SettingsContext';
import { useNavigationIcons } from '../../hooks';
import { generateNavigationStyles, navigateBetweenPresets, transformTextBySeparator } from '../../utils';
import "./Settings.scss";

const colorMap: Record<string, string> = {
  [`${red[500]}`]: "Red",
  [`${orange[500]}`]: "Orange",
  [`${yellow[500]}`]: "Yellow",
  [`${green[500]}`]: "Green",
  [`${blue[500]}`]: "Blue",
  [`${indigo[500]}`]: "Indigo",
  '#3f51b5': 'Default'
}

function Settings() {
  const { settings, setSettings, settingsPresets, setSettingsPresetsConfigs } = useContext(SettingsContext);
  const { navigationIcons, onKeyPress } = useNavigationIcons([{
    path: "/",
    page: "Home",
    component: AiFillHome
  }, {
    component: HiDocumentReport,
    path: "/report"
  }, {
    path: "/play",
    component: IoLogoGameControllerB
  },
  {
    component: IoMdCreate,
    path: "/create"
  }, {
    component: FaKeyboard,
    path: "/shortcuts"
  }]);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);
  return (
    <Box onKeyUp={(e) => {
      settings.shortcuts && navigateBetweenPresets(e, settingsPresets, setSettingsPresetsConfigs, REINFORZ_GLOBAL_SETTINGS_LS_KEY)
    }} style={{ width: '100vw', height: '100vh' }} tabIndex={0} ref={ref} onKeyPress={onKeyPress}>
      <IconGroup className="Settings-icons" direction={settings.navigation.direction} style={generatedNavigationStyles} icons={navigationIcons} />
      <Box className="Settings p-1 center bg-base">
        <Box className="Settings-header flex mb-1 p-1 bg-dark">
          <Typography variant="h6" className="Settings-header-text bold flex-1 text-center flex items-center justify-center uppercase">Settings</Typography>
          <Preset lsKey={REINFORZ_GLOBAL_SETTINGS_LS_KEY} modalLabel="Save Settings" popoverText="Save current settings as preset" currentPreset={settings} itemPresets={settingsPresets} setPresetState={setSettingsPresetsConfigs} />
        </Box>
        <Box className="Settings-content bg-dark flex flex-col items-center p-1">
          <Select classNames={{
            formGroup: "mb-1 p-1 flex-row",
            inputLabel: 'mr-2 mb-0 text-base',
          }} items={["dark", "polar_night", "light", "snow_storm"]} label={"Theme"} setState={setSettings} state={settings} stateKey={"theme"} menuItemLabel={(item) => transformTextBySeparator(item)} />
          <Select classNames={{
            formGroup: "mb-1 p-1 flex-row",
            inputLabel: 'mr-2 mb-0 text-base',
          }} items={["serif", "sans-serif", "monospace"]} label={"Font"} setState={setSettings} state={settings} stateKey={"font"} menuItemLabel={(item) => transformTextBySeparator(item, "-")} />
          <SelectGroup className="mb-1" groupItems={[
            [["center", "right", "left"], "X-Axis", "x"],
            [["center", "top", "bottom"], "Y-Axis", "y"],
            [["column", "row"], "Direction", "direction"],
          ]} label={"Navigation"} setState={setSettings} state={settings} stateKey={"navigation"} classNames={{
            inputLabel: 'text-lg p-10',
            select: {
              inputLabel: 'text-base p-10'
            }
          }} />
          <SelectGroup className="mb-1" groupItems={[
            [[...Object.keys(colorMap)], "Primary", "primary"],
          ]} label={"Color"} setState={setSettings} state={settings} stateKey={"color"} classNames={{
            inputLabel: 'text-lg p-10',
            select: {
              inputLabel: 'text-base p-10'
            }
          }} renderValue={(item) => colorMap[item as string]} menuItemLabel={(item) => colorMap[item]} />
          <Toggles classNames={{ inputLabel: 'text-base' }} items={["animation", "hovertips", "shortcuts", "sound"]} setState={setSettings} state={settings} />
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;