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
import { Icon, IconGroup, Preset, Select, Toggles } from '../../shared';
import { transformTextBySeparator } from '../../utils';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings, settingsPresets } = useContext(SettingsContext);
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
          <div style={{ flex: 1, textAlign: 'center' }}>Settings</div>
          <div style={{ width: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} >
            <Icon popoverText="Save current settings as preset">
              <FaSave fill={THEME.color.opposite_light} size={15} onClick={() => {
                setModalState([true, <Preset closeModal={() => setModalState([false, null])} label={'Save Settings'} onSave={(input) => {
                  const currentActivePresetId = shortid();
                  localStorage.setItem('reinforz.play.settings', JSON.stringify({
                    current: currentActivePresetId,
                    presets: [...settingsPresets.presets, {
                      name: input,
                      id: currentActivePresetId,
                      data: settings
                    }]
                  }))
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