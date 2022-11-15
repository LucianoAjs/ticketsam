import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { CustomTable } from "shared/components/CustomTable/styles";
import OpenDialog from "shared/components/OpenDialog";
import Paper from "shared/components/Paper";
import { ENDPOINT } from "shared/constants/endpoints";
import useUserContext from "shared/contexts/UserContext/userContext";
import { IBoat } from "shared/interfaces/boat.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { compact } from "shared/utils";
import { formatCurrencyPtBr } from "shared/utils/common/format-currency-pt-br";
import { CreateTicket } from "./CreateTicket";
import Layout, { AlignRow } from "./styles";
import { TicketMenuIActions } from "./TicketMenuIActions";

export const TicketManager = () => {
  const { update, boat } = useUserContext();
  const [boats, setBoats] = useState<IBoat[]>(boat);
  const [ticket, setTicket] = useState<ITicket>();
  const [openActions, setOpenActions] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenActions(true);
  };

  const getDataBoat = useCallback(async () => {
    if (Object.values(compact(boat)).length === 0) {
      const { data } = await ENDPOINT.GET_BOAT();

      await update({ boat: data }, "UPDATE_BOAT");

      setBoats(data);
    } else {
      setBoats(boat);
    }
  }, [boat, update]);

  useEffect(() => {
    getDataBoat();
  }, [getDataBoat, boat]);

  return (
    <>
      <OpenDialog
        fullScrenn={true}
        setOpen={setOpenDialog}
        open={openDialog}
        children={<CreateTicket setOpen={setOpenDialog} />}
      />
      <TicketMenuIActions
        open={openActions}
        setOpen={setOpenActions}
        anchorEl={anchorEl}
        ticket={ticket}
      />
      <Layout>
        <Container fluid>
          <AlignRow>
            <h2>Gerenciamento de bilhetes</h2>
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
                <Th>Data de partida</Th>
                <Th>Data de chegada</Th>
                <Th>Cidade de partida</Th>
                <Th>Cidade de chegada</Th>
                <Th>Valor do bilhete</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            {boats?.map((v) => {
              return v.ticket?.map((v, index) => (
                <Tbody key={index}>
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{new Date(v.dt_arrival)?.toLocaleDateString()}</Td>
                    <Td>{new Date(v.dt_output)?.toLocaleDateString()}</Td>
                    <Td>{v.home_city}</Td>
                    <Td>{v.destination_city}</Td>
                    <Td>
                      {formatCurrencyPtBr(v.food_value + v.transport_value)}
                    </Td>

                    <Td key={index}>
                      <MoreVertIcon
                        onClick={(e: any) => {
                          setTicket(v);
                          handleClick(e);
                        }}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              ));
            })}
          </CustomTable>
        </Paper>
      </Layout>
    </>
  );
};
