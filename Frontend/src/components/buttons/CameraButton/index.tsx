import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Dialog, SvgIcon } from "@mui/material";
import { Camera, IData } from "components/Camera";
import { useState } from "react";
import Container from "./styles";

export function CameraButton({
  setCameraValue,
  data,
}: {
  setCameraValue: any;
  data: IData;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container onClick={() => setOpen(true)}>
        <SvgIcon fontSize="large" component={CameraAltRoundedIcon} />
      </Container>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Camera
          handleCloseCamera={handleClose}
          setCameraValue={setCameraValue}
          data={data}
        />
      </Dialog>
    </>
  );
}
