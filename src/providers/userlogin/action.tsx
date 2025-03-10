"use client";
import { IUser, IUserStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum UserActionEnums {
  // define 3 states for each action (pending , success, error)

  getUsersPending = "GET_UserS_PENDING",
  getUsersSuccess = "GET_UserS_SUCCESS",
  getUsersError = "GET_Users_ERROR",

  getUserPending = "GET_User_PENDING",
  getUserSuccess = "GET_User_SUCCESS",
  getUserError = "GET_User_ERROR",

  createUserPending = "CREATE_User_PENDING",
  createUserSuccess = "CREATE_User_SUCCESS",
  createUserError = "CREATE_User_ERROR",
}

// createAction<PayloadType>(actionType, payloadCreator)

//Get all user actions

export const getUsersPending = createAction<IUserStateContext>(
  UserActionEnums.getUsersPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUsersSuccess = createAction<IUserStateContext, IUser[]>(
  UserActionEnums.getUsersSuccess,

  (user: IUser[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const getUsersError = createAction<IUserStateContext>(
  UserActionEnums.getUsersError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getUserPending = createAction<IUserStateContext>(
  UserActionEnums.getUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.getUserSuccess,
  (user: IUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const getUserError = createAction<IUserStateContext>(
  UserActionEnums.getUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createUserPending = createAction<IUserStateContext>(
  UserActionEnums.createUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createUserSuccess = createAction<IUserStateContext, IUser[]>(
  UserActionEnums.createUserSuccess,
  (user: IUser[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const createUserError = createAction<IUserStateContext>(
  UserActionEnums.createUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
