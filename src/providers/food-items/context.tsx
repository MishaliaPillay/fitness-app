"use client";
import { createContext } from "react";

// make a Food object

export interface IFood {
  id: string;
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
  date?: string;
}
//make a shape for the context

export interface IFoodStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  food?: IFood;
  foods?: IFood[]; // Array of Foods
}

//define the actions that will be performed on Foods

export interface IFoodActionContext {
  getAllFood: () => void;
  getFoodCategory: (category: string) => void;
  createFood: (food: IFood) => void;
  searchFood: (name: string) => Promise<IFood[]>;
}

//initial state with default  values
export const INITIAL_STATE: IFoodStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

//create the state context and the action context
export const FoodStateContext = createContext<IFoodStateContext>(INITIAL_STATE);

export const FoodActionContext = createContext<IFoodActionContext>(undefined);
