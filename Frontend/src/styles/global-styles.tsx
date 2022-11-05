import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html,body {
    height: 100vh;
    box-sizing: border-box;
    background: ${({ theme }) => theme.primary200};
    color: ${({ theme }) => theme.text};
  }

  h1 {
    font: 700 52px/78px bold ;
    color: ${({ theme }) => theme.text} ;
  }

  h2 {
    font: 700 clamp(1.5em, 1.5em + 1.5vw, 2em)/52px bold ;
    color: ${({ theme }) => theme.text} ;
  }

  h3 {
    font: 400 28px bold ;
    color: ${({ theme }) => theme.text} ;
  }

  h4 {
    font: 700 26px bold ;
    color: ${({ theme }) => theme.primary800};
    opacity: 0.6;
  }

  h5 {
    font: 700 24px bold ;
    color: ${({ theme }) => theme.text} ;
  }

  h6{
    font: 400 14px/20px bold ;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text} ;
    opacity: 0.5;
  }

  p{
    font: 22px 22px/42px bold ;
    color: ${({ theme }) => theme.text};
    letter-spacing: 0.21px;
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
    color: ${({ theme }) => theme.primary700} !important;
    font-size: 18px;
    font-weight: inherit;
    text-align: left;
  }

  fieldset {
    text-align: center;
    border-radius: 20px ;
    border: 1px solid ${({ theme }) => theme.toggleBorder} !important;
    opacity: 0.38 ;
    border-width: 1px ;
    border-color: none ;
  }

  span {
    color: ${({ theme }) => theme.primary700} ;
    align-self: baseline;
  }

  svg {
    color: ${({ theme }) => theme.primary300} !important;
  }

  .bg-header {
    background: ${({ theme }) => theme.primary100} !important;
  }

  .select{
    color: ${({ theme }) => theme.primary700} !important;

    option {
      margin: 40px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }
  }

    /* scrollbar */
    ::-webkit-scrollbar {
    width: 7px;
    background:  ${({ theme }) => theme.primary400} !important;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary500} !important;
  }

`;
