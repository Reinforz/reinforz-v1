import { Button, FormGroup, InputLabel, TextField } from "@material-ui/core";
import { useState } from "react";
import "./style.scss";

export interface ModalPresetInputProps {
  label: string
  closeModal: () => void
  onSave: (input: string) => void
}

export default function ModalPresetInput(props: ModalPresetInputProps) {
  const [input, setInput] = useState('');
  const { label, onSave, closeModal } = props;

  return <div className="ModalPresetInput bg-base">
    <FormGroup>
      <InputLabel className="ModalPresetInput-header">{label}</InputLabel>
      <div className="ModalPresetInput-content">
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
    </FormGroup>
    <div className="ModalPresetInput-buttons">
      <Button variant="contained" color="primary" onClick={() => closeModal()}>
        Close
      </Button>
      <Button variant="contained" color="primary" onClick={() => {
        onSave(input)
      }}>
        Save
      </Button>
    </div>
  </div>
}