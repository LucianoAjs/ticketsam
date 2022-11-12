import { IUser } from "shared/interfaces/user-interface";
import { initStateAddress } from "./inital-state-nested/initial-state-address";

export const initialStateUser: IUser = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  cpf: "",
  phoneNumber: "",
  birthdate: "",
  gender: "",
  address: initStateAddress,
};
