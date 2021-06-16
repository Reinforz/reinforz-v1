import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import SelectGroup, { SelectGroupProps } from '../components/SelectGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/SelectGroup',
  component: SelectGroup,
} as Meta;

const DefaultSelectGroupTemplate: Story<SelectGroupProps> = () => {
  const [state, setState] = useState({
    navigation: {
      x: 'center',
      y: 'top',
      direction: 'row'
    },
  });

  return <Wrapper>
    <SelectGroup groupItems={[
      [["center", "right", "left"], "X-Axis", "x"],
      [["center", "top", "bottom"], "Y-Axis", "y"],
      [["column", "row"], "Direction", "direction"],
    ]} label={"Navigation"} setState={setState} state={state} stateKey={"navigation"} />
  </Wrapper>
};

export const DefaultSelectGroup = DefaultSelectGroupTemplate.bind({});