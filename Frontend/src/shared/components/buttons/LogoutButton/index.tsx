import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../styles";
import Container from "./styles";

interface Props {
  redirectTo?: string;
  text?: string;
  data?: string;
  handleClick?: any;
  value?: any;
}

export function LogoutButton({
  text,
  redirectTo,
  data = "show",
  handleClick,
  value,
}: Props) {
  const length = data && data.length > 0 ? false : true;
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
        startIcon={<IoClose size="34px" />}
        disabled={length}
        onClick={() => execute()}
      >
        {text ? text : "Concordar e prosseguir"}
      </Button>
    </Container>
  );
}
