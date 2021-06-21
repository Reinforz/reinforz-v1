import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import RadioGroup, { RadioGroupProps } from '../components/RadioGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} as Meta;

const DefaultRadioGroupTemplate: Story<RadioGroupProps<Record<string, any>>> = () => {
  const [state, setState] = useState({
    difficulty: null
  });

  return <Wrapper>
    <RadioGroup itemLabel={(item) => item} items={["Beginner", "Intermediate", "Advanced"]} label={"Difficulty"} setState={setState} state={state} stateKey={"difficulty"} />
  </Wrapper>
};

export const DefaultRadioGroup = DefaultRadioGroupTemplate.bind({});

const RowRadioGroupTemplate: Story<RadioGroupProps<Record<string, any>>> = () => {
  const [state, setState] = useState({
    difficulty: null
  });

  return <Wrapper>
    <RadioGroup itemDirection="row" itemLabel={(item) => item} items={["Beginner", "Intermediate", "Advanced"]} label={"Difficulty"} setState={setState} state={state} stateKey={"difficulty"} />
  </Wrapper>
};

export const RowRadioGroup = RowRadioGroupTemplate.bind({});