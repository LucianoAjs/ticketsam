import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;

  gap: 1rem;

  img {
    width: 400px;
    padding: 1.5rem 1.5rem;
    border-radius: 9px;
    border: 6px dashed ${({ theme }) => theme.primary100};
    opacity: 1;
    background-color: ${({ theme }) => theme.primary400};
  }

  @media (max-width: 599px) {
    img {
      width: 60%;
      padding: 0.5rem;
      border-radius: 9px;
      border: 6px dashed ${({ theme }) => theme.primary100};
      opacity: 1;
      background-color: ${({ theme }) => theme.primary400};
    }
  }
`;

export const AlignTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center !important;
  gap: 1rem;
`;

export const AlignDocuments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6rem;
`;

export const AlignRg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
`;

export const AlignCamera = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const AlignButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
