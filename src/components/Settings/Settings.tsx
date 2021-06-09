import React, { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { REINFORZ_SETTINGS_LS_KEY } from '../../constants';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Preset, Select, Toggles } from '../../shared';
import { transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings, settingsPresets, setSettingsPresets } = useContext(SettingsContext);
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();

  return (
    <>
      <IconGroup className="Settings-icons" icons={[
        [`Go to Home page`, <AiFillHome size={20} fill={THEME.color.opposite_light} onClick={() => history.push("/")} />],
        [`Go to Report page`, <HiDocumentReport size={20} fill={THEME.color.opposite_light} onClick={() => history.push("/report")} />],
        [`Go to Create page`, <IoMdCreate size={20} fill={THEME.color.opposite_light} onClick={() => history.push("/create")} />],
      ]} />

      <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }} tabIndex={0} onKeyPress={(e) => {
        switch (e.nativeEvent.code) {
          case "Digit1": {
            settings.shortcuts && history.push("/")
            break;
          }
          case "Digit2": {
            settings.shortcuts && history.push("/report")
            break;
          }
          case "Digit3": {
            settings.shortcuts && history.push("/create")
            break;
          }
        }
      }}>
        <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>
          <div className="Settings-header-text">Settings</div>
          <Preset lsKey={REINFORZ_SETTINGS_LS_KEY} modalLabel="Save Settings" popoverText="Save current settings as preset" currentPreset={settings} itemPreset={settingsPresets} setPresetState={setSettingsPresets} />
        </div>
        <div className="Settings-content" style={{ backgroundColor: THEME.color.dark }}>
          <Select items={["light", "dark", "polar_night", "snow_storm"]} label={"Theme"} setState={setSettings} state={settings} stateKey={"theme"} menuItemLabel={(item) => transformTextBySeparator(item)} />
          <Toggles classNames={{
            FormGroup: 'Settings-content-group',
            InputLabel: 'Settings-content-group-label'
          }} items={["animation", "hovertips", "shortcuts", "sound"]} setItems={setSettings} itemsMap={settings} />
        </div>
      </div>
    </>
  );
}

export default Settings;