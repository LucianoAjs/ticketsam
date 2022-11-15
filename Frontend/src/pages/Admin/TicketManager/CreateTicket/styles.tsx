import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;
  border-radius: 10px;
  flex-grow: 1;

  @media (min-width: 767px) {
    max-height: 650px;
    max-width: 800px;
  }

  @media (max-width: 599px) {
    button {
      font: unset !important;
      padding: 15px !important;
    }
  }

  background: ${({ theme }) => theme.primary400} !important;
`;

export const Align = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media (max-width: 599px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;
