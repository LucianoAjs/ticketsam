import { useState } from "react";
import { CreateBoatForm } from "../CreateBoatForm";
import { Selfie } from "../Selfie";
import { UploadDocument } from "../UploadDocument";
import Container from "./styles";
export const CreateBoatSteps = ({ setOpen }: { setOpen: Function }) => {
  const [step, setStep] = useState(0);

  const next = () => setStep(step + 1);

  const previous = () => setStep(step - 1);

  const items: JSX.Element[] = [
    <UploadDocument next={next} setOpen={setOpen} />,
    <Selfie next={next} previous={previous} />,
    <CreateBoatForm previous={previous} setOpen={setOpen} />,
  ];

  return <Container>{items[step]}</Container>;
};
