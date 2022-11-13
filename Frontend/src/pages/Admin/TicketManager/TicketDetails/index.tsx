import { ITicket } from "shared/interfaces/ticket.interface";
import { Text5, Text6 } from "styles/app-styles";
import Container, { AlignColumn } from "./styles";
export const TicketDetails = ({ ticket }: { ticket?: ITicket }) => {
  if (!ticket) {
    return <></>;
  }

  const {
    boat_name,
    boat_phone,
    accommodation_name,
    food_value,
    transport_value,
    remaining_quantity,
  } = ticket;

  return (
    <Container>
      <AlignColumn>
        <Text5>Nome do barco:</Text5>
        <Text6>{boat_name}</Text6>
      </AlignColumn>
      <AlignColumn>
        <Text5>Numero do barco:</Text5>
        <Text6>{boat_phone}</Text6>
      </AlignColumn>
      <AlignColumn>
        <Text5>Nome da acomodação:</Text5>
        <Text6>{accommodation_name}</Text6>
      </AlignColumn>
      <AlignColumn>
        <Text5>Valor da comida:</Text5>
        <Text6>{food_value}</Text6>
      </AlignColumn>
      <AlignColumn>
        <Text5>Valor do transporte:</Text5>
        <Text6>{transport_value}</Text6>
      </AlignColumn>
      <AlignColumn>
        <Text5>Quantidade de passagens restantes:</Text5>
        <Text6>{remaining_quantity}</Text6>
      </AlignColumn>
    </Container>
  );
};
