import styled from "styled-components";

export default styled.div`
  max-width: 335px;

  label {
    opacity: 1;
    color: ${({ theme }) => theme.primary300};
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.91px;
  }

  input {
    color: ${({ theme }) => theme.primary300};
    font-size: 22px;
    font-weight: 700;
  }

  fieldset {
    text-align: center !important;
    border-radius: 20px !important;
    border: 1px solid ${({ theme }) => theme.primary400} !important;
    opacity: 0.38 !important;
    border-width: 1px !important;
    border-color: none !important;
  }

  span {
    color: ${({ theme }) => theme.primary500} !important;
  }

  svg {
    color: ${({ theme }) => theme.primary500};
  }
`;
