import { AxiosResponse } from "axios";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { IBoat } from "shared/interfaces/boat.interface";
import { ICreateBoat } from "shared/interfaces/create-boat.interface";
import { ICreateTicket } from "shared/interfaces/create-ticket.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { IUser } from "shared/interfaces/user-interface";
import { queryToEncodedString } from "shared/utils";
import { api } from "./api";

export const userSellerService = {
  AUTH: {
    LOGIN: (
      user: ILoginForm
    ): Promise<AxiosResponse<{ access_token: string }>> =>
      api.post("/auth/login", user),
  },
  USER: {
    CREATE_USER: (user: Partial<IUser>) => api.post("/user_seller", user),
    UPDATE_USER: (user: Partial<IUser>) => api.put("/user_seller", user),
    GET_USER_INFORMATION: (): Promise<AxiosResponse<IUser>> =>
      api.get("user_seller"),
  },
  PAYMENT: {
    GET_PAYMENT_STATUS: (paymentId: string): Promise<AxiosResponse<any>> =>
      api.get(`user_seller/payment/status/?paymentId=${paymentId}`),
  },
  TICKET: {
    CREATE_TICKET: (
      boatId: string,
      data: ICreateTicket
    ): Promise<AxiosResponse<ITicket>> =>
      api.post(`/user_seller/boat/${boatId}/ticket`, data),
    VALIDATE_TICKET: (ticketId: string, paymentId: string) =>
      api.post(
        `/user_seller/ticket/validate${queryToEncodedString({
          ticketId,
          paymentId,
        })}`
      ),
  },
  BOAT: {
    CREATE_BOAT: (data: ICreateBoat): Promise<AxiosResponse<IBoat>> =>
      api.post("/user_seller/boat", data),
    GET_BOAT: (): Promise<AxiosResponse<IBoat[]>> =>
      api.get("/user_seller/boat"),
  },
};
