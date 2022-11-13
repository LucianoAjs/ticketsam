import backgroundMobile from "assets/icons/background-mobile.png";
import background from "assets/icons/praia-background.jpg";
import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-grow: 1;

  background-image: url(${background});
  background-size: cover;

  h1 {
    color: black;
    font-size: 22px;
    font-weight: 400px;
  }

  h2 {
    color: ${({ theme }) => theme.primary700} !important;
  }

  @media (max-width: 599px) {
    background-image: url(${backgroundMobile});
    background-size: cover;
  }
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 2rem 2rem;
`;
