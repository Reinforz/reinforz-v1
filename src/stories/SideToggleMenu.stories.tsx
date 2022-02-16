import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import SideToggleMenu, { SideToggleMenuProps } from '../components/SideToggleMenu';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/SideToggleMenu',
  component: SideToggleMenu,
} as Meta;

const DefaultSideToggleMenuTemplate: Story<SideToggleMenuProps> = (args) => {
  return <Wrapper>
    <SideToggleMenu {...args} contents={[<div className="bg-base p-5" style={{ height: 'calc(100% - 10px)' }}>
      <Typography className="bg-light p-5">Inside SideToggleMenu</Typography>
    </div>, <div className="bg-base p-5" style={{ height: 100 }}>
      <Typography className="bg-light p-5">Outside SideToggleMenu</Typography>
    </div>]} />
  </Wrapper>
};

export const DefaultSideToggleMenu = DefaultSideToggleMenuTemplate.bind({});

export const ClosedSideToggleMenu = DefaultSideToggleMenuTemplate.bind({});
ClosedSideToggleMenu.args = {
  initialOpen: false
}

export const CustomPositionSideToggleMenu = DefaultSideToggleMenuTemplate.bind({});
CustomPositionSideToggleMenu.args = {
  initialPosition: 'left'
}

export const CustomWidthSideToggleMenu = DefaultSideToggleMenuTemplate.bind({});
CustomWidthSideToggleMenu.args = {
  width: 400
}