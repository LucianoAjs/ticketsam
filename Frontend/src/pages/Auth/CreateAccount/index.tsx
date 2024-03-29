import { useState } from "react";
import Container from "../styles";
import { FormAddress } from "./FormAddress";
import { FormUser } from "./FormUser";
export const CreateAccount = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep(step + 1);

  const previous = () => setStep(step - 1);

  const items: JSX.Element[] = [
    <FormUser next={next} />,
    <FormAddress previous={previous} />,
  ];

  return <Container>{items[step]}</Container>;
};
