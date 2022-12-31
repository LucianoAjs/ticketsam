import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { CustomTable } from "components/CustomTable/styles";
import OpenDialog from "components/OpenDialog";
import Paper from "components/Paper";
import Spin from "components/Spin";
import useUserContext from "contexts/UserContext/userContext";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { userSellerService } from "services/user.seller.service";
import { IBoat } from "shared/interfaces/boat.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { compact } from "shared/utils";
import { formatCurrencyPtBr } from "shared/utils/common/format-currency-pt-br";
import { convertDateFormatUsToBr } from "shared/utils/date/convert-date-us-to-br";
import { CreateTicket } from "./CreateTicket";
import Layout, { AlignRow } from "./styles";
import { TicketMenuIActions } from "./TicketMenuIActions";
import { ValidateTicket } from "./ValidateTicket";

export const TicketManager = () => {
  const { update, boat } = useUserContext();
  const [boats, setBoats] = useState<IBoat[]>(boat);
  const [ticket, setTicket] = useState<ITicket>();
  const [openActions, setOpenActions] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showComponent, setShowComponent] = useState<string>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fetching, setFetching] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenActions(true);
  };

  const getDataBoat = useCallback(async () => {
    setFetching(true);
    if (Object.values(compact(boat)).length === 0) {
      const { data } = await userSellerService.BOAT.GET_BOAT();

      await update({ boat: data }, "UPDATE_BOAT");

      setBoats(data);
    } else {
      setBoats(boat);
    }
    setFetching(false);
  }, [boat, update]);

  useEffect(() => {
    getDataBoat();
  }, [getDataBoat, boat]);

  const openDialogWithChildren = (component: string) => {
    const createTicketComponent = <CreateTicket setOpen={setOpenDialog} />;
    const validateTicketComponent = <ValidateTicket setOpen={setOpenDialog} />;

    if (component === "CREATE_TICKET") {
      return createTicketComponent;
    } else if (component === "VALIDATE_TICKET") {
      return validateTicketComponent;
    }

    return <></>;
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <>
      <OpenDialog
        fullScrenn={true}
        setOpen={setOpenDialog}
        open={openDialog}
        children={openDialogWithChildren(showComponent || "")}
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
            <Row className="align-items-center gap">
              <Col>
                <Row>
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                      setShowComponent("CREATE_TICKET");
                      setOpenDialog(true);
                    }}
                  >
                    Adicionar
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Button
                    variant="contained"
                    endIcon={<CheckIcon />}
                    onClick={() => {
                      setShowComponent("VALIDATE_TICKET");
                      setOpenDialog(true);
                    }}
                  >
                    Validar bilhete
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
                    <Td>{convertDateFormatUsToBr(v.dt_output)}</Td>
                    <Td>{convertDateFormatUsToBr(v.dt_arrival)}</Td>
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
