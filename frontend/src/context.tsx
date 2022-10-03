import React, { createContext, useContext, useReducer } from "react";
import {
  ActionInterface,
  initialState,
  InitialStateInterface,
  reducer,
} from "./reducer";

import { toast } from "react-toastify";
import produce from "immer";
import axios from "axios";

interface AppContextInterface {
  setAlert(type: "success" | "error", message: string): void;
  state: InitialStateInterface;
  dispatch(arg0: ActionInterface): void;
  login(username: string, password: string): void;
  register(
    username: string,
    email: string,
    password: string,
    password2: string
  ): void;
  loadUser(): void;
}

const AppContext = createContext<AppContextInterface>({
  dispatch: () => null,
  setAlert: () => null,
  login: () => null,
  register: () => null,
  loadUser: () => null,
  state: initialState,
});

// Provider in your app

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(produce(reducer), initialState);

  const setAlert: AppContextInterface["setAlert"] = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
    }
  };

  const loadUser: AppContextInterface["loadUser"] =
    React.useCallback(async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = "JWT " + token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          dispatch({ type: "CLEAR_USER" });
        }
        const response = await axios.get("/auth/users/me/");
        dispatch({ type: "SET_USER", payload: response.data });
      } catch (error) {
        dispatch({ type: "CLEAR_USER" });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    }, []);

  const login: AppContextInterface["login"] = async (username, password) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ username, password });
    try {
      const response = await axios.post("auth/jwt/create/", body, config);
      localStorage.setItem("token", response.data.access);
      window.location.href = "/";
      setAlert("success", "Logged in!");
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
      setAlert("error", "Login fail");
    }
  };

  const register: AppContextInterface["register"] = async (
    username,
    email,
    password,
    password2
  ) => {
    if (password !== password2) {
      return setAlert("error", "Passwords do not match!");
    }
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      username,
      email,
      password,
      re_password: password2,
    });
    try {
      await axios.post("/auth/users/", body, config);

      login(username, password);
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
      setAlert("error", "Error registering");
    }
  };

  const AppContextValue: AppContextInterface = {
    state,
    dispatch,
    setAlert,
    login,
    register,
    loadUser,
  };
  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextInterface => {
  return useContext(AppContext);
};
