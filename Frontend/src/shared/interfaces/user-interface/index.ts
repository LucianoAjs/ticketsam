import { IAddress } from "shared/interfaces/user-interface/nested/address.interface";

export interface IUser {
  id?: string;
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf?: string;
  phoneNumber: string;
  birthdate: string | Date;
  gender?: string;
  address: IAddress;
  DocumentType?: string;
  updatedAt?: string;
  createdAt?: string;
}
