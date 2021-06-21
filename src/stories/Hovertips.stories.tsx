import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import Hovertips, { HovertipsProps } from '../components/Hovertips';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Hovertips',
  component: Hovertips,
} as Meta;

const Template: Story<HovertipsProps> = (args) => {
  return <Wrapper>
    <Hovertips {...args}>
      <Typography>Hover over me</Typography>
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