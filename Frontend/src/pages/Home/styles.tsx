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
  font-family: Roboto,sans-serif;
  flex-grow: 1;

  input {
    height: 30px !important;
  }
  h1 {
    color: black;
    font-size: 22px;
    weigth: 400px;
  }
`;

export const AlignSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: #fff;
  height: 320px;
  width: 720px;
  border-radius: 9px;
`;
