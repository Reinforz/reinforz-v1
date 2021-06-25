import { Meta, Story } from '@storybook/react';
import React from 'react';
import App from '../App';
import { QuestionDisplay, QuestionDisplayProps } from "../components/QuestionDisplay";
import { Root } from '../Root';

export default {
  title: 'Components/QuestionDisplay',
  component: QuestionDisplay,
} as Meta;

const QuestionDisplayTemplate: Story<QuestionDisplayProps> = (args) => {
  return <Root>
    <App>
      <QuestionDisplay {...args} />
    </App>
  </Root>
}

export const QuestionDisplayWithImageQuestionAndContext = QuestionDisplayTemplate.bind({});
QuestionDisplayWithImageQuestionAndContext.args = {
  question: {
    type: "MCQ",
    question: 'Question 1',
    image: 'https://wallpapercave.com/wp/wp6606918.jpg',
    contexts: [
      0,
      1
    ]
  },
  userAnswers: [],
  contexts: [
    `Context 1Est est reprehenderit anim officia esse eiusmod voluptate in. Ex minim amet labore adipisicing adipisicing veniam ipsum eiusmod nisi Lorem adipisicing pariatur. Cupidatat non qui aliqua eiusmod excepteur. Culpa sint id Lorem elit culpa labore eiusmod mollit ex. Consequat eu incididunt mollit ullamco consequat cillum elit. Ad adipisicing ex nisi ipsum veniam do est irure culpa eu enim. Ipsum tempor et elit laboris occaecat nulla.
    Occaecat ut sunt magna velit cupidatat. Ad esse culpa veniam voluptate aute ex ex voluptate tempor veniam est aliquip. Nisi enim duis deserunt ipsum qui. Eu non consequat ea tempor adipisicing consectetur est fugiat id eiusmod. Pariatur laboris laboris est aute in reprehenderit enim et labore aliqua magna labore elit ea. Tempor laborum dolor proident qui reprehenderit quis duis quis nostrud eiusmod ut sit consequat amet.
    Nostrud laboris aute amet id quis ut. Ullamco est sunt commodo sit aliqua officia deserunt excepteur reprehenderit mollit laboris culpa. Commodo dolor eu occaecat minim voluptate occaecat enim tempor do sint occaecat.
    Labore minim id ut proident duis exercitation. Incididunt culpa quis quis ullamco do dolor ea eiusmod fugiat. Enim qui culpa labore mollit ex anim qui pariatur irure est dolore.
    Dolore proident ullamco id est nostrud laboris Lorem non. Veniam cillum quis et quis ullamco magna. Nostrud irure cillum veniam ut magna aute enim laboris duis sint. Aliquip nostrud consectetur voluptate Lorem proident et sint.`,
    `Context 1Est est reprehenderit anim officia esse eiusmod voluptate in. Ex minim amet labore adipisicing adipisicing veniam ipsum eiusmod nisi Lorem adipisicing pariatur. Cupidatat non qui aliqua eiusmod excepteur. Culpa sint id Lorem elit culpa labore eiusmod mollit ex. Consequat eu incididunt mollit ullamco consequat cillum elit. Ad adipisicing ex nisi ipsum veniam do est irure culpa eu enim. Ipsum tempor et elit laboris occaecat nulla.
    Occaecat ut sunt magna velit cupidatat. Ad esse culpa veniam voluptate aute ex ex voluptate tempor veniam est aliquip. Nisi enim duis deserunt ipsum qui. Eu non consequat ea tempor adipisicing consectetur est fugiat id eiusmod. Pariatur laboris laboris est aute in reprehenderit enim et labore aliqua magna labore elit ea. Tempor laborum dolor proident qui reprehenderit quis duis quis nostrud eiusmod ut sit consequat amet.
    Dolore proident ullamco id est nostrud laboris Lorem non. Veniam cillum quis et quis ullamco magna. Nostrud irure cillum veniam ut magna aute enim laboris duis sint. Aliquip nostrud consectetur voluptate Lorem proident et sint.`
  ],
  showImage: true,
  showQuestion: true,
  showContexts: true
}