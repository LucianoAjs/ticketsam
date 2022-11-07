import { api } from "api";
import { AxiosResponse } from "axios";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { ICreatePreferenceResponse } from "shared/interfaces/create-preference-response.interface";
import { IGetTicketFilter } from "shared/interfaces/get-ticket-filter.interface";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { IProduct } from "shared/interfaces/product.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { IUser } from "shared/interfaces/user-interface";
import { IViaCepResponse } from "shared/interfaces/via-cep-response..interface";
import { queryToEncodedString } from "shared/utils";

export const ENDPOINT = {
  CREATE_ACCOUNT: (user: IUser) => api.post("/user_seller", user),
  LOGIN: (user: ILoginForm): Promise<AxiosResponse<{ access_token: string }>> =>
    api.post("/auth/login", user),
  SEND_PAYMENT_STATUS: (data: IPaymentResponseParams) =>
    api.post("/webhook", data),
  CREATE_PREFERENCE: (
    ticketId: String,
    data: IProduct
  ): Promise<AxiosResponse<ICreatePreferenceResponse>> =>
    api.post(`/user_buyer/ticket/${ticketId}`, data),
  GET_CEP_DATA: (cep: string): Promise<AxiosResponse<IViaCepResponse>> =>
    api.get(`http://viacep.com.br/ws/${cep}/json/`),
  GET_TICKET: (filter: IGetTicketFilter): Promise<AxiosResponse<ITicket[]>> =>
    api.get(`/user_buyer/ticket/${queryToEncodedString(filter)}`),
  GENERATE_QRCODE: (url: string) =>
    api.post(`/user_buyer/generate_qrcode`, { url }),
  GET_TICKET_BY_ID: (ticketId: string) =>
    api.get(`user_buyer/ticket/${ticketId}`),
};
