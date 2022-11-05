export interface IGetTicketFilter {
  destination_city: string;
  home_city: string;
  dt_arrival: Date | string;
  dt_output: Date | string;
}
