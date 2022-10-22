import { BackButton, NextButton } from "shared/components/buttons";
import { AlignButtons } from "styles/app-styles";

export const FormAddress = ({ previous }: { previous: Function }) => {
  return (
    <>
      <AlignButtons>
        <BackButton key="back-button" text="Voltar" handleClick={previous} />
        <NextButton key="next-button" text="Prosseguir" />
      </AlignButtons>
    </>
  );
};
