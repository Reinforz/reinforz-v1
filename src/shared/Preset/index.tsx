import { Button, FormControl, InputLabel, TextField } from "@material-ui/core";
import { useState } from "react";

interface Props {
  label: string
  closeModal: () => void
}

export default function Preset(props: Props) {
  const [input, setInput] = useState('');
  const { label, closeModal } = props;
  return <div className="Preset">
    <FormControl>
      <InputLabel className="Preset-header">{label}</InputLabel>
      <div className="Preset-content">
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
    </FormControl>
    <div className="Preset-buttons">
      <Button onClick={() => closeModal()}>
        Close
      </Button>
      <Button onClick={() => closeModal()}>
        Save
      </Button>
    </div>
  </div>
}