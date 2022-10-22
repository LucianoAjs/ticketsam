import { useState } from 'react';
import Container from './styles';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { SvgIcon } from '@mui/material';

export function CameraButton() {
  const [videoStream, setVideoStream] = useState<MediaProvider | null>();

  const hasBrowserMediaPermission = async () => {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      setVideoStream(
        await navigator.mediaDevices.getUserMedia({ video: true })
      );
    }
  };

  return (
    <Container>
      <SvgIcon
        fontSize='large'
        component={CameraAltRoundedIcon}
        onClick={() => hasBrowserMediaPermission()}
      />
    </Container>
  );
}
