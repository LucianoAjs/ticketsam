import styled from "styled-components";

import { Card } from "react-bootstrap";

export const CardStyled = styled(Card)`
  display: flex;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary400} !important;
  gap: 1rem;

  svg {
    margin: unset;
  }
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .width {
    width: 100% !important;
    margin: unset;
  }

  h2 {
    color: ${({ theme }) => theme.primary100};
  }

  padding: 2rem;
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 50%;

  @media (max-width: 599px) {
    width: 100%;
  }
`;

export const AlignColumnDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;

  svg {
    margin-top: 1rem;
  }

  h6 {
    opacity: unset;
  }
`;

export const AlignGap = styled.div`
  display: flex;
  gap: 2rem;

  width: 100%;

  @media (max-width: 599px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Align = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 599px) {
    width: 100%;
    flex-wrap: wrap;
    gap: 1rem;

    svg {
      display: none;
    }
  }
`;

export const AlignButton = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 599px) {
    justify-content: center;
  }
`;
