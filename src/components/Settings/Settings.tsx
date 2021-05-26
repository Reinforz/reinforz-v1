import { Button, FormControlLabel, InputLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useThemeSettings } from '../../hooks';
import { Toggles } from '../../shared';
import { SettingsProps } from '../../types';
import "./Settings.scss";

function Settings(props: SettingsProps) {
  const { settings, setSettings } = props;
  const { theme, animation, hovertips } = settings;
  const history = useHistory();
  const { theme: THEME } = useThemeSettings();

  return (
    <div className="Settings" style={{ backgroundColor: THEME.color.light }}>
      <div className="Settings-header" style={{ backgroundColor: THEME.color.dark, color: THEME.palette.text.secondary }}>Settings</div>
      <div className="Settings-content">
        <RadioGroup name="theme" value={theme} row className="Settings-content-group" style={{ backgroundColor: THEME.color.base }}>
          <InputLabel className="Settings-content-group-label">Theme</InputLabel>
          {["dark", "light"].map((_theme, index) => <FormControlLabel onClick={(e: any) => {
            setSettings({ ...settings, theme: theme === "dark" ? "light" : "dark" })
          }} key={_theme.toString() + index} value={_theme} control={<Radio color="primary" />} label={_theme === "dark" ? <BsMoon className="Settings-icon Settings-icon--theme" style={{ fill: THEME.color.opposite_dark }} /> : <BsSun className="Settings-icon Settings-icon--theme" style={{ fill: THEME.color.opposite_dark }} />} />)}
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