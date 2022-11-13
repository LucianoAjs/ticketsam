import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const AlignForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.primary400};
  padding: 30px;
  color: rgb(77, 77, 77);
  border-radius: 9px;

  @media (min-width: 599px) {
    max-width: 1000px;
  }
`;

export const AlignButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  width: 100%;
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Text1 = styled.h2`
  font: 500 35px/28px bold !important;
  color: ${({ theme }) => theme.primary400} !important;
`;

export const Text2 = styled.h5`
  font: 500 20px/40px bold !important;
  color: ${({ theme }) => theme.primary700} !important;
`;

export const Text3 = styled.h5`
  font: 500 20px bold !important;
  color: ${({ theme }) => theme.primary500} !important;
`;

export const Text4 = styled.h6`
  font: 400 14px/28px bold !important;
  color: ${({ theme }) => theme.primary700} !important;
`;

export const Text5 = styled.h5`
  font: 700 16px/28px bold !important;
  color: ${({ theme }) => theme.primary700} !important;
  opacity: unset;
`;

export const Text6 = styled.h5`
  font: 400 16px/28px bold !important;
  color: ${({ theme }) => theme.primary700} !important;
`;
