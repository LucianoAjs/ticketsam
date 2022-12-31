import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../styles";
import Container from "./styles";

interface Props {
  redirectTo?: string;
  text?: string;
  disabled?: boolean;
  handleClick?: any;
  value?: any;
  icon?: boolean;
}

export function NextButton({
  text,
  redirectTo,
  disabled = false,
  handleClick,
  value,
  icon = true,
}: Props) {
  function execute() {
    if (redirectTo && handleClick) {
      navigate(redirectTo);
      handleClick(value);
    } else if (redirectTo) {
      navigate(redirectTo);
    } else {
      handleClick(value);
    }
  }

  const navigate = useNavigate();
  return (
    <Container>
      <Button
        variant="contained"
        endIcon={icon && <SvgIcon component={KeyboardArrowRight} />}
        disabled={disabled}
        onClick={() => execute()}
      >
        {text ? text : "Concordar e prosseguir"}
      </Button>
    </Container>
  );
}
