"use client";
import { getAxiosInstance } from "../../utils/axios-instance";

import {
  INITIAL_STATE,
  IFood,
  FoodActionContext,
  FoodStateContext,
} from "./context";
import { FoodReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getAllFoodError,
  getAllFoodPending,
  getAllFoodSuccess,
  getFoodCategoryError,
  getFoodCategoryPending,
  getFoodCategorySuccess,
  createFoodPending,
  createFoodError,
  searchFoodSuccess,
  createFoodSuccess,
  searchFoodPending,
  searchFoodError,
} from "./actions";
import axios from "axios";

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getAllFood = async () => {
    dispatch(getAllFoodPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food/";
    try {
      const token = sessionStorage.getItem("jwt")?.trim();

      if (!token) {
        dispatch(getAllFoodError());
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // console.log("User Data Received:", response.data);
      dispatch(getAllFoodSuccess(response.data.data));
    } catch (error) {
      console.error(
        " Error fetching user details:",
        error.response?.data?.message || error
      );
      dispatch(getAllFoodError());
    }
  };

  const getFoodCategory = async () => {
    dispatch(getFoodCategoryPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food/category/veg";
    try {
      const token = sessionStorage.getItem("jwt")?.trim();

      if (!token) {
        dispatch(getFoodCategoryError());
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
     // console.log(response.data.data);
      // console.log("User Data Received:", response.data);
      dispatch(getFoodCategorySuccess(response.data.data));
    } catch (error) {
      console.error(
        " Error fetching user details:",
        error.response?.data?.message || error
      );
      dispatch(getFoodCategoryError());
    }
  };

  const createFood = async (Food: IFood) => {
    dispatch(createFoodPending());
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/register";
    try {
      console.log("Sending Food data", Food);
      const response = await axios.post(endpoint, Food);
      console.log("Response", response.data);
      dispatch(createFoodSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data.message || error
      );
      dispatch(createFoodError());
      throw error;
    }
  };

  const searchFood = async (Food: IFood) => {
    dispatch(searchFoodPending());
    const endpoint = `/Foods/${Food}`;
    await instance
      .put(endpoint, Food)
      .then((response) => {
        dispatch(searchFoodSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(searchFoodError());
      });
  };

  return (
    <FoodStateContext.Provider value={state}>
      <FoodActionContext.Provider
        value={{
          getAllFood,
          getFoodCategory,
          createFood,
          searchFood,
        }}
      >
        {children}
      </FoodActionContext.Provider>
    </FoodStateContext.Provider>
  );
};

export const useFoodState = () => {
  const context = useContext(FoodStateContext);
  if (!context) {
    throw new Error("useFoodState must be used within a FoodProvider");
  }
  return context;
};

export const useFoodActions = () => {
  const context = useContext(FoodActionContext);
  if (!context) {
    throw new Error("useFoodActions must be used within a FoodProvider");
  }
  return context;
};
