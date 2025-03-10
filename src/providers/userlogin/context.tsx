"use client";
import { createContext } from "react";

// make a Userobject

export interface IUser {
  email: string;
  password: string;
}

//make a shape for the context

export interface IUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
  users?: IUser[]; // Array of Users
}

//define the actions that will be performed on Users

export interface IUserActionContext {
  getUsers: () => void;
  getUser: (user: IUser) => void;
  createUser: (user: IUser) => void;
}

export interface ILoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

//initial state with default  values
export const INITIAL_STATE: IUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

//create the state context and the action context
export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);

export const UserActionContext = createContext<IUserActionContext>(undefined);
