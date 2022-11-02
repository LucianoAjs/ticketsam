import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html,body {
    box-sizing: border-box;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  button{
    font: 700 24px bold !important;
    border-radius: 51px !important;
    padding: 1rem 2rem !important;
    text-transform: unset !important;
  }

`;
