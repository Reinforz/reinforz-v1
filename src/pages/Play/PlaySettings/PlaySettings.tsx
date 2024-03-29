import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CheckboxGroup, Header, InputRange, Preset } from '../../../components';
import { REINFORZ_PLAY_SETTINGS_LS_KEY } from "../../../constants";
import { RootContext } from "../../../context/RootContext";
import { useThemeSettings } from "../../../hooks";
import useSounds from "../../../hooks/useSounds";
import { IPlaySettingsFilters, IPlaySettingsOptions } from "../../../types";
import { generateDefaultPlaySettingsState, transformTextBySeparator } from "../../../utils";

export default function PlaySettings() {
  const { playSettingsPresets, setPlaySettingsPresets, selectedQuizIds, playSettings, setPlaySettings, filteredQuizzes } = useContext(RootContext);
  const { theme } = useThemeSettings();
  const { reset, pop_off, pop_on } = useSounds();

  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  const setPlaySettingsFilters = (newFilterState: React.SetStateAction<IPlaySettingsFilters>) => {
    setPlaySettings({ ...playSettings, filters: { ...playSettings.filters, ...newFilterState } })
  }

  return <Box className="PlaySettings p-1 bg-base h-full flex-col-1">
    <Box className="bg-dark">
      <Preset lsKey={REINFORZ_PLAY_SETTINGS_LS_KEY} modalLabel="Save Play Settings" popoverText="Save current play settings as preset" currentPreset={playSettings} itemPresets={playSettingsPresets} setPresetState={setPlaySettingsPresets} />
    </Box>
    <Box className="PlaySettings-group PlaySettings-group-options flex-col-1">
      <Header className="PlaySettings-group-header uppercase text-base" header={"Options"} />
      <Box className="PlaySettings-group-content flex-col-1 p-1">
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
    <Box className="PlaySettings-group PlaySettings-group-filters overflow-auto flex-col-1 p-1">
      <Header className="PlaySettings-group-header uppercase text-base" header={"Filters"} />
      <Box className="PlaySettings-group-content flex-col-3/2">
        <InputRange step={1} label={"Time Allocated range"} min={0} max={120} setState={setPlaySettingsFilters} state={playSettings.filters} stateKey={"time_allocated"} />
        <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={setPlaySettingsFilters} stateKey={'excluded_difficulty'} state={playSettings.filters} />
        <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={setPlaySettingsFilters} stateKey={'excluded_types'} state={playSettings.filters} />
      </Box>
    </Box>
    <Button className="PlaySettings-group-button" variant="contained" color="primary" onClick={() => {
      reset()
      setPlaySettings(generateDefaultPlaySettingsState())
    }}>Reset</Button>
    <Typography className="PlaySettings-total bg-dark flex justify-center items-center bold text-base p-2 rounded-sm" style={{ color: filteredQuestions === 0 ? theme.palette.error.main : theme.palette.success.main, height: 30 }}>{filteredQuestions} Questions</Typography>
  </Box>
}