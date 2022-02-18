import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import shortid from "shortid";
import { List } from "../../components";
import { TQuestion } from "../../types";
import "./Create.scss";

export function Create() {
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [question, setQuestion] = useState<TQuestion | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  return <Box className="Create">
    <Button color="primary" variant="contained" onClick={() => {
      if (question !== null) {
        setQuestions([...questions, {
          ...question,
          _id: shortid()
        }])
        setQuestion(null);
      }
    }}>Create</Button>
    <TextField value={question?.question ?? ''} label={"Question"} onChange={(e) => setQuestion({ ...question ?? {} as TQuestion, question: e.target.value } as any)} />
    <List selectedItems={selectedQuestions} setSelectedItems={setSelectedQuestions} header="Questions" items={questions} setItems={setQuestions} fields={["question"]} />
  </Box>
}