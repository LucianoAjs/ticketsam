import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
  padding: 1rem;
  color: black;

  h1 {
    text-align: center;
    font-weight: 400;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;
  border-radius: 10px;

  @media (min-width: 599px) {
    max-width: 800px;
  }
  background: ${({ theme }) => theme.primary400} !important;
`;

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;

  @media (max-width: 599px) {
    .row {
      gap: 1rem;
    }
  }
`;
