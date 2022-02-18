import { Box, Button, FormGroup, InputLabel, TextField } from "@mui/material";
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

  return <Box className="ModalPresetInput bg-base center" style={{ backgroundColor: theme.palette.color.base }}>
    <FormGroup className="pb-0">
      <InputLabel className="ModalPresetInput-header">{label}</InputLabel>
      <Box className="ModalPresetInput-content">
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      </Box>
    </FormGroup>
    <Box className="ModalPresetInput-buttons flex jc-sb p-5">
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
    </Box>
  </Box>
}