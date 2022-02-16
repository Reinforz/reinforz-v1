import { Button, FormGroup, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

export interface ModalPresetInputProps {
  label: string
  closeModal: () => void
  onSave: (input: string) => void
}

export default function ModalPresetInput(props: ModalPresetInputProps) {
  const [input, setInput] = useState('');
  const { label, onSave, closeModal } = props;
  const { theme } = useThemeSettings();

  return <div className="ModalPresetInput bg-base center" style={{ backgroundColor: theme.color.base }}>
    <FormGroup className="pb-0">
      <InputLabel className="ModalPresetInput-header">{label}</InputLabel>
      <div className="ModalPresetInput-content">
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
    </FormGroup>
    <div className="ModalPresetInput-buttons flex jc-sb p-5">
      <Button variant="contained" color="primary" onClick={() => closeModal()}>
        Close
      </Button>
      <Button variant="contained" color="primary" onClick={() => {
        setInput('')
        onSave(input)
        closeModal();
      }}>
        Save
      </Button>
    </div>
  </div>
}