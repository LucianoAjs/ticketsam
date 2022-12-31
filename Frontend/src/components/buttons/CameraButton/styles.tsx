import styled from "styled-components";

export default styled.div`
  border-radius: 50.5px;
  opacity: 1;
  background-color: ${({ theme }) => theme.primary400};
  padding: 1rem;
  cursor: pointer;

  @media (max-width: 599px) {
    padding: 0.5rem;
    svg {
      height: 30px;
    }
  }
`;
