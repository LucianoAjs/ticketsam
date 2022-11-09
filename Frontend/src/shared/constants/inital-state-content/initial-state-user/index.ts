import { IUser } from "shared/interfaces/user-interface";
import { initStateAddress } from "./inital-state-nested/initial-state-address";

const initialStateUser: IUser = {
  email: "",
  password: "",
  firstName: "Luciano",
  lastName: "Anjos",
  cpf: "",
  phoneNumber: 0,
  birthdate: "",
  gender: "",
  address: initStateAddress,
};

export default initialStateUser;
