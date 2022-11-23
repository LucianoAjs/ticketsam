import { Button, styled } from "@mui/material";

const DefaultButtonStyled = styled(Button)`
  font: 700 clamp(0.5em, 0.8em + 0.8vw, 1.2em) bold !important;
  border-radius: 51px !important;
  padding: clamp(0.6rem, 0.5rem + 0.5vw, 1.5rem) !important;
  text-transform: unset !important;
`;
export default DefaultButtonStyled;
