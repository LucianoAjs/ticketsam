import { AxiosResponse } from "axios";
import { api } from "services/api";
import { ICreatePreferenceResponse } from "shared/interfaces/create-preference-response.interface";
import { IGetTicketFilter } from "shared/interfaces/get-ticket-filter.interface";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { IProduct } from "shared/interfaces/product.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { queryToEncodedString } from "shared/utils";

export const userBuyerService = {
  TICKET: {
    CREATE_PREFERENCE: (
      ticketId: String,
      data: IProduct
    ): Promise<AxiosResponse<ICreatePreferenceResponse>> =>
      api.post(`/user-buyer/ticket/${ticketId}`, data),
    GET_TICKET: (filter: IGetTicketFilter): Promise<AxiosResponse<ITicket[]>> =>
      api.get(`/user-buyer/ticket/${queryToEncodedString(filter)}`),
    GET_TICKET_BY_ID: (ticketId: string) =>
      api.get(`user-buyer/ticket/${ticketId}`),
  },
  GENERATE_QRCODE: (url: string) =>
    api.post(`/user-buyer/generate-qrcode`, { url }),
  GET_PLACE_NAMES: (): Promise<AxiosResponse<string[]>> =>
    api.get("/user-buyer/states"),
  SEND_PAYMENT_STATUS: (data: IPaymentResponseParams) =>
    api.post("/webhook", data),
};
