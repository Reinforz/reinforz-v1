import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Toggles, { TogglesProps } from '../components/Toggles';
import { TQuestionDifficulty } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Toggles',
  component: Toggles,
} as Meta;

const DefaultTogglesTemplate: Story<TogglesProps<{
  difficulty: TQuestionDifficulty
}>> = () => {
  const [state, setState] = useState<Record<"animation" | "hovertips" | "shortcuts" | "sound", boolean>>({
    "animation": false,
    "hovertips": true,
    "shortcuts": true,
    "sound": false
  });

  return <Wrapper>
    <div className="p-5 bg-base">
      <Toggles items={["animation", "hovertips", "shortcuts", "sound"]} setState={setState} state={state} />
    </div>
  </Wrapper>
};

export const DefaultToggles = DefaultTogglesTemplate.bind({});