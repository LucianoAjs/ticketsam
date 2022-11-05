import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  flex-grow: 1;

  h1 {
    color: black;
    font-size: 22px;
    font-weight: 400px;
  }
`;

export const AlignSearch = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  margin: auto;
  width: 800px;
`;

export const AlignStretch = styled.div`
  color: black;
  border: solid 3px;
  background-color: #fff;
  max-width: 950px;
  label {
    margin: 15px;
  }
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
