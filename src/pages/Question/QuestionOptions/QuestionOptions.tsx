import { useMemo } from "react";
import { ListCheckboxGroup, ListRadioGroup, Markdown } from "../../../components";
import { TSelectQuestion } from '../../../types';

interface Props {
  setUserAnswers: (val: string[]) => any,
  userAnswers: string[],
  question: TSelectQuestion,
}

export default function QuestionOptions(props: Props) {
  const { setUserAnswers, userAnswers, question: { options, _id } } = props;

  const memoizedQuestionOptions = useMemo(() => {
    return options!.map(option => <Markdown content={option.text} classNames={{ typography: 'fs-20' }} />)
    // eslint-disable-next-line
  }, [_id])

  switch (props.question.type) {
    case "MCQ":
      return <ListRadioGroup setState={setUserAnswers} items={memoizedQuestionOptions} value={userAnswers} />
    case "MS":
      return <ListCheckboxGroup setState={setUserAnswers} items={memoizedQuestionOptions} value={userAnswers} />
    default:
      return null
  }
}

