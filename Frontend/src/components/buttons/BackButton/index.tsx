import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../styles";
import Container from "./styles";

interface Props {
  redirectTo?: string;
  text?: string;
  handleClick?: any;
  value?: any;
}

export function BackButton({ text, redirectTo, handleClick, value }: Props) {
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
        startIcon={<SvgIcon component={KeyboardArrowLeftIcon} />}
        onClick={() => execute()}
      >
        {text ? text : "Voltar"}
      </Button>
    </Container>
  );
}
