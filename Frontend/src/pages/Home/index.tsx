import { SearchTicket } from "pages/Home/SearchTicket";
import { useState } from "react";
import { ITicket } from "shared/interfaces/ticket.interface";
import { AlignColumn, Main } from "./styles";
import { Ticket } from "./Ticket";

export const Home = () => {
  const [tickets, setTickets] = useState<ITicket[]>();

  return (
    <>
      <Main>
        <SearchTicket setTickets={setTickets} />
        <AlignColumn>
          {tickets &&
            tickets?.map((value: ITicket) => <Ticket ticket={value} />)}{" "}
        </AlignColumn>
      </Main>
    </>
  );
};
