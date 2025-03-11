"use client";
import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  IClient,
  ClientActionContext,
  ClientStateContext,
} from "./context";
import { ClientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getClientsError,
  getClientsPending,
  getClientsSuccess,
  getClientError,
  getClientPending,
  getClientSuccess,
  createClientPending,
  createClientError,
  registerClientSuccess,
  createClientSuccess,
  registerClientPending,
  registerClientError,
} from "./actions";
import axios from "axios";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getClients = async () => {
    dispatch(getClientsPending());
    const endpoint = `https://fakestoreapi.com/Clients`;
    await axios(endpoint)
      .then((response) => {
        dispatch(getClientsSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getClientsError());
      });
  };

  const getClient = async () => {
    dispatch(getClientPending());
    const endpoint = `/Clients/`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getClientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getClientError());
      });
  };

  const createClient = async (client: IClient) => {
    dispatch(createClientPending());

    const token = sessionStorage.getItem("jwt");

    if (!token) {
      dispatch(createClientError());
      return;
    }

    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/client";

    try {
      console.log(client);
      const response = await axios.post(endpoint, client, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("somethingnot");
      console.log("Sending Trainer data", client);
      dispatch(createClientSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data.message || error
      );
      dispatch(createClientError());
    }
  };

  const registerClient = async (client: IClient) => {
    dispatch(registerClientPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/register/mobile";

    try {
      console.log("Sending Trainer data", client);
      const response = await axios.post(endpoint, client);
      console.log("Response", response.data);
      dispatch(registerClientSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data.message || error
      );
      dispatch(registerClientError());
      throw error;
    }
  };

  return (
    <ClientStateContext.Provider value={state}>
      <ClientActionContext.Provider
        value={{
          getClients,
          getClient,
          createClient,
          registerClient,
        }}
      >
        {children}
      </ClientActionContext.Provider>
    </ClientStateContext.Provider>
  );
};

export const useClientState = () => {
  const context = useContext(ClientStateContext);
  if (!context) {
    throw new Error("useClientState must be used within a ClientProvider");
  }
  return context;
};

export const useClientActions = () => {
  const context = useContext(ClientActionContext);
  if (!context) {
    throw new Error("useClientActions must be used within a ClientProvider");
  }
  return context;
};
