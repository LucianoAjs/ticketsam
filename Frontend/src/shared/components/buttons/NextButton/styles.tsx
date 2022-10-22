import styled from "styled-components";

export default styled.div`
  Button {
    background-color: ${({ theme }) => theme.primary500};

    &:disabled {
      pointer-events: none !important;
      opacity: 0.8;
      color: ${({ theme }) => theme.primary300};
      background-color: ${({ theme }) => theme.primary400};
    }
  }
`;
