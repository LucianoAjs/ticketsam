import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  width: 100%;

  @media (min-width: 599px) {
    max-width: 900px;
  }

  .content {
    width: 100%;
  }

  svg {
    color: ${({ theme }) => theme.primary50} !important;
    cursor: pointer !important;
  }
`;

export const AlignRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  span {
    align-self: center;
  }

  @media (max-width: 599px) {
    gap: unset;
    justify-content: center;
  }

  .gap {
    gap: 1rem;
  }
`;
