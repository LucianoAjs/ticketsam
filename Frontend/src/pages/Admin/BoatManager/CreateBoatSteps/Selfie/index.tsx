import selfiePic from "assets/icons/selfie.png";
import { BackButton, CameraButton, NextButton } from "components/buttons";
import { IData } from "components/Camera";
import { useState } from "react";

import Container, {
  AlignButtons,
  AlignCamera,
  AlignContent,
  AlignText,
  Imagem,
} from "./styles";

export function Selfie({
  next,
  previous,
}: {
  next: Function;
  previous: Function;
}) {
  const [cameraValue, setCameraValue] = useState<any>();

  const dataDocumentSelfie: IData = {
    title: "Mostre o documento na altura do rosto.",
    facingMode: "user",
  };

  return (
    <Container>
      <AlignText>
        <h2>Agora é hora de tirar uma selfie com seu documento.</h2>
      </AlignText>
      <AlignContent>
        <Imagem>
          <img alt="selfie-img" src={cameraValue ? cameraValue : selfiePic} />
        </Imagem>
        <AlignCamera>
          <CameraButton
            setCameraValue={setCameraValue}
            data={dataDocumentSelfie}
          />
        </AlignCamera>
      </AlignContent>

      <AlignButtons>
        <BackButton key="back-button" text="Voltar" handleClick={previous} />
        <NextButton
          key="next-button"
          text="Prosseguir"
          disabled={!cameraValue}
          handleClick={next}
        />
      </AlignButtons>
    </Container>
  );
}
