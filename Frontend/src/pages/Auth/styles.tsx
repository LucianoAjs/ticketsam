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
`;

export const AlignItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  text-align: center;
  background-color: ${({ theme }) => theme.primary400};
  padding: 20px;
  align-items: center;
  color: rgb(77, 77, 77);
  min-height: 500px;
  border-radius: 9px;
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
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const AlignCheckBox = styled.div`
  color: #3d85c4;
  font-size: 18px;
  display: flex;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  margin-top: -50px;
  padding: 10px;
  &:hover {
    background-color: #e9e9e9;
    border-radius: 7px;
    padding: 10px;
  }
`;

export const AlignRecPassword = styled.div`
  color: #3d85c4;
  padding: 2px;
  font-size: 18px;
  font-size: 18px;
  display: flex;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  padding: 10px;
  &:hover {
    background-color: #e9e9e9;
    border-radius: 7px;
    padding: 10px;
  }
`;

export const HaveAccount = styled.div`
  color: #3d85c4;
  font-size: 18px;
  display: flex;
  text-decoration: none;
  text-align: center;
  justify-content: center;
`;

export const ConfirmationIcon = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50.5px;
  padding: 2rem;
  border: 3px solid ${({ theme }) => theme.gradient};
  margin-bottom: 1.2rem;
`;
