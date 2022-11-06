import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;

  h1 {
    color: black;
    font-size: 22px;
    font-weight: 400px;
  }
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 2rem 2rem;
`;
