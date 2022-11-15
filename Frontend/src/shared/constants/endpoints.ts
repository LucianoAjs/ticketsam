import { api } from "api";
import { AxiosResponse } from "axios";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { IBoat } from "shared/interfaces/boat.interface";
import { ICreateBoat } from "shared/interfaces/create-boat.interface";
import { ICreatePreferenceResponse } from "shared/interfaces/create-preference-response.interface";
import { ICreateTicket } from "shared/interfaces/create-ticket.interface";
import { IGetTicketFilter } from "shared/interfaces/get-ticket-filter.interface";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { IProduct } from "shared/interfaces/product.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { IUser } from "shared/interfaces/user-interface";
import { IViaCepResponse } from "shared/interfaces/via-cep-response..interface";
import { queryToEncodedString } from "shared/utils";

export const ENDPOINT = {
  CREATE_USER: (user: Partial<IUser>) => api.post("/user_seller", user),
  UPDATE_USER: (user: Partial<IUser>) => api.put("/user_seller", user),
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
  GET_PAYMENT_STATUS: (paymentId: string): Promise<AxiosResponse<any>> =>
    api.get(`user_seller/payment/status/?paymentId=${paymentId}`),
  GET_USER_INFORMATION: (): Promise<AxiosResponse<IUser>> =>
    api.get("user_seller"),
  GET_BOAT: (): Promise<AxiosResponse<IBoat[]>> => api.get("/user_seller/boat"),
  CREATE_BOAT: (data: ICreateBoat): Promise<AxiosResponse<IBoat>> =>
    api.post("/user_seller/boat", data),
  CREATE_TICKET: (
    boatId: string,
    data: ICreateTicket
  ): Promise<AxiosResponse<ITicket>> =>
    api.post(`/user_seller/boat/${boatId}/ticket`, data),
};
