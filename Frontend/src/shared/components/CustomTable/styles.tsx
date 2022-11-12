import { Table } from "react-super-responsive-table";
import styled from "styled-components";

export const CustomTable = styled(Table)`
  thead {
    th {
      padding: 3px;
      margin: 3px;
    }
    background: ${({ theme }) => theme.primary100};
  }

  tbody {
    td {
      padding: 3px;
      margin: 3px;
    }
    tr {
      border: 1px solid ${({ theme }) => theme.primary400};
      padding: 3px;
    }
  }
`;
