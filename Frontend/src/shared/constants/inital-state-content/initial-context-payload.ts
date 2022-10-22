import initialStateUser from "shared/constants/inital-state-content/initial-state-user";
import { IContext } from "shared/interfaces/context.interface";

export const initalContextPayload: IContext = {
  update: () => "",
  user: initialStateUser,
};
