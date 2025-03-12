"use client";
import { createContext } from "react";

// make a MealPlan object

export interface IMealPlan {
  name: string;
  clientId: string;
  trainerId: string;
  clientName: string;
  descrption: string;
  notes: string;
  clientNotes: [];
  meals: [
    {
      name: string;
      id: number;
      note: string;
      clientNotes: [];
      items: [
        {
          name: string;
          quantity: number;
          unit: string;
          calories: number;
          carbs: number;
          protein: number;
          fat: number;
          note: null;
        }
      ];
      itemTotals: {
        calories: number;
        carbs: number;
        protein: number;
        fat: number;
      };
    }
  ];
  mealTotals: { calories: number; carbs: number; protein: number; fat: number };
  base: boolean;
}
//make a shape for the context

export interface IMealPlanStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  mealPlan?: IMealPlan;
  mealPlans?: IMealPlan[]; // Array of MealPlans
}

//define the actions that will be performed on MealPlans

export interface IMealPlanActionContext {
  getMealPlanClient: () => void;
  getMealPlanTrainer: (mealPlan: IMealPlan) => void;
  createMealPlan: (mealPlan: IMealPlan) => void;
  getMealPlan: () => void;
}

//initial state with default  values
export const INITIAL_STATE: IMealPlanStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

//create the state context and the action context
export const MealPlanStateContext =
  createContext<IMealPlanStateContext>(INITIAL_STATE);

export const MealPlanActionContext =
  createContext<IMealPlanActionContext>(undefined);
