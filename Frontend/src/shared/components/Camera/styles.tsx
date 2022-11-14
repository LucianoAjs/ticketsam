import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  img {
    width: 100%;
    height: 100%;
  }

  video {
    height: 100vh;
    width: 100%;
    object-fit: cover !important;
  }
`;

export const Align = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AlignRow = styled.div`
  p {
    display: flex;
    align-items: center;
    align-content: center;
    align-self: center;
    gap: 0.5rem;
  }

  cursor: pointer;
`;

export const CameraStyles = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  width: 80%;
  height: 80%;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
`;

export const AlignVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  gap: 1rem;
  height: 100vh;
`;

export const AlignHorizontal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 100%;
  height: 100vh;
`;

export const CameraSwitch = styled.div`
  margin-left: 1rem;
  height: 10%;
  cursor: pointer;
`;

export const CaptureButtonStyles = styled.div`
  height: 10%;
`;
