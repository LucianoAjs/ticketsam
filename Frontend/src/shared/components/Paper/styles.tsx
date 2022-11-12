import styled from "styled-components";

const PaperStyles = styled.div`
  background-color: ${({ theme }) => theme.primary300};
  color: ${({ theme }) => theme.text};

  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );

  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;

  &.elevation-2 {
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
      rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.08)
    );
  }
`;

export default PaperStyles;
