import { ITrainer, ITrainerStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum TrainerActionEnums {
  // define 3 states for each action (pending , success, error)

  getTrainersPending = "GET_TrainerS_PENDING",
  getTrainersSuccess = "GET_TrainerS_SUCCESS",
  getTrainersError = "GET_Trainers_ERROR",

  getTrainerPending = "GET_Trainer_PENDING",
  getTrainerSuccess = "GET_Trainer_SUCCESS",
  getTrainerError = "GET_Trainer_ERROR",

  createTrainerPending = "CREATE_Trainer_PENDING",
  createTrainerSuccess = "CREATE_Trainer_SUCCESS",
  createTrainerError = "CREATE_Trainer_ERROR",

  updateTrainerPending = "UPDATE_Trainer_PENDING",
  updateTrainerSuccess = "UPDATE_Trainer_SUCCESS",
  updateTrainerError = "UPDATE_Trainer_ERROR",

  deleteTrainerPending = "DELETE_Trainer_PENDING",
  deleteTrainerSuccess = "DELETE_Trainer_SUCCESS",
  deleteTrainerError = "DELETE_Trainer_ERROR",
}

// createAction<PayloadType>(actionType, payloadCreator)

//Get all Trainers actions

export const getTrainersPending = createAction<ITrainerStateContext>(
  TrainerActionEnums.getTrainersPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getTrainersSuccess = createAction<
  ITrainerStateContext,
  ITrainer[]
>(
  TrainerActionEnums.getTrainersSuccess,

  (trainers: ITrainer[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    trainers,
  })
);

export const getTrainersError = createAction<ITrainerStateContext>(
  TrainerActionEnums.getTrainersError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getTrainerPending = createAction<ITrainerStateContext>(
  TrainerActionEnums.getTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getTrainerSuccess = createAction<ITrainerStateContext, ITrainer>(
  TrainerActionEnums.getTrainerSuccess,
  (Trainer: ITrainer) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Trainer,
  })
);

export const getTrainerError = createAction<ITrainerStateContext>(
  TrainerActionEnums.getTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createTrainerPending = createAction<ITrainerStateContext>(
  TrainerActionEnums.createTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createTrainerSuccess = createAction<
  ITrainerStateContext,
  ITrainer[]
>(TrainerActionEnums.createTrainerSuccess, (trainers: ITrainer[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  trainers,
}));

export const createTrainerError = createAction<ITrainerStateContext>(
  TrainerActionEnums.createTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateTrainerPending = createAction<ITrainerStateContext>(
  TrainerActionEnums.updateTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateTrainerSuccess = createAction<
  ITrainerStateContext,
  ITrainer
>(TrainerActionEnums.updateTrainerSuccess, (trainer: ITrainer) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  trainer,
}));

export const updateTrainerError = createAction<ITrainerStateContext>(
  TrainerActionEnums.updateTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteTrainerPending = createAction<ITrainerStateContext>(
  TrainerActionEnums.deleteTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteTrainerSuccess = createAction<
  ITrainerStateContext,
  ITrainer
>(TrainerActionEnums.deleteTrainerSuccess, (trainer: ITrainer) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  trainer,
}));

export const deleteTrainerError = createAction<ITrainerStateContext>(
  TrainerActionEnums.deleteTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
