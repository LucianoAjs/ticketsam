import { ITicket } from "./ticket.interface";

export interface IBoat {
  IMO: number;
  name: string;
  subscription: number;
  flag: string;
  status: {
    status: string;
  };
  ticket: ITicket[];
}
