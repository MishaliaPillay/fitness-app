"use client";
import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  IUser,
  UserActionContext,
  UserStateContext,
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
  const instance = getAxiosInstance();

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

  const getUser = async (id: string) => {
    dispatch(getUserPending());
    const endpoint = `/Users/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getUserSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getUserError());
      });
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
