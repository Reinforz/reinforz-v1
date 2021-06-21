import { Typography } from '@material-ui/core';
import React, { useContext, useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaKeyboard } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoLogoGameControllerB, IoMdCreate } from 'react-icons/io';
import { IconGroup, Preset, Select, SelectGroup, Toggles } from '../../components';
import { REINFORZ_SETTINGS_LS_KEY } from '../../constants';
import { SettingsContext } from '../../context/SettingsContext';
import { useNavigationIcons } from '../../hooks';
import { generateNavigationStyles, navigateBetweenPresets, transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings, settingsPresets, setSettingsPresets } = useContext(SettingsContext);
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
    <div onKeyUp={(e) => {
      settings.shortcuts && navigateBetweenPresets(e, settingsPresets, setSettingsPresets, REINFORZ_SETTINGS_LS_KEY)
    }} style={{ width: '100vw', height: '100vh' }} tabIndex={0} ref={ref} onKeyPress={onKeyPress}>
      <IconGroup className="Settings-icons" direction={settings.navigation.direction} style={generatedNavigationStyles} icons={navigationIcons} />
      <div className="Settings p-5 center bg-base">
        <div className="Settings-header flex mb-5 p-5 bg-dark">
          <Typography variant="h6" className="Settings-header-text bold flex-1 ta-c flex ai-c jc-c tt-u">Settings</Typography>
          <Preset lsKey={REINFORZ_SETTINGS_LS_KEY} modalLabel="Save Settings" popoverText="Save current settings as preset" currentPreset={settings} itemPresets={settingsPresets} setPresetState={setSettingsPresets} />
        </div>
        <div className="Settings-content bg-dark flex fd-c ai-c p-5">
          <Select classNames={{
            formGroup: "mb-5 p-5 w-c_10 fd-r",
            inputLabel: 'w-100 mr-10 mb-0 fs-16',
          }} items={["dark", "polar_night", "light", "snow_storm"]} label={"Theme"} setState={setSettings} state={settings} stateKey={"theme"} menuItemLabel={(item) => transformTextBySeparator(item)} />
          <Select classNames={{
            formGroup: "mb-5 p-5 w-c_10 fd-r",
            inputLabel: 'w-100 mr-10 mb-0 fs-16',
          }} items={["serif", "sans-serif", "monospace"]} label={"Font"} setState={setSettings} state={settings} stateKey={"font"} menuItemLabel={(item) => transformTextBySeparator(item, "-")} />
          <SelectGroup className="mb-5 w-c_10" groupItems={[
            [["center", "right", "left"], "X-Axis", "x"],
            [["center", "top", "bottom"], "Y-Axis", "y"],
            [["column", "row"], "Direction", "direction"],
          ]} label={"Navigation"} setState={setSettings} state={settings} stateKey={"navigation"} classNames={{
            inputLabel: 'fs-18 p-10',
            select: {
              inputLabel: 'fs-16 p-10'
            }
          }} />
          <Toggles classNames={{ inputLabel: 'w-100 fs-16' }} items={["animation", "hovertips", "shortcuts", "sound"]} setState={setSettings} state={settings} />
        </div>
      </div>
    </div>
  );
}

export default Settings;