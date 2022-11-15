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

  @media (min-width: 599px) {
    max-height: 650px;
  }

  @media (min-width: 767px) {
    max-height: 500px;
  }

  background: ${({ theme }) => theme.primary400} !important;
`;
