import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { Content } from '../components';
import Hovertips, { HovertipsProps } from '../components/Hovertips';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Hovertips',
  component: Hovertips,
} as Meta;

const Template: Story<HovertipsProps> = (args) => {
  const [state, setState] = useState<Record<string, any>>({
    options: []
  });
  return <Wrapper>
    <Hovertips {...args as any} state={state} setState={setState} stateKey='options'>
      <Content style={{ width: '100%' }}>
        <Typography>Hover over me</Typography>
      </Content>
    </Hovertips>
  </Wrapper>
};

export const DefaultHovertips = Template.bind({});
DefaultHovertips.args = {
  popoverText: 'Popover text'
};

export const CustomHovertips = Template.bind({});
CustomHovertips.args = {
  popoverText: 'Popover text',
  popoverAnchorOrigin: {
    horizontal: 'right',
    vertical: 'center'
  },
  popoverTransformOrigin: {
    horizontal: 'right',
    vertical: 'top'
  }
};