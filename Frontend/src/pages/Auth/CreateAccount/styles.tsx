import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
  padding: 6rem 12rem 6rem 12rem;
  color: black;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    text-align: center;
    font-weight: 400;
  }

  .width {
    width: 390px;
  }
`;
