import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100vh;
  width: 100%;
  gap: 2rem;
`;

export const ScannerStyles = styled.div`
  width: 480px;

  @media (max-width: 599px) {
    width: 80%;
  }
`;
