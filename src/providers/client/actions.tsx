"use client";
import { IClient, IClientStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum ClientActionEnums {
  // define 3 states for each action (pending , success, error)

  getClientsPending = "GET_ClientS_PENDING",
  getClientsSuccess = "GET_ClientS_SUCCESS",
  getClientsError = "GET_Clients_ERROR",

  getClientPending = "GET_Client_PENDING",
  getClientSuccess = "GET_Client_SUCCESS",
  getClientError = "GET_Client_ERROR",

  createClientPending = "CREATE_Client_PENDING",
  createClientSuccess = "CREATE_Client_SUCCESS",
  createClientError = "CREATE_Client_ERROR",

  signClientInPending = "UPDATE_Client_PENDING",
  signClientInSuccess = "UPDATE_Client_SUCCESS",
  signClientInError = "UPDATE_Client_ERROR",
}

// createAction<PayloadType>(actionType, payloadCreator)

//Get all Clients actions

export const getClientsPending = createAction<IClientStateContext>(
  ClientActionEnums.getClientsPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getClientsSuccess = createAction<IClientStateContext, IClient[]>(
  ClientActionEnums.getClientsSuccess,

  (clients: IClient[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    clients,
  })
);

export const getClientsError = createAction<IClientStateContext>(
  ClientActionEnums.getClientsError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getClientPending = createAction<IClientStateContext>(
  ClientActionEnums.getClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getClientSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.getClientSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const getClientError = createAction<IClientStateContext>(
  ClientActionEnums.getClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createClientPending = createAction<IClientStateContext>(
  ClientActionEnums.createClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createClientSuccess = createAction<IClientStateContext, IClient[]>(
  ClientActionEnums.createClientSuccess,
  (clients: IClient[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    clients,
  })
);

export const createClientError = createAction<IClientStateContext>(
  ClientActionEnums.createClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const signClientInPending = createAction<IClientStateContext>(
  ClientActionEnums.signClientInPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const signClientInSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.signClientInSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const signClientInError = createAction<IClientStateContext>(
  ClientActionEnums.signClientInError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
