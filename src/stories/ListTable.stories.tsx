import { Meta, Story } from '@storybook/react';
import ListTable, { ListTableProps } from '../components/ListTable';
import { TQuestionType } from '../types';
import Wrapper from "./Wrapper";

export default {
  title: 'Components/ListTable',
  component: ListTable,
} as Meta;

const DefaultListTableTemplate: Story<ListTableProps<Record<string, { title: string, questions: { type: TQuestionType }[] }>>> = (args) => {
  return <Wrapper>
    <ListTable generateTitle={(item) => item.title} headers={["Snippet", "FIB", "MS", "MCQ"]} itemKey={"questions"} itemKeyKey={"type"} items={[{
      title: 'Quiz 1',
      questions: [
        {
          type: 'FIB'
        },
        {
          type: 'Snippet'
        },
        {
          type: 'MS'
        },
        {
          type: 'FIB'
        },
        {
          type: 'MCQ'
        },
        {
          type: 'MCQ'
        },
        {
          type: 'MS'
        },
        {
          type: 'Snippet'
        },
        {
          type: 'FIB'
        },
      ]
    }, {
      title: 'Quiz 2',
      questions: [
        {
          type: 'Snippet'
        },
        {
          type: 'FIB'
        },
        {
          type: 'MS'
        },
        {
          type: 'FIB'
        },
        {
          type: 'MS'
        },
        {
          type: 'FIB'
        }
      ]
    }]} />
  </Wrapper>
};

export const DefaultListTable = DefaultListTableTemplate.bind({});