import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html,body {
    height: 100vh;
    box-sizing: border-box;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  .MuiFormControl-root {
    width: 385px;
  }

  label {
    color: ${({ theme }) => theme.primary800};
    font-size: 55px;
    font-weight: 700;
  }

  input {
    color: ${({ theme }) => theme.primary800};
    font-size: 18px;
    font-weight: inherit;
    text-align: left;
  }

  fieldset {
    text-align: center !important;
    border-radius: 20px !important;
    border: 1px solid ${({ theme }) => theme.toggleBorder} !important;
    opacity: 0.38 !important;
    border-width: 1px !important;
    border-color: none !important;
  }

  span {
    color: ${({ theme }) => theme.primary800} !important;
    align-self: baseline;
  }

  svg {
    color: ${({ theme }) => theme.primary500} !important;
  }

  .bg-header {
    background: ${({ theme }) => theme.primary100} !important;
  }
`;
