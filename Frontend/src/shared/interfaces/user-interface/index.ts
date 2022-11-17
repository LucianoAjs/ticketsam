import { IAddress } from "shared/interfaces/user-interface/nested/address.interface";
import { IBoat } from "../boat.interface";

export interface IUser {
  id?: string;
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf?: string;
  phoneNumber: string;
  birthdate: string;
  gender?: string;
  address: IAddress;
  DocumentType?: string;
  boat?: IBoat[];
  updatedAt?: string;
  createdAt?: string;
}
