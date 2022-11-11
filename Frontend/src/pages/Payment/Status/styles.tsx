import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardStyles = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 2rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary400} !important;
`;

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
