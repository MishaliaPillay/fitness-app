"use client";
import { createContext } from "react";

// make a Client object

export interface IClient {
  fullName: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState?: boolean;
  trainerId: string;
}

//make a shape for the context

export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  client?: IClient;
  clients?: IClient[]; // Array of Clients
}

//define the actions that will be performed on Clients

export interface IClientActionContext {
  getClients: () => void;
  getClient: () => void;
  createClient: (client: IClient) => void;
  registerClient: (client: IClient) => void;
}

//initial state with default  values
export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

//create the state context and the action context
export const ClientStateContext =
  createContext<IClientStateContext>(INITIAL_STATE);

export const ClientActionContext =
  createContext<IClientActionContext>(undefined);
