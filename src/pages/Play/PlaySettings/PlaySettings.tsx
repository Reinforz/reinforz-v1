import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CheckboxGroup, Header, InputRange, Preset } from '../../../components';
import { REINFORZ_PLAY_SETTINGS_LS_KEY } from "../../../constants";
import { RootContext } from "../../../context/RootContext";
import { useThemeSettings } from "../../../hooks";
import useSounds from "../../../hooks/useSounds";
import { IPlaySettingsFilters, IPlaySettingsOptions } from "../../../types";
import { generateDefaultPlaySettingsState, transformTextBySeparator } from "../../../utils";
import "./PlaySettings.scss";

export default function PlaySettings() {
  const { playSettingsPresets, setPlaySettingsPresets, selectedQuizIds, playSettings, setPlaySettings, filteredQuizzes } = useContext(RootContext);
  const { theme } = useThemeSettings();
  const { reset, pop_off, pop_on } = useSounds();

  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  const setPlaySettingsFilters = (newFilterState: React.SetStateAction<IPlaySettingsFilters>) => {
    setPlaySettings({ ...playSettings, filters: { ...playSettings.filters, ...newFilterState } })
  }

  return <Box className="PlaySettings p-5 bg-base">
    <Box className="bg-dark p-5 mb-5">
      <Preset lsKey={REINFORZ_PLAY_SETTINGS_LS_KEY} modalLabel="Save Play Settings" popoverText="Save current play settings as preset" currentPreset={playSettings} itemPresets={playSettingsPresets} setPresetState={setPlaySettingsPresets} />
    </Box>
    <Box className="PlaySettings-group mb-5 flex fd-c PlaySettings-group-options">
      <Header className="PlaySettings-group-header bg-dark tt-u fs-16 p-0" header={"Options"} />
      <Box className="PlaySettings-group-content bg-dark flex fd-c p-5 pb-0">
        {Object.keys(playSettings.options).map((key, index) => {
          let isDisabled = false;
          if (Boolean(key.match(/(shuffle_questions|shuffle_quizzes)/) && playSettings.options.flatten_mix)) isDisabled = true;
          if (selectedQuizIds.length <= 1 && key === "shuffle_quizzes") isDisabled = true;
          return <FormControlLabel className="mb-5" key={key + index}
            control={
              <Checkbox
                disabled={isDisabled}
                checked={playSettings.options[key as keyof IPlaySettingsOptions]}
                onChange={(event, checked) => {
                  if (checked) {
                    pop_on();
                  } else {
                    pop_off();
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
      </Box>
    </Box>
    <Box className="PlaySettings-group mb-5 PlaySettings-group-filters">
      <Header className="PlaySettings-group-header tt-u fs-16 p-0" header={"Filters"} />
      <Box className="PlaySettings-group-content bg-dark p-5">
        <InputRange classNames={{
          formGroup: 'mb-5'
        }} step={1} label={"Time Allocated range"} min={0} max={120} setState={setPlaySettingsFilters} state={playSettings.filters} stateKey={"time_allocated"} />
        <CheckboxGroup classNames={{
          formGroup: 'mb-5'
        }} label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setPlaySettingsFilters} stateKey={'excluded_difficulty'} state={playSettings.filters} />
        <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setPlaySettingsFilters} stateKey={'excluded_types'} state={playSettings.filters} />
      </Box>
    </Box>
    <Button className="PlaySettings-group-button mb-5" variant="contained" color="primary" onClick={() => {
      reset()
      setPlaySettings(generateDefaultPlaySettingsState())
    }}>Reset</Button>
    <Typography className="PlaySettings-total bg-dark flex jc-c ai-c bold fs-16 p-5 mb-5" style={{ color: filteredQuestions === 0 ? theme.palette.error.main : theme.palette.success.main }}>{filteredQuestions} Questions</Typography>
  </Box>
}