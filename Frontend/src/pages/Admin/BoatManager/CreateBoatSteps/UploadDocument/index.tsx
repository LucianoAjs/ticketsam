import rgFront from "assets/icons/rg-front.png";
import rgverse from "assets/icons/rg-verse.png";
import { BackButton, CameraButton, NextButton } from "components/buttons";
import { useState } from "react";

import { IData } from "components/Camera";
import Container, {
  AlignButtons,
  AlignCamera,
  AlignDocuments,
  AlignRg,
  AlignTitle,
} from "./styles";

export function UploadDocument({
  next,
  setOpen,
}: {
  next: Function;
  setOpen: Function;
}) {
  const [cameraValueFront, setCameraValueFront] = useState();
  const [cameraValueVerse, setCameraValueVerse] = useState();

  const isValidCameraValue = cameraValueFront && cameraValueVerse;

  const dataDocumentFront: IData = {
    title: "Frente",
    subtitle: "Posicione seu documento na área indicada",
  };

  const dataDocumentVerse: IData = {
    title: "Verso",
    subtitle: "Posicione seu documento na área indicada",
  };

  return (
    <Container>
      <AlignTitle>
        <h2>Insira uma foto frontal e traseira do seu RG</h2>
      </AlignTitle>

      <AlignDocuments>
        <AlignRg>
          {cameraValueFront ? (
            <img alt="front" src={cameraValueFront} />
          ) : (
            <img alt="rg-front" src={rgFront} />
          )}

          <AlignCamera>
            <CameraButton
              setCameraValue={setCameraValueFront}
              data={dataDocumentFront}
            />
          </AlignCamera>
        </AlignRg>
        <AlignRg>
          {cameraValueVerse ? (
            <img alt="verse" src={cameraValueVerse} />
          ) : (
            <img alt="rg-verse" src={rgverse} />
          )}

          <AlignCamera>
            <CameraButton
              setCameraValue={setCameraValueVerse}
              data={dataDocumentVerse}
            />
          </AlignCamera>
        </AlignRg>
      </AlignDocuments>

      <AlignButtons>
        <BackButton
          key="back-button"
          text="Voltar"
          handleClick={() => setOpen(false)}
        />
        <NextButton
          disabled={!isValidCameraValue}
          key="next-button"
          text="Prosseguir"
          handleClick={next}
        />
      </AlignButtons>
    </Container>
  );
}
