import styled from "styled-components";

export default styled.div``;

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
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  border-radius: 9px;
  max-width: 1000px;
`;

export const AlignButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
`;

export const AlignColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlignLabelTerms = styled.div``;
