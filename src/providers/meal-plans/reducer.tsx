"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IMealPlanActionContext } from "./context";
import { MealActionEnums } from "./actions";

export const MealReducer = handleActions<
  IMealPlanActionContext,
  IMealPlanActionContext
>(
  {
    [MealActionEnums.getMealPlanPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealPlanSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealPlanError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.createMealPlanPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.createMealPlanSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.createMealPlanError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [MealActionEnums.getMealClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
