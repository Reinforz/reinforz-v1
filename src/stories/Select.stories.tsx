import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Select, { SelectProps } from '../components/Select';
import { TQuestionDifficulty } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const DefaultSelectTemplate: Story<SelectProps<{
  difficulty: TQuestionDifficulty
}>> = () => {
  const [state, setState] = useState({
    difficulty: 'Beginner'
  });

  return <Wrapper>
    <Select items={["Beginner", "Intermediate", "Advanced"]} label={"Difficulty"} setState={setState} state={state} stateKey={"difficulty"} />
  </Wrapper>
};

export const DefaultSelect = DefaultSelectTemplate.bind({});

const MultiSelectTemplate: Story<SelectProps<{
  difficulty: TQuestionDifficulty
}>> = () => {
  const [state, setState] = useState({
    difficulty: ['Beginner']
  });

  return <Wrapper>
    <Select multiple items={["Beginner", "Intermediate", "Advanced"]} label={"Difficulty"} setState={setState} state={state} stateKey={"difficulty"} />
  </Wrapper>
};

export const MultiSelect = MultiSelectTemplate.bind({});