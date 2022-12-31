import loading from "assets/icons/loading.svg";
import { Container } from "./styles";

export default function Spin() {
  return (
    <Container>
      <img src={loading} alt="Loading" />
    </Container>
  );
}
