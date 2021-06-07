import React, { useCallback, useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillHome } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import { ModalContext } from '../../context/ModalContext';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { Icon, IconGroup, ListSelect, Preset, Select, Toggles } from '../../shared';
import { ISettingsPreset } from '../../types';
import { transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings, settingsPresets, setSettingsPresets } = useContext(SettingsContext);
  const { setModalState } = useContext(ModalContext);
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();

  const memoizedCallback = useCallback((path: string) => {
    localStorage.setItem("SETTINGS", JSON.stringify(settings))
    history.push(path)
    // eslint-disable-next-line
  }, [settings])

  useHotkeys('ctrl+shift+1', () => {
    settings.shortcuts && memoizedCallback("/")
  }, [settings.shortcuts, settings])

  useHotkeys('ctrl+shift+2', () => {
    settings.shortcuts && memoizedCallback("/report")
  }, [settings.shortcuts, settings])

  useHotkeys('ctrl+shift+3', () => {
    settings.shortcuts && memoizedCallback("/create")
  }, [settings.shortcuts, settings])

  return (
    <>
      <IconGroup className="Settings-icons" icons={[
        [`Go to Home page`, <AiFillHome size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/")} />],
        [`Go to Report page`, <HiDocumentReport size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/report")} />],
        [`Go to Create page`, <IoMdCreate size={20} fill={THEME.color.opposite_light} onClick={() => memoizedCallback("/create")} />],
      ]} />

      <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }}>
        <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>
          <div className="Settings-header-text">Settings</div>
          <div className="Settings-header-presets" >
            <ListSelect items={settingsPresets.presets.map(preset => preset.id)} menuItemLabel={(id) => settingsPresets.presets.find(preset => preset.id === id)!.name} onChange={(id) => {
              setSettingsPresets({
                current: id,
                presets: settingsPresets.presets
              })
            }} item={settingsPresets.current} />
            <Icon popoverText="Save current settings as preset">
              <FaSave fill={THEME.color.opposite_light} size={20} onClick={() => {
                setModalState([true, <Preset closeModal={() => setModalState([false, null])} label={'Save Settings'} onSave={(input) => {
                  const currentActivePresetId = shortid();
                  const newSettingsPresets: ISettingsPreset = {
                    current: currentActivePresetId,
                    presets: [...settingsPresets.presets, {
                      name: input,
                      id: currentActivePresetId,
                      data: settings
                    }]
                  }
                  localStorage.setItem('reinforz.play.settings', JSON.stringify(newSettingsPresets));
                  setSettingsPresets(newSettingsPresets)
                }} />])
              }} />
            </Icon>
          </div>
        </div>
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