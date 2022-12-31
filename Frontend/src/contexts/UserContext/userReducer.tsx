import _ from "lodash";
import { IContext } from "shared/interfaces/context.interface";

interface IAction {
  type: string;
  payload: IContext;
}

export const userReducer = (state: IContext, action: IAction) => {
  const { type, payload } = action;

  if (type === "UPDATE") {
    return _.merge(state, payload);
  }
  if (type === "UPDATE_BOAT") {
    state.boat = payload.boat;
    return _.merge(state, payload);
  } else {
    throw new Error(`No case for type ${type} found in unknownReducer.`);
  }
};
