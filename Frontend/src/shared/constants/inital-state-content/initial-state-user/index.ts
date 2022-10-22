import { IUser } from "shared/interfaces/user-interface";
import { initStateAddress } from "./inital-state-nested/initial-state-address";

const initialStateUser: IUser = {
  email: "",
  firstName: "",
  lastName: "",
  cpf: "",
  phoneNumber: 0,
  birthdate: undefined,
  gender: "",
  address: initStateAddress,
};

export default initialStateUser;
