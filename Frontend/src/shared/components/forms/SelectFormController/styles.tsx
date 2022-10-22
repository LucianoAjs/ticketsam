import styled from "styled-components";

export default styled.div`
  label {
    opacity: 1;
    color: ${({ theme }) => theme.primary300};
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.91px;
  }

  .test {
    width: min(100vw, 303px);
  }

  .select {
    color: ${({ theme }) => theme.primary300};
    font-size: 22px;
    font-weight: 700;
  }

  fieldset {
    border-radius: 20px !important;
    border: 1px solid ${({ theme }) => theme.primary300} !important;
    opacity: 0.38;
  }

  svg {
    color: ${({ theme }) => theme.primary300};
  }
`;
