import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Aggregator, { AggregatorProps } from '../components/Aggregator';
import { TBooleanAggregation, TNumberAggregation } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Aggregator',
  component: Aggregator,
} as Meta;

const Template: Story<AggregatorProps<any>> = (args) => {
  const [state, setState] = useState<Record<string, TNumberAggregation | TBooleanAggregation>>({
    score: 'AVG',
    verdict: 'TRUE'
  });
  return <Wrapper>
    <Aggregator {...args as any} state={state} setState={setState} />
  </Wrapper>
};

export const NumberAggregator = Template.bind({});
NumberAggregator.args = {
  header: 'Aggregator',
  items: [{
    label: 'Score',
    stateKey: 'score',
    data: [1, 2, 3, 4, 5, 5, 2, 3, 1, 4],
    type: 'number'
  }],
};

export const BooleanAggregator = Template.bind({});
BooleanAggregator.args = {
  header: 'Aggregator',
  items: [{
    label: 'Verdict',
    stateKey: 'verdict',
    data: [true, false, true, false, true, true, false],
    type: 'boolean'
  }],
};