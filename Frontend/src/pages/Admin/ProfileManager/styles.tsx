import styled from "styled-components";

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;
  border-radius: 10px;
  max-width: 1000px;
  background: ${({ theme }) => theme.primary400} !important;
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 599px) {
    .row {
      gap: 1rem;
    }
  }
`;
