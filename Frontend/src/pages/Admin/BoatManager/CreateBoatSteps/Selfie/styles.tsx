import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  gap: 1rem;
`;

export const Imagem = styled.div`
  border-radius: 9px;
  border: 6px dashed ${({ theme }) => theme.primary100};
  background-color: ${({ theme }) => theme.primary400};
  display: flex;
  justify-content: center;
  height: 374px;

  img {
    padding: 2rem;
  }

  @media (max-width: 599px) {
    height: unset;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;

export const AlignText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

export const AlignContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

export const AlignCamera = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const AlignButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
