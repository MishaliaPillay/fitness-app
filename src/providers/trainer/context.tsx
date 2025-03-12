"use client";
import { createContext } from "react";

// make a Trainer object

export interface ITrainer {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  contactNumber: string;
  planType: string;
  activeState: boolean;
  trial: boolean;
  policiesAccepted: boolean;
  fullName: string;
  id: string;
  date: string;
}

//make a shape for the context

export interface ITrainerStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  trainer?: ITrainer;
  trainers?: ITrainer[]; // Array of Trainers
}

//define the actions that will be performed on Trainers

export interface ITrainerActionContext {
  getTrainers: (id: string) => void;
  getTrainer: (id: string) => void;
  createTrainer: (trainer: ITrainer) => void;
  updateTrainer: (trainer: ITrainer) => void;
  deleteTrainer: (id: string) => void;
}

//initial state with default  values
export const INITIAL_STATE: ITrainerStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

//create the state context and the action context
export const TrainerStateContext =
  createContext<ITrainerStateContext>(INITIAL_STATE);

export const TrainerActionContext =
  createContext<ITrainerActionContext>(undefined);
