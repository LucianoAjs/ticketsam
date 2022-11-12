import {
  initialStateBoat,
  initialStateUser,
} from "shared/constants/inital-state-content";
import { IContext } from "shared/interfaces/context.interface";

export const initalContextPayload: IContext = {
  update: () => "",
  user: initialStateUser,
  boat: initialStateBoat,
};
