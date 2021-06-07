import { Button, FormGroup, InputLabel, TextField } from "@material-ui/core";
import { useState } from "react";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  label: string
  closeModal: () => void
  onSave: (input: string) => void
}

export default function ModalPresetInput(props: Props) {
  const [input, setInput] = useState('');
  const { label, onSave, closeModal } = props;
  const { theme } = useThemeSettings();

  return <div className="ModalPresetInput" style={{ backgroundColor: theme.color.base }}>
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
        closeModal()
      }}>
        Save
      </Button>
    </div>
  </div>
}