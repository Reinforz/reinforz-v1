import { Meta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import Preset, { PresetProps } from '../components/Preset';
import { IPreset } from '../types';
import ModalWrapper from './ModalWrapper';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Preset',
  component: Preset,
} as Meta;

function findSettingsFromPresets(preset: IPreset<any>) {
  return preset.presets.find(settingsPreset => settingsPreset.id === preset.current)!.data;
}

const DefaultPresetTemplate: Story<PresetProps> = () => {
  const [settingsPresets, setSettingsPresets] = useState<IPreset<any>>({
    current: 'default',
    presets: [
      {
        data: {},
        id: 'default',
        name: "Default"
      },
      {
        data: {},
        id: 'preset_1',
        name: "Preset 1"
      }
    ]
  });

  const [settings, setSettings] = useState<any>(findSettingsFromPresets(settingsPresets));
  useEffect(() => {
    setSettings(findSettingsFromPresets(settingsPresets))
    // eslint-disable-next-line
  }, [settingsPresets.current])

  return <Wrapper>
    <ModalWrapper>
      <Preset currentPreset={settings} itemPresets={settingsPresets} setPresetState={setSettingsPresets} />
    </ModalWrapper>
  </Wrapper>
};

export const DefaultPreset = DefaultPresetTemplate.bind({});