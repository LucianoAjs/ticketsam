import Container from './styles';
import Button from '@mui/material/Button';

interface Props {
  handleClick?: any;
  value?: any;
  selectValue?: any;
  label?: string;
}

export function ChooseOptionButton({
  label,
  selectValue,
  handleClick,
  value,
}: Props) {
  return (
    <Container>
      <Button
        variant='contained'
        className={selectValue === value ? 'select-item' : ''}
        onClick={() => handleClick(value)}
      >
        {label || value}
      </Button>
    </Container>
  );
}
