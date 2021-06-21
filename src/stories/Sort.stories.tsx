import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Sort, { SortProps } from '../components/Sort';
import { IReportSort } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Sort',
  component: Sort,
} as Meta;

const DefaultSortTemplate: Story<SortProps> = () => {
  const [sorts, setSorts] = useState<IReportSort>([]);
  return <Wrapper>
    <Sort header={"Sort"} sorts={sorts} setSorts={setSorts} items={["Score", "Time Taken", "Hints Used"]} />
  </Wrapper>
};

export const DefaultSort = DefaultSortTemplate.bind({});

const CustomMaxSortTemplate: Story<SortProps> = () => {
  const [sorts, setSorts] = useState<IReportSort>([['Score', 'DESC']]);
  return <Wrapper>
    <Sort header={"Sort"} sorts={sorts} setSorts={setSorts} items={["Score", "Time Taken", "Hints Used"]} />
  </Wrapper>
};

export const CustomMaxSort = CustomMaxSortTemplate.bind({});
CustomMaxSort.args = {
  max: 5
}