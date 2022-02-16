import Modal from '@mui/material/Modal';

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
  children: JSX.Element
}

export default function SimpleModal(props: Props) {
  const { open, setOpen, children } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Modal">
      <Modal
        open={open}
        onClose={handleClose}
      >
        {children}
      </Modal>
    </div>
  );
}
