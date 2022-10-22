import { IUser } from "shared/interfaces/user-interface";

export interface IContext {
  update: Function;
  user: IUser;
}
