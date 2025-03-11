"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, ITrainerStateContext } from "./context";
import { TrainerActionEnums } from "./actions";

export const TrainerReducer = handleActions<
  ITrainerStateContext,
  ITrainerStateContext
>(
  {
    [TrainerActionEnums.getTrainersPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.getTrainersSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.getTrainersError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.getTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.getTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.getTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.createTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.createTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.createTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.updateTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.updateTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.updateTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.deleteTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.deleteTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.deleteTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
