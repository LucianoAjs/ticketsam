import { api } from "api";
import { AxiosResponse } from "axios";
import { ICreatePreferenceResponse } from "shared/interfaces/create-preference-response.interface";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { IProduct } from "shared/interfaces/product.interface";
import { IUser } from "shared/interfaces/user-interface";

export const ENDPOINT = {
  CREATE_ACCOUNT: (user: IUser) => api.post("/unknow/users", user),
  SEND_PAYMENT_STATUS: (data: IPaymentResponseParams) =>
    api.post("/webhook", data),
  CREATE_PREFERENCE: (
    ticketId: String,
    data: IProduct
  ): Promise<AxiosResponse<ICreatePreferenceResponse>> =>
    api.post(`/user_buyer/ticket/${ticketId}`, data),
};
