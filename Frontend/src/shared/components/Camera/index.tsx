import { useCallback, useRef, useState } from "react";
import { MdOutlineCameraswitch, MdOutlineClose } from "react-icons/md";
import Webcam from "react-webcam";
import { Text6 } from "styles/app-styles";
import { CaptureButton } from "./CaptureButton";
import Container, {
  Align,
  AlignHorizontal,
  AlignRow,
  AlignVertical,
  CameraStyles,
  CameraSwitch,
  CaptureButtonStyles,
} from "./styles";

interface IConstraints {
  height?: number;
  width?: number;
  facingMode: string | { exact: string };
}

export interface IData {
  title: string;
  subtitle?: string;
  facingMode?: string;
}

export const Camera = ({
  handleCloseCamera,
  setCameraValue,
  data,
}: {
  handleCloseCamera: any;
  setCameraValue: any;
  data: IData;
}) => {
  const { title, subtitle, facingMode } = data;
  const videoConstraints: IConstraints = {
    facingMode: facingMode ? facingMode : { exact: "environment" },
  };

  const webcam = useRef<any>();
  const [constraints, setConstraints] =
    useState<IConstraints>(videoConstraints);

  const [imgSrc, setImgSrc] = useState();

  const capture = useCallback(() => {
    const imageSrc = webcam.current.getScreenshot();
    setImgSrc(imageSrc);
    setCameraValue(imageSrc);
  }, [setCameraValue]);

  const handleFacingMode = () => {
    constraints.facingMode === "user"
      ? setConstraints({ ...constraints, facingMode: { exact: "environment" } })
      : setConstraints({ ...constraints, facingMode: "user" });
  };

  return (
    <Container>
      <Webcam
        videoConstraints={constraints}
        audio={false}
        ref={webcam}
        screenshotFormat="image/png"
      />
      <AlignVertical>
        <Align>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </Align>
        <AlignHorizontal>
          <CameraSwitch onClick={() => handleFacingMode()}>
            <MdOutlineCameraswitch size={60} />
          </CameraSwitch>

          <CameraStyles>
            {imgSrc && <img alt="capture" src={imgSrc} />}
          </CameraStyles>

          <CaptureButtonStyles>
            <CaptureButton capture={capture} />
          </CaptureButtonStyles>
        </AlignHorizontal>
        <AlignRow onClick={() => handleCloseCamera()}>
          <Text6>
            <MdOutlineClose size={25} /> Fechar Camera
          </Text6>
        </AlignRow>
      </AlignVertical>
    </Container>
  );
};
