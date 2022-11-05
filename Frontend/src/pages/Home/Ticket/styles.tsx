import styled from "styled-components";

import { Card } from "react-bootstrap";

export const CardStyled = styled(Card)`
  display: flex;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary100} !important;
`;

export default styled.div`
  display: flex;
  flex-grow: 1;
  gap: 2rem;
`;

export const AlignRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlignRowButton = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const AlignButton = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
`;
