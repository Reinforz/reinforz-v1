import { Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Upload, { UploadProps } from '../components/Upload';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Upload',
  component: Upload,
} as Meta;

const UploadTemplate: Story<UploadProps> = (args) => {
  const [files, setFiles] = useState<string[]>([]);

  return <Wrapper>
    <div className="p-5 bg-base mb-5">
      <Upload onLoad={(_, file) => {
        return file.name
      }} postRead={(data: string[]) => setFiles(data)} {...args} />
    </div>
    {files.length !== 0 && <Typography className="flex fd-c p-5 pb-0 bg-base">
      {files.map(file => <div className="p-5 bg-light mb-5">{file}</div>)}
    </Typography>}
  </Wrapper>
};

export const DefaultUpload = UploadTemplate.bind({});

export const CustomUpload = UploadTemplate.bind({});
CustomUpload.args = {
  maxFiles: 1,
  accept: [".yml", ".yaml"],
  uploadMessage: "Custom upload message"
}