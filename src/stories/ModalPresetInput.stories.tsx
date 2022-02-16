import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import ModalPresetInput, { ModalPresetInputProps } from '../components/ModalPresetInput';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/ModalPresetInput',
  component: ModalPresetInput,
} as Meta;

const DefaultModalPresetInputTemplate: Story<ModalPresetInputProps> = () => {
  const [open, setOpen] = useState(true);
  return <Wrapper>
    <div>
      <Typography onClick={() => setOpen((open) => !open)}>{open ? "Close Modal" : "Open Modal"}</Typography>
      {open ? <ModalPresetInput label="Save preset" onSave={(input) => console.log(input)} closeModal={() => setOpen(false)} /> : null}
    </div>
  </Wrapper>
};

export const DefaultModalPresetInput = DefaultModalPresetInputTemplate.bind({});