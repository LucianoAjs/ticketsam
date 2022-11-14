import { Dialog } from "@mui/material";
import { theme } from "styles/theme";

interface IProps {
  setOpen: Function;
  open: boolean;
  children: JSX.Element | JSX.Element[] | string | number;
  fullScrenn?: boolean;
}

export default function OpenDialog({
  children,
  open,
  setOpen,
  fullScrenn = false,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScrenn}
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: `${theme.primary200}`,
          boxShadow: "none",
        },
      }}
    >
      {children}
    </Dialog>
  );
}
