import { Button, FormControlLabel, InputLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useContext } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import { useThemeSettings } from '../../hooks';
import { Toggles } from '../../shared';
import "./Settings.scss";


function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { theme, animation, hovertips } = settings;
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();

  return (
    <div className="Settings" style={{ backgroundColor: THEME.color.base, color: THEME.palette.text.secondary }}>
      <div className="Settings-header" style={{ backgroundColor: THEME.color.dark }}>Settings</div>
      <div className="Settings-content" style={{ backgroundColor: THEME.color.dark }}>
        <RadioGroup name="theme" value={theme} row className="Settings-content-group">
          <InputLabel className="Settings-content-group-label">Theme</InputLabel>
          {["dark", "light"].map((_theme, index) => <FormControlLabel onClick={(e: any) => {
            setSettings({ ...settings, theme: theme === "dark" ? "light" : "dark" })
          }} key={_theme.toString() + index} value={_theme} control={<Radio color="primary" />} label={_theme === "dark" ? <BsMoon size={20} className="Settings-icon Settings-icon--theme" /> : <BsSun size={20} className="Settings-icon Settings-icon--theme" />} />)}
        </RadioGroup>
        <Toggles classNames={{
          FormGroup: 'Settings-content-group',
          InputLabel: 'Settings-content-group-label'
        }} items={["animation", "hovertips"]} setItems={setSettings} itemsMap={settings} />
        <Button variant="contained" color="primary" className="Settings-content-button" onClick={() => {
          localStorage.setItem("SETTINGS", JSON.stringify({
            animation: String(animation),
            hovertips: String(hovertips),
            theme
          }))
          history.push("/")
        }}>Back to Home</Button>
      </div>
    </div>
  );
}

export default Settings;