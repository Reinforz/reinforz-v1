import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import shortid from "shortid";
import { List } from "../../components";
import { TQuestionFull } from "../../types";
import "./Create.scss";

export function Create() {
  const [questions, setQuestions] = useState<TQuestionFull[]>([]);
  const [question, setQuestion] = useState<TQuestionFull | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  return <div className="Create">
    <Button color="primary" variant="contained" onClick={() => {
      if (question !== null) {
        setQuestions([...questions, {
          ...question,
          _id: shortid()
        }])
        setQuestion(null);
      }
    }}>Create</Button>
    <TextField value={question?.question ?? ''} label={"Question"} onChange={(e) => setQuestion({ ...question ?? {} as TQuestionFull, question: e.target.value } as any)} />
    <List selectedItems={selectedQuestions} setSelectedItems={setSelectedQuestions} header="Questions" items={questions} setItems={setQuestions} fields={["question"]} />
  </div>
}