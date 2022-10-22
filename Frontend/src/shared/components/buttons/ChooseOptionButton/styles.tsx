import styled from "styled-components";

export default styled.div`
  Button {
    border-radius: 20px !important;
    color: ${({ theme }) => theme.primary300};
    border: 5px solid ${({ theme }) => theme.primary500};
    padding: 2rem 6rem !important;
    box-shadow: 2px 62.5rem 1px ${({ theme }) => theme.primary100} inset;

    :hover,
    :focus {
      box-shadow: 2px 62.5rem 1px ${({ theme }) => theme.primary100} inset;
    }
  }

  .select-item {
    border: solid 5px transparent;
    background-image: ${({ theme }) => theme.primary100},
      ${({ theme }) => theme.primary200};
    background-clip: content-box, border-box;
  }
`;
