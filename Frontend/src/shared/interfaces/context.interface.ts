import { IBoat } from "shared/interfaces/boat.interface";
import { IUser } from "shared/interfaces/user-interface";

export interface IContext {
  update: Function;
  user: IUser;
  boat: IBoat[];
}
