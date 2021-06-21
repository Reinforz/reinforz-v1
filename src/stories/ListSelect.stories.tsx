import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import ListSelect, { ListSelectProps } from '../components/ListSelect';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/ListSelect',
  component: ListSelect,
} as Meta;

const DefaultListSelectTemplate: Story<ListSelectProps> = (args) => {
  const [item, setItem] = useState('polar_night')
  return <Wrapper>
    <ListSelect {...args} item={item} items={["polar_night", "dark", "light", "snow_storm"]} label={"Theme"} onChange={(item) => setItem(item)} />
  </Wrapper>
};

export const DefaultListSelect = DefaultListSelectTemplate.bind({});

const NoLabelListSelectTemplate: Story<ListSelectProps> = (args) => {
  const [item, setItem] = useState('polar_night')
  return <Wrapper>
    <ListSelect {...args} item={item} items={["polar_night", "dark", "light", "snow_storm"]} onChange={(item) => setItem(item)} />
  </Wrapper>
};

export const NoLabelListSelect = NoLabelListSelectTemplate.bind({});