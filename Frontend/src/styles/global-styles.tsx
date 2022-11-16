import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Comfortaa', cursive, "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  }

  html,body {
    height: 100vh;
    box-sizing: border-box;
    background: ${({ theme }) => theme.primary200};
    color: ${({ theme }) => theme.text};
  }

  h1 {
    font: 700 clamp(2em, 2em + 2vw, 4em)/clamp(1em, 1em + 1vw, 2em) bold;
    color: ${({ theme }) => theme.text} ;
  }

  h2 {
    font: 700 clamp(1.5em, 1.5em + 1.5vw, 2em)/52px bold;
    color: ${({ theme }) => theme.text} ;
  }

  h3 {
    font: 400 clamp(1em, 1em + 1vw, 2em) bold;
    color: ${({ theme }) => theme.text} ;
  }

  h4 {
    font: 700 26px bold ;
    color: ${({ theme }) => theme.primary800};
  }

  h5 {
    font: 700 24px bold ;
    color: ${({ theme }) => theme.text} ;
  }

  h6{
    font: 400 14px/20px bold ;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text} ;
  }

  p{
    font: 22px 22px/42px bold ;
    color: ${({ theme }) => theme.text};
    letter-spacing: 0.21px;
  }

  a {
    transition: color 0.25s ease-in-out;
    text-decoration: none;
    cursor: pointer;
  }

  .MuiFormControl-root {
    width: 385px;
  }

  label {
    color: ${({ theme }) => theme.primary800};
    font-size: 55px;
    font-weight: 700;
    margin: unset !important;
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
    cursor: pointer;
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

  .nav-link{
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.primary700} !important;
  }

  button{
   border-radius: 50px !important;
  }

  .MuiCalendarOrClockPicker-mobileKeyboardInputView {
    input{
      color: black !important;
    }
  }

  .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin: unset !important;
  }

  *{
    font-family: 'Comfortaa', cursive !important;
  }

  .error {
    background-color: red;
  }

  .success {
    background-color: green;
  }
`;
