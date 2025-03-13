"use client";
import { createContext } from "react";

// Client registration interface
export interface IClientRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
}

// Client interface
export interface IClient {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState?: boolean;
  trainerId: string;
}

// Context shape
export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  client?: IClient;
  clients?: IClient[]; // Array of Clients
}

// Actions that will be performed on Clients
export interface IClientActionContext {
  getClients: () => void;
  getClient: () => void;
  createClient: (client: IClient) => void;
  registerClient: (client: IClientRegistration) => Promise<void>;
}

// Initial state with default values
export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create the state context and the action context
export const ClientStateContext =
  createContext<IClientStateContext>(INITIAL_STATE);

export const ClientActionContext =
  createContext<IClientActionContext>(undefined);
