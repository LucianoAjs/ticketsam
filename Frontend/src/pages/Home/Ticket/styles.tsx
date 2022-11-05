import styled from "styled-components";

import { Card } from "react-bootstrap";

export const CardStyled = styled(Card)`
  display: flex;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary700} !important;
`;

export default styled.div`
  display: flex;
  flex-grow: 1;
`;
