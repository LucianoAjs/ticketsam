import { IAddress } from "shared/interfaces/user-interface/nested/address.interface";

export interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  cpf: string;
  phoneNumber?: number;
  birthdate?: Date | undefined;
  gender?: string;
  address?: IAddress;
}
