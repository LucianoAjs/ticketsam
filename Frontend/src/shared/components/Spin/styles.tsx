import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

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
