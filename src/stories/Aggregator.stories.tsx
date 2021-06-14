import { ThemeProvider } from '@material-ui/styles';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Aggregator, { AggregatorProps } from '../components/Aggregator';
import { SettingsContext } from '../context/SettingsContext';
import { ExtendedTheme, TNumberAggregation } from '../types';
import { generateDefaultSettingsPreset, generateTheme } from '../utils';

export default {
  title: 'Example/Aggregator',
  component: Aggregator,
} as Meta;

const Template: Story<AggregatorProps<any>> = (args) => {
  const [state, setState] = useState<Record<string, TNumberAggregation>>({
    score: 'AVG'
  });
  const defaultSettingsPresets = generateDefaultSettingsPreset();
  const defaultSettingsPreset = defaultSettingsPresets.presets[0].data
  const generatedTheme = generateTheme(defaultSettingsPreset) as ExtendedTheme;

  return <ThemeProvider theme={generatedTheme}>
    <SettingsContext.Provider value={{ setSettings: () => { }, setSettingsPresets: () => { }, settings: defaultSettingsPreset, settingsPresets: defaultSettingsPresets }}>
      <Aggregator {...args as any} state={state} setState={setState} />
    </SettingsContext.Provider>
  </ThemeProvider>
};

export const Primary = Template.bind({});
Primary.args = {
  header: 'Aggregator',
  items: [{
    label: 'Score',
    stateKey: 'score',
    data: [1, 2, 3, 4, 5, 5, 2, 3, 1, 4],
    type: 'number'
  }],
};