import styled from "styled-components";

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  border-radius: 10px;

  @media (min-width: 599px) {
    max-width: 1000px;
  }
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

export const AlignRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;

  span {
    align-self: center;
  }
`;
