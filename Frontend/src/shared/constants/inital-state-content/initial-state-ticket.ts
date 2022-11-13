import { ITicket } from "shared/interfaces/ticket.interface";

export const initialStateTicket: ITicket[] = [
  {
    id: "",
    accommodation_name: "",
    destination_city: "",
    home_city: "",
    dt_arrival: new Date(),
    dt_modification: new Date(),
    dt_record: new Date(),
    dt_output: new Date(),
    boat_name: "",
    boat_phone: "",
    image_url: "",
    remaining_quantity: 0,
    food_value: 0,
    transport_value: 0,
  },
];
