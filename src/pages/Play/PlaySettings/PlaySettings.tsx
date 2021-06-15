import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext } from "react";
import { CheckboxGroup, InputRange, Preset } from '../../../components';
import { REINFORZ_PLAY_SETTINGS_LS_KEY } from "../../../constants";
import { RootContext } from "../../../context/RootContext";
import { SettingsContext } from "../../../context/SettingsContext";
import { useThemeSettings } from "../../../hooks";
import sounds from "../../../sounds";
import { IPlaySettingsFilters, IPlaySettingsOptions } from "../../../types";
import { generateDefaultPlaySettingsState, transformTextBySeparator } from "../../../utils";
import "./PlaySettings.scss";

export default function PlaySettings() {
  const { playSettingsPresets, setPlaySettingsPresets, selectedQuizIds, playSettings, setPlaySettings, filteredQuizzes } = useContext(RootContext);
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);

  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  const setPlaySettingsFilters = (newFilterState: React.SetStateAction<IPlaySettingsFilters>) => {
    setPlaySettings({ ...playSettings, filters: { ...playSettings.filters, ...newFilterState } })
  }

  return <div className="PlaySettings bg-base" style={{ color: theme.palette.text.primary }}>
    <div className="bg-dark" style={{ padding: 2.5, margin: 2.5 }}>
      <Preset lsKey={REINFORZ_PLAY_SETTINGS_LS_KEY} modalLabel="Save Play Settings" popoverText="Save current play settings as preset" currentPreset={playSettings} itemPreset={playSettingsPresets} setPresetState={setPlaySettingsPresets} />
    </div>
    <div className="PlaySettings-group PlaySettings-group-options">
      <div className="PlaySettings-group-header bg-dark">Options</div>
      <div className="PlaySettings-group-content bg-dark">
        {Object.keys(playSettings.options).map((key, index) => {
          let isDisabled = false;
          if (Boolean(key.match(/(shuffle_questions|shuffle_quizzes)/) && playSettings.options.flatten_mix)) isDisabled = true;
          if (selectedQuizIds.length <= 1 && key === "shuffle_quizzes") isDisabled = true;
          return <FormControlLabel key={key + index}
            control={
              <Checkbox
                disabled={isDisabled}
                checked={playSettings.options[key as keyof IPlaySettingsOptions]}
                onChange={(event, checked) => {
                  if (checked) {
                    settings.sound && sounds.pop_on.play();
                  } else {
                    settings.sound && sounds.pop_off.play();
                  }
                  setPlaySettings(key === "flatten_mix" ? { ...playSettings, options: { ...playSettings.options, [event.target.name]: checked, shuffle_questions: checked, shuffle_quizzes: checked } } : { ...playSettings, options: { ...playSettings.options, [event.target.name]: checked } })
                }}
                name={key}
                color="primary"
              />
            }
            label={transformTextBySeparator(key)}
          />
        })}
      </div>
    </div>
    <div className="PlaySettings-group PlaySettings-group-filters">
      <div className="PlaySettings-group-header bg-dark">
        Filters
      </div>
      <div className="PlaySettings-group-content bg-dark">
        <InputRange step={1} label={"Time Allocated range"} min={0} max={120} setState={setPlaySettingsFilters} state={playSettings.filters} stateKey={"time_allocated"} />
        <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setPlaySettingsFilters} stateKey={'excluded_difficulty'} state={playSettings.filters} />
        <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setPlaySettingsFilters} stateKey={'excluded_types'} state={playSettings.filters} />
      </div>
    </div>
    <Button className="PlaySettings-group-button" variant="contained" color="primary" onClick={() => {
      settings.sound && sounds.reset.play()
      setPlaySettings(generateDefaultPlaySettingsState())
    }}>Reset</Button>
    <div className="PlaySettings-total bg-dark" style={{ color: filteredQuestions === 0 ? theme.palette.error.main : theme.palette.success.main }}>{filteredQuestions} Questions</div>
  </div>
}