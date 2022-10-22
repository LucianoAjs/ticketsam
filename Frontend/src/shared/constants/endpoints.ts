import { api } from "api";
import { IUser } from "shared/interfaces/user-interface";

export const ENDPOINT = {
  CREATE_ACCOUNT: (user: IUser) => api.post("/unknow/users", user),
};
