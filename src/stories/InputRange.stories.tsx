import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import InputRange, { InputRangeProps } from '../components/InputRange';
import { TNumberFilter } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/InputRange',
  component: InputRange,
} as Meta;

const DefaultInputRangeTemplate: Story<InputRangeProps<any>> = (args) => {
  const [state, setState] = useState<Record<string, TNumberFilter>>({
    range: ['<=', [15, 60]]
  });
  return <Wrapper>
    <InputRange {...args as any} state={state} setState={setState} stateKey='range' />
  </Wrapper>
};

export const DefaultInputRange = DefaultInputRangeTemplate.bind({});
DefaultInputRange.args = {
  label: 'Input Range',
};

const CustomInputRangeTemplate: Story<InputRangeProps<any>> = (args) => {
  const [state, setState] = useState<Record<string, TNumberFilter>>({
    range: ['<=', [15, 60]]
  });
  return <Wrapper>
    <InputRange {...args as any} state={state} setState={setState} stateKey='range' min={20} max={75} direction="column" step={5} />
  </Wrapper>
};

export const CustomInputRange = CustomInputRangeTemplate.bind({});
CustomInputRange.args = {
  label: 'Input Range',
};