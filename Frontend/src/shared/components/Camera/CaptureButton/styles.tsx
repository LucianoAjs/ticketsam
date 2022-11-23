import styled from "styled-components";

export default styled.div`
  background-color: ${({ theme }) => theme.text};
  border-radius: 50.5px;
  padding: 0.1rem;
  margin-right: 1rem;

  button {
    background-color: ${({ theme }) => theme.text};
    border: 1px solid black;
    width: 30px;
    height: 60px;
  }

  @media (max-width: 599px) {
    margin-right: 3px;
    padding: 1px;

    button {
      width: 5px;
      height: 30px;
      min-width: 30px;
    }
  }
`;
