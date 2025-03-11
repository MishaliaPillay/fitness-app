"use client";
//import { getAxiosInstance } from "../../utils/axios-instance;
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
  // const instance = getAxiosInstance();

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

  const getFoodCategory = async (category: string) => {
    dispatch(getFoodCategoryPending());

    // Build the API endpoint dynamically based on the category selected
    const endpoint =
      category === "all"
        ? "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food/" // or use an endpoint for all categories
        : `https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food/category/${category}`;
    console.log(endpoint);
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

      dispatch(getFoodCategorySuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error fetching food category details:",
        error.response?.data?.message || error
      );
      dispatch(getFoodCategoryError());
    }
  };

  // To serialize the data

  const createFood = async (Food: IFood) => {
    dispatch(createFoodPending());

    const token = sessionStorage.getItem("jwt"); // Or however you retrieve your token
    const endpoint =
      "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food";

    try {
      // Prepare the body as x-www-form-urlencoded data

      const response = await axios.post(endpoint, Food, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `${token}`, // Attach the token for auth
        },
      });

      console.log("Response", response.data);
      dispatch(createFoodSuccess(response.data.data));
    } catch (error) {
      console.error(
        "Error during creating food item:",
        error.response?.data.message || error
      );
      dispatch(createFoodError());
      throw error;
    }
  };

  const searchFood = async (term: string) => {
    dispatch(searchFoodPending());
    const endpoint = `https://body-vault-server-b9ede5286d4c.herokuapp.com/api/food/search/${term}`;

    try {
      console.log(endpoint);
      const token = sessionStorage.getItem("jwt")?.trim();
      if (!token) {
        dispatch(searchFoodError());
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      dispatch(searchFoodSuccess(response.data.data));
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching food details:",
        error.response?.data?.message || error
      );
      dispatch(searchFoodError());
      return [];
    }
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
