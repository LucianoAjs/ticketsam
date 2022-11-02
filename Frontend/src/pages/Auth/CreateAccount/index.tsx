import { useState } from "react";
import { FormAddress } from "./FormAddress";
import { FormUser } from "./FormUser";
import Container from "./styles";
export const CreateAccount = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep(step + 1);

  const previous = () => setStep(step - 1);

  const items: JSX.Element[] = [
    <FormUser next={next} />,
    <FormAddress previous={previous} />,
  ];

  return (
    <Container>
      <h1>Primeiro, precisamos de algumas informacoes...</h1>
      {items[step]}
    </Container>
  );
};
