import React, { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate, IoMdDocument } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { REINFORZ_DOC_URL, REINFORZ_REPO_URL, REINFORZ_SETTINGS_LS_KEY } from '../../constants';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, Preset, Select, SelectGroup, Toggles } from '../../shared';
import sounds from '../../sounds';
import { generateNavigationStyles, transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings, settingsPresets, setSettingsPresets } = useContext(SettingsContext);
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();
  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);
  return (
    <div style={{ width: '100vw', height: '100vh' }} tabIndex={0} onKeyPress={(e) => {
      switch (e.nativeEvent.code) {
        case "Digit1": {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && history.push("/")
          break;
        }
        case "Digit2": {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && history.push("/report")
          break;
        }
        case "Digit3": {
          settings.sound && sounds.swoosh.play()
          settings.shortcuts && history.push("/create")
          break;
        }
      }
    }}>
      <IconGroup className="Settings-icons" direction={settings.navigation.direction} style={generatedNavigationStyles} icons={[
        [`Go to Home page`, <AiFillHome size={20} fill={THEME.color.opposite_light} onClick={() => {
          settings.sound && sounds.swoosh.play()
          history.push("/")
        }} />],
        [`Go to Report page`, <HiDocumentReport size={20} fill={THEME.color.opposite_light} onClick={() => {
          settings.sound && sounds.swoosh.play()
          history.push("/report")
        }} />],
        [`Go to Create page`, <IoMdCreate size={20} fill={THEME.color.opposite_light} onClick={() => {
          settings.sound && sounds.swoosh.play()
          history.push("/create")
        }} />],
        [
          'Go to documentation',
          <IoMdDocument
            size={20}
            fill={THEME.color.opposite_light}
            onClick={() => {
              settings.sound && sounds.swoosh.play()
              const win = window.open(
                REINFORZ_DOC_URL,
                '_blank'
              )!;
              win.focus();
            }}
          />
        ],
        [
          'Go to repo',
          <FaGithub
            size={20}
            fill={THEME.color.opposite_light}
            onClick={() => {
              settings.sound && sounds.swoosh.play()
              const win = window.open(
                REINFORZ_REPO_URL,
                '_blank'
              )!;
              win.focus();
            }}
          />
        ]
      ]} />

      <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }}>
        <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>
          <div className="Settings-header-text">Settings</div>
          <Preset lsKey={REINFORZ_SETTINGS_LS_KEY} modalLabel="Save Settings" popoverText="Save current settings as preset" currentPreset={settings} itemPreset={settingsPresets} setPresetState={setSettingsPresets} />
        </div>
        <div className="Settings-content" style={{ backgroundColor: THEME.color.dark }}>
          <Select items={["dark", "polar_night", "light", "snow_storm"]} label={"Theme"} setState={setSettings} state={settings} stateKey={"theme"} menuItemLabel={(item) => transformTextBySeparator(item)} />
          <SelectGroup groupItems={[
            [["center", "right", "left"], "X-Axis", "x"],
            [["center", "top", "bottom"], "Y-Axis", "y"],
            [["column", "row"], "Direction", "direction"],
          ]} label={"Navigation"} setState={setSettings} state={settings} stateKey={"navigation"} />
          <Toggles classNames={{
            FormGroup: 'Settings-content-group',
            InputLabel: 'Settings-content-group-label'
          }} items={["animation", "hovertips", "shortcuts", "sound"]} setItems={setSettings} itemsMap={settings} />
        </div>
      </div>
    </div>
  );
}

export default Settings;