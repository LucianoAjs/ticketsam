import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    animation: spin 1s linear infinite;
    width: 102px;
    height: 102px;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
