import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import CheckboxGroup, { CheckboxGroupProps } from '../components/CheckboxGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
} as Meta;

const Template: Story<CheckboxGroupProps<any>> = (args) => {
  const [state, setState] = useState<Record<string, any>>({
    options: []
  });
  return <Wrapper>
    <CheckboxGroup {...args as any} state={state} setState={setState} stateKey='options' />
  </Wrapper>
};

export const DefaultCheckboxGroup = Template.bind({});
DefaultCheckboxGroup.args = {
  label: 'Options',
  items: ['Option 1', 'Option 2', 'Option 3'],
};