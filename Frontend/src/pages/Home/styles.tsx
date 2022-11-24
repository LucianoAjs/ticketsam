import backgroundMobile from "assets/icons/background-mobile.png";
import backgroundTablet from "assets/icons/ponte-rio-negro.png";
import backgroundDesktop from "assets/icons/rio-negro.png";
import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-grow: 1;

  background-image: url(${backgroundDesktop});
  background-size: cover;

  h1 {
    color: black;
    font-size: 22px;
    font-weight: 400px;
  }

  h2 {
    color: ${({ theme }) => theme.primary700} !important;
  }

  @media (max-width: 1024px) {
    background-image: url(${backgroundTablet});
    background-size: cover;
  }

  @media (max-width: 599px) {
    background-image: url(${backgroundMobile});
    background-size: cover;

    h3 {
      color: black;
    }
  }
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 2rem 2rem;
`;
