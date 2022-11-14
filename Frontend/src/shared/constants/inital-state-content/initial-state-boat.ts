import { IBoat } from "shared/interfaces/boat.interface";
import { initialStateTicket } from "./initial-state-ticket";

export const initialStateBoat: IBoat[] = [
  {
    cnpj: "",
    IMO: 0,
    name: "",
    subscription: 0,
    flag: "",
    status: {
      status: "",
    },
    ticket: initialStateTicket,
  },
];
