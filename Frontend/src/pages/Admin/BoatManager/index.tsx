import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { CustomTable } from "components/CustomTable/styles";
import OpenDialog from "components/OpenDialog";
import Paper from "components/Paper";
import Spin from "components/Spin";
import useUserContext from "contexts/UserContext/userContext";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { userSellerService } from "services/user.seller.service";

import { IBoat } from "shared/interfaces/boat.interface";
import { currentStatusPayment } from "shared/utils/common/status";
import { CreateBoatSteps } from "./CreateBoatSteps";
import Layout, { AlignRow } from "./styles";

export const BoatManager = () => {
  const { update, boat } = useUserContext();
  const [boats, setBoats] = useState<IBoat[]>(boat);
  const [openDialog, setOpenDialog] = useState(false);
  const [fetching, setFetching] = useState(false);

  const getDataBoat = useCallback(async () => {
    setFetching(true);
    const { data } = await userSellerService.BOAT.GET_BOAT();

    await update({ boat: data }, "UPDATE_BOAT");

    setBoats(data);
    setFetching(false);
  }, [update]);

  useEffect(() => {
    getDataBoat();
  }, [getDataBoat, boat]);

  if (fetching) {
    return <Spin />;
  }

  return (
    <>
      <OpenDialog
        fullScrenn={true}
        setOpen={setOpenDialog}
        open={openDialog}
        children={<CreateBoatSteps setOpen={setOpenDialog} />}
      />

      <Layout>
        <Container fluid>
          <AlignRow>
            <h2>Gerenciamento de barcos</h2>
            <Row className="align-items-center">
              <Col>
                <Row>
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                  >
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
              <Tbody key={index}>
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{v.name}</Td>
                  <Td>{v.IMO}</Td>
                  <Td>{v.flag}</Td>
                  <Td>{currentStatusPayment(v.status.status)}</Td>
                  <Td>{v.subscription}</Td>
                </Tr>
              </Tbody>
            ))}
          </CustomTable>
        </Paper>
      </Layout>
    </>
  );
};
