import React, { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { IconGroup, RadioGroup, Toggles } from '../../shared';
import "./Settings.scss";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { theme, animation, hovertips } = settings;
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();
  return (
    <>
      <IconGroup className="Settings-icons" icons={[
        [`Go to Home page`, <AiFillHome size={20} fill={THEME.color.opposite_light} onClick={() => {
          localStorage.setItem("SETTINGS", JSON.stringify({
            animation: String(animation),
            hovertips: String(hovertips),
            theme
          }))
          history.push("/")
        }} />],
        [`Go to Report page`, <HiDocumentReport size={20} fill={THEME.color.opposite_light} onClick={() => history.push("/report")} />],
        [`Go to Create page`, <IoMdCreate size={20} fill={THEME.color.opposite_light} onClick={() => history.push("/create")} />],
      ]} />

      <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }}>
        <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>Settings</div>
        <div className="Settings-content" style={{ backgroundColor: THEME.color.dark }}>
          <RadioGroup lsKey="SETTINGS" items={['light', 'dark']} label={"Theme"} itemDirection="row" setState={setSettings} stateKey={"theme"} state={settings} itemLabel={(item) => item === 'dark' ? <BsMoon size={20} style={{ display: 'flex' }} /> : <BsSun size={20} style={{ display: 'flex' }} />} />
          <Toggles classNames={{
            FormGroup: 'Settings-content-group',
            InputLabel: 'Settings-content-group-label'
          }} items={["animation", "hovertips"]} setItems={setSettings} itemsMap={settings} />
        </div>
      </div>
    </>
  );
}

export default Settings;