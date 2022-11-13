import { IPayment } from "./payment.interface";

export interface ITicket {
  id: string;
  accommodation_name: string;
  destination_city: string;
  home_city: string;
  dt_arrival: Date;
  dt_modification: Date;
  dt_record: Date;
  dt_output: Date;
  boat_name: string;
  boat_phone: string;
  image_url: string;
  remaining_quantity: number;
  food_value: number;
  transport_value: number;
  payment?: IPayment[];
}
