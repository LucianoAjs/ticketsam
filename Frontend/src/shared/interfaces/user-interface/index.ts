import { IAddress } from "shared/interfaces/user-interface/nested/address.interface";

export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  cpf: string;
  phoneNumber: number;
  birthdate: string;
  gender?: string;
  address: IAddress;
}
