import Container from './styles';
import Button from '@mui/material/Button';

export const CaptureButton = ({ capture }: { capture: any }) => {
  return (
    <Container>
      <Button onClick={capture} />
    </Container>
  );
};
