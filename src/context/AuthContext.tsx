import { getUserFromLocalStorage, setUserToLocalStorage } from "@utils";
import { Dispatch, createContext, useEffect, useReducer } from "react";
import { UserInfo } from "@types";
import { KEY_STORAGE } from "@utils";
import { useLocalStorage } from "@hooks";

type AuthUserStatus = {
  user?: UserInfo | null;
  loading?: boolean;
  error?: any;
};

type AuthUserAction = {
  type: "LOGIN_START" | "LOGOUT" | "LOGIN_SUCCESS" | "LOGIN_FAILURE";
  payload: AuthUserStatus;
};

type AuthContext = {
  state: AuthUserStatus;
  dispatch?: Dispatch<AuthUserAction>; // "?" important for ts check
};

// const userInit = getUserFromLocalStorage(KEY_STORAGE);

const initialState: AuthUserStatus = {
  user: null,
  loading: false,
  error: null,
};

const initialContext: AuthContext = {
  state: initialState,
};
export const AuthContext = createContext(initialContext);

type props = {
  children?: JSX.Element | JSX.Element[];
};
export const AuthContextProvider = ({ children }: props) => {
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage<UserInfo>(
    KEY_STORAGE,
    {} as UserInfo
  );
  initialState.user = userLocalStorage;

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  function AuthReducer(state: AuthUserStatus, action: AuthUserAction) {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          loading: true,
          error: null,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload.user,
          loading: false,
          error: null,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          loading: false,
          error: action.payload.error,
        };
      case "LOGOUT":
        return {
          user: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    if (state.user) setUserLocalStorage(state.user);
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};