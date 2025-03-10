"use client";
import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  ITrainer,
  TrainerActionContext,
  TrainerStateContext,
} from "./context";
import { TrainerReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getTrainersError,
  getTrainersPending,
  getTrainersSuccess,
  getTrainerError,
  getTrainerPending,
  getTrainerSuccess,
  createTrainerPending,
  createTrainerError,
  updateTrainerSuccess,
  createTrainerSuccess,
  updateTrainerPending,
  updateTrainerError,
  deleteTrainerPending,
  deleteTrainerSuccess,
  deleteTrainerError,
} from "./actions";
import axios from "axios";

export const TrainerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(TrainerReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getTrainers = async () => {
    dispatch(getTrainersPending());
    const endpoint = `https://fakestoreapi.com/Trainers`;
    await axios(endpoint)
      .then((response) => {
        dispatch(getTrainersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getTrainersError());
      });
  };

  const getTrainer = async (id: string) => {
    dispatch(getTrainerPending());
    const endpoint = `/Trainers/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getTrainerSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getTrainerError());
      });
  };

  // const createTrainer = async (trainer: ITrainer) => {
  //   dispatch(createTrainerPending());
  //   const endpoint = `/api/users/register`;
  //   await instance
  //     .post(endpoint, trainer)
  //     .then((response) => {
  //       dispatch(createTrainerSuccess(response.data.data));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       dispatch(createTrainerError());
  //     });
  // };
  const createTrainer = async (Trainer: ITrainer) => {
    dispatch(createTrainerPending());
    const endpoint="https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/register";
    try {
        console.log('Sending Trainer data',Trainer);
        const response=await axios.post(endpoint,Trainer);
        console.log('Response',response.data);
        dispatch(createTrainerSuccess(response.data.data));
    } catch (error) {
        console.error("Error during signup:",error.response?.data.message ||error)
        dispatch(createTrainerError());  
    }
};



  const updateTrainer = async (trainer: ITrainer) => {
    dispatch(updateTrainerPending());
    const endpoint = `/Trainers/${trainer}`;
    await instance
      .put(endpoint, trainer)
      .then((response) => {
        dispatch(updateTrainerSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateTrainerError());
      });
  };

  const deleteTrainer = async (id: string) => {
    dispatch(deleteTrainerPending());
    const endpoint = `https://fakestoreapi.com/Trainers/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteTrainerSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteTrainerError());
      });
  };

  return (
    <TrainerStateContext.Provider value={state}>
      <TrainerActionContext.Provider
        value={{
          getTrainers,
          getTrainer,
          createTrainer,
          updateTrainer,
          deleteTrainer,
        }}
      >
        {children}
      </TrainerActionContext.Provider>
    </TrainerStateContext.Provider>
  );
};

export const useTrainerState = () => {
  const context = useContext(TrainerStateContext);
  if (!context) {
    throw new Error("useTrainerState must be used within a TrainerProvider");
  }
  return context;
};

export const useTrainerActions = () => {
  const context = useContext(TrainerActionContext);
  if (!context) {
    throw new Error("useTrainerActions must be used within a TrainerProvider");
  }
  return context;
};
