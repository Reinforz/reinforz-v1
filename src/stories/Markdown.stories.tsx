import { Meta, Story } from '@storybook/react';
import Markdown, { MarkdownProps } from '../components/Markdown';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/Markdown',
  component: Markdown,
} as Meta;

const DefaultMarkdownTemplate: Story<MarkdownProps> = () => {
  return <Wrapper>
    <Markdown content={`# Heading 1\n\`\`\`js\nconst a = 1;\nconsole.log(a);\n\`\`\`\n**bold**\nParagraph text\n`} />
  </Wrapper>
};

export const DefaultMarkdown = DefaultMarkdownTemplate.bind({});