"use client";
//import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  IUser,
  UserActionContext,
  UserStateContext,
  ILoginResponse,
} from "./context";
import { UserReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getUsersError,
  getUsersPending,
  getUsersSuccess,
  getUserError,
  getUserPending,
  getUserSuccess,
  createUserPending,
  createUserError,
  createUserSuccess,
} from "./action";
import axios from "axios";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  // const instance = getAxiosInstance();

  const getUsers = async () => {
    dispatch(getUsersPending());
    const endpoint = `https://fakestoreapi.com/Users`;
    await axios(endpoint)
      .then((response) => {
        dispatch(getUsersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getUsersError());
      });
  };

  const getUser = async (user: IUser) => {
    dispatch(getUserPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/login";
    try {
      console.log("getting User data", user);
      const response = await axios.post<ILoginResponse>(endpoint, user);
      console.log("Response", response.data);
      const token = response.data.data.token;
      if (token) {
        console.log("session This where token stored");
        sessionStorage.setItem("jwt", token);
      } else {
        console.error("token not received");
      }
      //dispatch(getUserSuccess(response.data.data));
      dispatch(getUserSuccess(response.data));
      console.log(response);
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error
      );
      dispatch(getUserError());
    }
  };

  const createUser = async (user: IUser) => {
    dispatch(createUserPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/register";
    try {
      console.log("Sending User data", user);
      const response = await axios.post(endpoint, user);
      console.log("Response", response.data);
      dispatch(createUserSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data.message || error
      );
      dispatch(createUserError());
    }
  };

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider
        value={{
          getUsers,
          getUser,
          createUser,
        }}
      >
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserActions = () => {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error("useUserActions must be used within a UserProvider");
  }
  return context;
};
