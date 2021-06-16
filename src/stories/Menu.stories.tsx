import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import Menu, { MenuProps } from '../components/Menu';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Menu',
  component: Menu,
} as Meta;

const DefaultMenuTemplate: Story<MenuProps> = (args) => {
  return <Wrapper>
    <Menu {...args} contents={[<div className="bg-base p-5" style={{ height: 'calc(100% - 10px)' }}>
      <Typography className="bg-light p-5">Inside Menu</Typography>
    </div>, <div className="bg-base p-5" style={{ height: 100 }}>
      <Typography className="bg-light p-5">Outside Menu</Typography>
    </div>]} />
  </Wrapper>
};

export const DefaultMenu = DefaultMenuTemplate.bind({});

export const ClosedMenu = DefaultMenuTemplate.bind({});
ClosedMenu.args = {
  initialOpen: false
}

export const CustomPositionMenu = DefaultMenuTemplate.bind({});
CustomPositionMenu.args = {
  initialPosition: 'left'
}

export const CustomWidthMenu = DefaultMenuTemplate.bind({});
CustomWidthMenu.args = {
  width: 100
}