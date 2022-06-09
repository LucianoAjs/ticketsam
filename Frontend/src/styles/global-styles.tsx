import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  html,body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

`;
