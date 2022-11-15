export interface ICreateTicket {
  accommodation_name: string;
  destination_city: string;
  home_city: string;
  dt_arrival: Date | string;
  dt_output: Date | string;
  boat_name: string;
  boat_phone: string;
  image_url: string;
  remaining_quantity: number;
  food_value: number;
  transport_value: number;
}
