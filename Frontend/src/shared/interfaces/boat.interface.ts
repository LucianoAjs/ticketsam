import { ITicket } from "./ticket.interface";

export interface IBoat {
  cnpj: string;
  IMO: number;
  name: string;
  subscription: number;
  flag: string;
  status: {
    status: string;
  };
  ticket: ITicket[];
}
