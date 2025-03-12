"use client";
import { IMealPlan, IMealPlanStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum MealActionEnums {
  // define 3 states for each action (pending , success, error)

  getMealPlanPending = "GET_MealS_PENDING",
  getMealPlanSuccess = "GET_MealS_SUCCESS",
  getMealPlanError = "GET_Meals_ERROR",

  getMealClientPending = "GET_Meal_PENDING",
  getMealClientSuccess = "GET_Meal_SUCCESS",
  getMealClientError = "GET_Meal_ERROR",

  createMealPlanPending = "CREATE_Meal_PENDING",
  createMealPlanSuccess = "CREATE_Meal_SUCCESS",
  createMealPlanError = "CREATE_Meal_ERROR",

  getMealTrainerPending = "GET_MealTrainer_PENDING",
  getMealTrainerSuccess = "GET_MealTrainer_SUCCESS",
  getMealTrainerError = "GET_MealTrainer_ERROR",
}

// createAction<PayloadType>(actionType, payloadCreator)

//Get all Meals actions

export const getMealPlanPending = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealPlanPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getMealPlanSuccess = createAction<
  IMealPlanStateContext,
  IMealPlan[]
>(
  MealActionEnums.getMealPlanSuccess,

  (meals: IMealPlan[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    meals,
  })
);

export const getMealPlanError = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealPlanError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getMealClientPending = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getMealClientSuccess = createAction<
  IMealPlanStateContext,
  IMealPlan
>(MealActionEnums.getMealClientSuccess, (meal: IMealPlan) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  meal,
}));

export const getMealClientError = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createMealPlanPending = createAction<IMealPlanStateContext>(
  MealActionEnums.createMealPlanPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createMealPlanSuccess = createAction<
  IMealPlanStateContext,
  IMealPlan[]
>(MealActionEnums.createMealPlanSuccess, (meals: IMealPlan[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  meals,
}));

export const createMealPlanError = createAction<IMealPlanStateContext>(
  MealActionEnums.createMealPlanError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getMealTrainerPending = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getMealTrainerSuccess = createAction<
  IMealPlanStateContext,
  IMealPlan
>(MealActionEnums.getMealTrainerSuccess, (meal: IMealPlan) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  meal,
}));

export const getMealTrainerError = createAction<IMealPlanStateContext>(
  MealActionEnums.getMealTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
