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
  width: 570px;
  align-self: center;
  flex-grow: 1;
  
  label {
    opacity: 1;
    color: ${({ theme }) => theme.text} !important;
  }
  button {
    width: 475px;
    border-radius: 15px !important;
    height: 50px;
  }

  .color-slate-dark {
    color: ${({ theme }) => theme.primary100} !important;
  }

  a {
    color: unset;
    text-decoration: none;
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
  text-align: center;
  background-color: #fff;
  padding: 20px;
  align-items: center;
  height: 820px;
  color: rgb(77, 77, 77);
  min-height: 500px;
  width: 520px;
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
  margin-left: 60px;
  width: 100%;
  gap: 2rem;
`;

export const AlignCheckBox = styled.div`
  color: #3D85C4;
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


export const AlignRecPassword = styled.div 
`
  color: #3D85C4;
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


export const HaveAccount = styled.div 
  `
  width: 386px;
  color: #3D85C4;
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
  width: 102px;
  height: 102px;
  border: 3px solid ${({ theme }) => theme.gradient};
  margin-bottom: 1.2rem;
`;
