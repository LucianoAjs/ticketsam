import { SearchTicket } from "pages/Home/SearchTicket";
import { useState } from "react";
import { ITicket } from "shared/interfaces/ticket.interface";
import Container, { AlignColumn } from "./styles";
import { Ticket } from "./Ticket";

export const Home = () => {
  const [tickets, setTickets] = useState<ITicket[]>();

  return (
    <Container>
      <SearchTicket setTickets={setTickets} />
      <AlignColumn>
        {tickets &&
          tickets
            ?.filter((v) => v.remaining_quantity > 0)
            .map((value: ITicket) => <Ticket ticket={value} />)}
      </AlignColumn>
    </Container>
  );
};
