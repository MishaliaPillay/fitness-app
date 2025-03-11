"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientStateContext } from "./context";
import { ClientActionEnums } from "./actions";

export const ClientReducer = handleActions<
  IClientStateContext,
  IClientStateContext
>(
  {
    [ClientActionEnums.getClientsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.registerClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.registerClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.registerClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
