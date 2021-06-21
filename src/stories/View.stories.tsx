import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import View, { ViewProps } from '../components/View';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/View',
  component: View,
} as Meta;

const ViewTemplate: Story<ViewProps> = (args) => {
  return <Wrapper>
    <div className="p-5 bg-base" style={{ height: 500 }}>
      <View items={[
        <Typography className="bg-light p-5" style={{ height: 'calc(100% - 10px)' }}>One</Typography>,
        <Typography className="bg-light p-5" style={{ height: 'calc(100% - 10px)' }}>Two</Typography>,
      ]} />
    </div>
  </Wrapper>
};

export const DefaultView = ViewTemplate.bind({});