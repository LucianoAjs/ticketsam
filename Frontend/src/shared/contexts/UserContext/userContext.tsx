import { createContext, useContext, useReducer } from "react";
import { initalContextPayload } from "shared/constants/inital-state-content/initial-context-payload";
import { userReducer } from "shared/contexts/UserContext/userReducer";
import { IContext } from "shared/interfaces/context.interface";

export const UserContext = createContext(initalContextPayload);

export const UserProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(userReducer, initalContextPayload);

  const update = (payload: IContext) => {
    dispatch({
      type: "UPDATE",
      payload,
    });
  };

  return (
    <UserContext.Provider value={{ ...state, update }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUnknown must be used within UnknownContext");
  }

  return context;
};

export default useUserContext;
