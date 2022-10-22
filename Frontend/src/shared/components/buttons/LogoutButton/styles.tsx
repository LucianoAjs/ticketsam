import styled from "styled-components";

export default styled.div`
  button {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.primary300};
    padding: 2rem 3rem !important;
    width: 370px;

    :hover {
      background-color: ${({ theme }) => theme.primary300};
      color: ${({ theme }) => theme.primary100} !important;
      svg {
        color: ${({ theme }) => theme.primary100};
      }
    }

    &:disabled {
      pointer-events: none !important;
      opacity: 0.8;
      color: ${({ theme }) => theme.primary300};
      background-color: ${({ theme }) => theme.primary400};
    }
  }
`;
