import styled from "styled-components";

export default styled.div`
  label {
    color: ${({ theme }) => theme.primary800};
    font-size: 55px;
    font-weight: 700;
    width: 390px;
  }

  .width {
    width: 390px;
  }

  input {
    color: ${({ theme }) => theme.primary800};
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    width: 100%;
  }

  .select {
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
    color: ${({ theme }) => theme.primary800} !important;
    align-self: baseline;
  }

  svg {
    color: ${({ theme }) => theme.primary500};
  }
`;
