import { Meta, Story } from '@storybook/react';
import StackList, { StackListProps } from '../components/StackList';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/StackList',
  component: StackList,
} as Meta;

const DefaultStackListTemplate: Story<StackListProps> = () => {
  return <Wrapper>
    <StackList
      header={'Shortcuts'}
      items={[
        ['Navigation Hovertips #', '#'],
        ['Selecting Option #', '#'],
        ['Previous preset', 'Alt+A'],
        ['Next preset', 'Alt+S'],
        ['Next question', 'Alt+A'],
      ]}
    />
  </Wrapper>
};

export const DefaultStackList = DefaultStackListTemplate.bind({});