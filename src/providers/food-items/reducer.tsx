"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IFoodStateContext } from "./context";
import { FoodActionEnums } from "./actions";

export const FoodReducer = handleActions<IFoodStateContext, IFoodStateContext>(
  {
    [FoodActionEnums.getFoodCategoryPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodCategorySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodCategoryError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getAllFoodPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getAllFoodSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getAllFoodError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.createFoodPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.createFoodSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.createFoodError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.searchFoodPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.searchFoodSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.searchFoodError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
