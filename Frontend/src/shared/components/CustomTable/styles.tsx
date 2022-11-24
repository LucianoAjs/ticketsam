import { Table } from "react-super-responsive-table";
import styled from "styled-components";

export const CustomTable = styled(Table)`
  thead {
    th {
      padding: 3px;
      margin: 3px;
    }

    background-image: ${({ theme }) => theme.backgroundGradientFour};
  }

  tbody {
    td {
      padding: 3px;
      margin: 3px;
      @media (max-width: 599px) {
        background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
      }
    }
    tr {
      border: 1px solid ${({ theme }) => theme.primary400};
      padding: 3px;

      background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);

      @media (max-width: 599px) {
        background-image: linear-gradient(
          to top,
          #1e3c72 0%,
          #1e3c72 1%,
          #2a5298 100%
        );
      }
    }
  }
`;
