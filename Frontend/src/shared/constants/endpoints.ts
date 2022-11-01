import { api } from "api";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { IUser } from "shared/interfaces/user-interface";

export const ENDPOINT = {
  CREATE_ACCOUNT: (user: IUser) => api.post("/unknow/users", user),
  SEND_PAYMENT_STATUS: (data: IPaymentResponseParams) =>
    api.post("/webhook", data),
};
