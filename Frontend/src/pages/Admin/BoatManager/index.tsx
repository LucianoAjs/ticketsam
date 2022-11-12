import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { CustomTable } from "shared/components/CustomTable/styles";
import Paper from "shared/components/Paper";
import { ENDPOINT } from "shared/constants/endpoints";
import useUserContext from "shared/contexts/UserContext/userContext";
import { IBoat } from "shared/interfaces/boat.interface";
import { compact } from "shared/utils";
import Layout, { AlignRow } from "./styles";

export const BoatManager = () => {
  const { update, boat } = useUserContext();
  const [boats, setBoats] = useState<IBoat[]>();

  const getDataBoat = useCallback(async () => {
    const { data } = await ENDPOINT.GET_BOAT();
    await update({ boat: data }, "UPDATE_BOAT");

    setBoats(data);
  }, [update]);

  useEffect(() => {
    if (Object.values(compact(boat)).length === 0) {
      getDataBoat();
    }
  }, [getDataBoat, boat]);

  return (
    <Layout>
      <Container fluid>
        <AlignRow>
          <h2>Gerenciamento de barcos</h2>
          <Row className="align-items-center">
            <Col>
              <Row>
                <Button variant="contained" endIcon={<AddIcon />}>
                  Adicionar
                </Button>
              </Row>
            </Col>
          </Row>
        </AlignRow>
      </Container>
      <Paper className="content">
        <CustomTable>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th>IMO</Th>
              <Th>Bandeira</Th>
              <Th>Status</Th>
              <Th>Inscrição</Th>
            </Tr>
          </Thead>
          {boats?.map((v, index) => (
            <Tbody>
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{v.name}</Td>
                <Td>{v.IMO}</Td>
                <Td>{v.flag}</Td>
                <Td>{v.status}</Td>
                <Td>{v.subscription}</Td>
              </Tr>
            </Tbody>
          ))}
        </CustomTable>
      </Paper>
    </Layout>
  );
};
