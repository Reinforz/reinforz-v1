import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import List, { ListProps } from '../components/List';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/List',
  component: List,
} as Meta;

const listItems: { _id: string, title: string, subtitle: string }[] = [
  {
    _id: '1',
    title: 'Item 1',
    subtitle: 'Subtitle 1'
  },
  {
    _id: '2',
    title: 'Item 2',
    subtitle: 'Subtitle 2'
  },
  {
    _id: '3',
    title: 'Item 3',
    subtitle: 'Subtitle 3'
  },
  {
    _id: '4',
    title: 'Item 4',
    subtitle: 'Subtitle 4'
  }
];

const DefaultListTemplate: Story<ListProps<any>> = (args) => {
  const [items, setItems] = useState(listItems)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  return <Wrapper>
    <List {...args as any} fields={["title", "subtitle"]} header={"List"} selectedItems={selectedItems} setSelectedItems={setSelectedItems} items={items} setItems={setItems} />
  </Wrapper>
};

export const DefaultList = DefaultListTemplate.bind({});