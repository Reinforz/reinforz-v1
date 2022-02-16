import { Meta, Story } from '@storybook/react';
import { AiFillHome } from 'react-icons/ai';
import { FaKeyboard } from 'react-icons/fa';
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import IconGroup, { IconGroupProps } from '../components/IconGroup';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/IconGroup',
  component: IconGroup,
} as Meta;

const DefaultIconGroupTemplate: Story<IconGroupProps> = () => {
  return <Wrapper>
    {(_, theme) => <IconGroup icons={[['Settings', <IoMdSettings fill={theme.palette.color.opposite_light} />], ['Home', <AiFillHome fill={theme.palette.color.opposite_light} />], ['Create', <IoMdCreate fill={theme.palette.color.opposite_light} />], ['Shortcuts', <FaKeyboard fill={theme.palette.color.opposite_light} />]]} />}
  </Wrapper>
};

export const DefaultIconGroup = DefaultIconGroupTemplate.bind({});

const CustomIconGroupTemplate: Story<IconGroupProps> = () => {
  return <Wrapper>
    {(_, theme) => <IconGroup direction="column" icons={[['Settings', <IoMdSettings fill={theme.palette.color.opposite_light} />, {
      popoverAnchorOrigin: {
        horizontal: 'right',
        vertical: 'center'
      },
      popoverTransformOrigin: {
        horizontal: 'right',
        vertical: 'center'
      }
    }], ['Home', <AiFillHome fill={theme.palette.color.opposite_light} />, {
      popoverAnchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom'
      },
      popoverTransformOrigin: {
        horizontal: 'left',
        vertical: 'bottom'
      }
    }], ['Create', <IoMdCreate fill={theme.palette.color.opposite_light} />, {
      popoverAnchorOrigin: {
        horizontal: 'center',
        vertical: 'top'
      },
      popoverTransformOrigin: {
        horizontal: 'center',
        vertical: 'top'
      }
    }], ['Shortcuts', <FaKeyboard fill={theme.palette.color.opposite_light} />]]} />}
  </Wrapper>
};

export const CustomIconGroup = CustomIconGroupTemplate.bind({});