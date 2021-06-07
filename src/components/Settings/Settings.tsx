import React, { useCallback, useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillHome } from 'react-icons/ai';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Select, Toggles } from '../../shared';
import { transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();

  const memoizedCallback = useCallback((path: string) => {
    localStorage.setItem("SETTINGS", JSON.stringify(settings))
    history.push(path)
    // eslint-disable-next-line
  }, [settings])

  useHotkeys('ctrl+shift+1', () => {
    memoizedCallback("/")
  })

  useHotkeys('ctrl+shift+2', () => {
    memoizedCallback("/report")
  })

  useHotkeys('ctrl+shift+3', () => {
    memoizedCallback("/create")
  })

  return (
    <>
      <IconGroup className="Settings-icons" icons={[
        [`Go to Home page`, <AiFillHome size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/")} />],
        [`Go to Report page`, <HiDocumentReport size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/report")} />],
        [`Go to Create page`, <IoMdCreate size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/create")} />],
      ]} />

      <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }}>
        <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>Settings</div>
        <div className="Settings-content" style={{ backgroundColor: THEME.color.dark }}>
          <Select items={["light", "dark", "polar_night", "snow_storm"]} label={"Theme"} setState={setSettings} state={settings} stateKey={"theme"} menuItemLabel={(item) => transformTextBySeparator(item)} />
          <Toggles classNames={{
            FormGroup: 'Settings-content-group',
            InputLabel: 'Settings-content-group-label'
          }} items={["animation", "hovertips", "shortcuts"]} setItems={setSettings} itemsMap={settings} />
        </div>
      </div>
    </>
  );
}

export default Settings;