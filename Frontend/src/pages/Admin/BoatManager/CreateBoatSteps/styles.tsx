import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;

  flex-grow: 1;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 599px) {
    button {
      font: unset !important;
    }
  }
`;
