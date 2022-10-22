import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-grow: 1;

  label {
    opacity: 1;
    color: ${({ theme }) => theme.text} !important;
  }
  button {
    width: 386px;
  }

  .color-slate-dark {
    color: ${({ theme }) => theme.primary100} !important;
  }

  a {
    color: unset;
  }

  img {
    padding-left: 1rem;
    padding-right: 0.8rem;
  }

  .unset-padding {
    padding: unset;
  }

  input {
    height: 30px !important;
  }
`;

export const AlignItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  a {
    display: flex;
    align-items: center;
  }
`;

export const Align = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const NavigateTo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

export const AlignInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const AlignCheckBox = styled.div`
  width: 386px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmationIcon = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50.5px;
  padding: 2rem;
  width: 102px;
  height: 102px;
  border: 3px solid ${({ theme }) => theme.gradient};
  margin-bottom: 1.2rem;
`;
