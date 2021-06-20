import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import ListRadioGroup, { ListRadioGroupProps } from '../components/ListRadioGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/ListRadioGroup',
  component: ListRadioGroup,
} as Meta;

const DefaultListRadioGroupTemplate: Story<ListRadioGroupProps> = () => {
  const [item, setItem] = useState<string[]>([])
  return <Wrapper>
    <ListRadioGroup value={item} setState={setItem} items={['Option 1', 'Option 2', 'Option 3']} />
  </Wrapper>
};

export const DefaultListRadioGroup = DefaultListRadioGroupTemplate.bind({});