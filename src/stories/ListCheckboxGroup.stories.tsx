import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import ListCheckboxGroup, { ListCheckboxGroupProps } from '../components/ListCheckboxGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/ListCheckboxGroup',
  component: ListCheckboxGroup,
} as Meta;

const DefaultListCheckboxGroupTemplate: Story<ListCheckboxGroupProps> = () => {
  const [item, setItem] = useState<string[]>(['1'])
  return <Wrapper>
    <ListCheckboxGroup value={item} setState={setItem} items={['Option 1', 'Option 2', 'Option 3']} />
  </Wrapper>
};

export const DefaultListCheckboxGroup = DefaultListCheckboxGroupTemplate.bind({});