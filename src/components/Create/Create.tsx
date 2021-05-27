import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import shortid from "shortid";
import { List } from "../../shared";
import { TQuestionFull } from "../../types";

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
    <TextField value={question?.question ?? ''} onChange={(e) => setQuestion({ ...question ?? {} as TQuestionFull, question: e.target.value } as any)} />
    <List selectedItems={selectedQuestions} setSelectedItems={setSelectedQuestions} header="Create questions" items={questions} setItems={setQuestions} fields={["question"]} />
  </div>
}