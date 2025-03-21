"use client";
import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  IMealPlan,
  MealPlanActionContext,
  MealPlanStateContext,
} from "./context";
import { MealReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getMealPlanError,
  getMealPlanPending,
  getMealPlanSuccess,
  getMealTrainerError,
  getMealTrainerPending,
  getMealTrainerSuccess,
  createMealPlanPending,
  createMealPlanError,
  getMealClientSuccess,
  createMealPlanSuccess,
  getMealClientPending,
  getMealClientError,
} from "./actions";
import axios from "axios";

export const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(MealReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getMealPlan = async () => {
    dispatch(getMealPlanPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/mealplan/601818097d1810001c5ea2dd";

    try {
      const token = sessionStorage.getItem("jwt")?.trim();

      if (!token) {
        dispatch(getMealPlanError());
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data.data);
      dispatch(getMealPlanSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error fetching client details:",
        error.response?.data?.message || error
      );
      dispatch(getMealPlanError());
    }
  };

  const getMealPlanTrainer = async () => {
    dispatch(getMealTrainerPending());
    const endpoint = `/Trainers`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getMealTrainerSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getMealTrainerError());
      });
  };

  const createMealPlan = async (mealPlan: IMealPlan) => {
    dispatch(createMealPlanPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/mealplan";

    try {
      const token = sessionStorage.getItem("jwt");

      if (!token) {
        dispatch(createMealPlanError());
        return;
      }

      const response = await axios.post(endpoint, mealPlan, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data.data);
      dispatch(createMealPlanSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error fetching client details:",
        error.response?.data?.message || error
      );
      dispatch(createMealPlanError());
    }
  };

  const getMealPlanClient = async () => {
    dispatch(getMealClientPending());
    const endpoint = `/Trainers`;
    await instance
      .put(endpoint)
      .then((response) => {
        dispatch(getMealClientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getMealClientError());
      });
  };

  return (
    <MealPlanStateContext.Provider value={state}>
      <MealPlanActionContext.Provider
        value={{
          getMealPlan,
          getMealPlanTrainer,
          createMealPlan,
          getMealPlanClient,
        }}
      >
        {children}
      </MealPlanActionContext.Provider>
    </MealPlanStateContext.Provider>
  );
};

export const useMealState = () => {
  const context = useContext(MealPlanStateContext);
  if (!context) {
    throw new Error("useMealState must be used within a MealProvider");
  }
  return context;
};

export const useMealActions = () => {
  const context = useContext(MealPlanActionContext);
  if (!context) {
    throw new Error("useMealActions must be used within a MealProvider");
  }
  return context;
};
