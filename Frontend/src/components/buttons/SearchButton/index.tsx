import Container from './styles';
import { BsSearch } from 'react-icons/bs';

export const SearchButton = ({ handleClick }: { handleClick: any }) => {
  return (
    <Container onClick={() => handleClick()}>
      <BsSearch size="1.5rem" />
    </Container>
  );
};
