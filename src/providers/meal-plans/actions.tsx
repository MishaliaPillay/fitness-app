// "use client";
// import { IFood, IFoodStateContext } from "./context";
// import { createAction } from "redux-actions";
// //make enums defining the actions that can be dispatched

// export enum FoodActionEnums {
//   // define 3 states for each action (pending , success, error)

//   getAllFoodPending = "GET_FoodS_PENDING",
//   getAllFoodSuccess = "GET_FoodS_SUCCESS",
//   getAllFoodError = "GET_Foods_ERROR",

//   getFoodCategoryPending = "GET_Food_PENDING",
//   getFoodCategorySuccess = "GET_Food_SUCCESS",
//   getFoodCategoryError = "GET_Food_ERROR",

//   createFoodPending = "CREATE_Food_PENDING",
//   createFoodSuccess = "CREATE_Food_SUCCESS",
//   createFoodError = "CREATE_Food_ERROR",

//   searchFoodPending = "SEARCH_Food_PENDING",
//   searchFoodSuccess = "SEARCH_Food_SUCCESS",
//   searchFoodError = "SEARCH_Food_ERROR",
// }

// // createAction<PayloadType>(actionType, payloadCreator)

// //Get all Foods actions

// export const getAllFoodPending = createAction<IFoodStateContext>(
//   FoodActionEnums.getAllFoodPending,

//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const getAllFoodSuccess = createAction<IFoodStateContext, IFood[]>(
//   FoodActionEnums.getAllFoodSuccess,

//   (foods: IFood[]) => ({
//     isPending: false,
//     isSuccess: true,
//     isError: false,
//     foods,
//   })
// );

// export const getAllFoodError = createAction<IFoodStateContext>(
//   FoodActionEnums.getAllFoodError,

//   () => ({ isPending: false, isSuccess: false, isError: true })
// );

// export const getFoodCategoryPending = createAction<IFoodStateContext>(
//   FoodActionEnums.getFoodCategoryPending,
//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const getFoodCategorySuccess = createAction<IFoodStateContext, IFood>(
//   FoodActionEnums.getFoodCategorySuccess,
//   (food: IFood) => ({
//     isPending: false,
//     isSuccess: true,
//     isError: false,
//     food,
//   })
// );

// export const getFoodCategoryError = createAction<IFoodStateContext>(
//   FoodActionEnums.getFoodCategoryError,
//   () => ({ isPending: false, isSuccess: false, isError: true })
// );

// export const createFoodPending = createAction<IFoodStateContext>(
//   FoodActionEnums.createFoodPending,
//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const createFoodSuccess = createAction<IFoodStateContext, IFood[]>(
//   FoodActionEnums.createFoodSuccess,
//   (foods: IFood[]) => ({
//     isPending: false,
//     isSuccess: true,
//     isError: false,
//     foods,
//   })
// );

// export const createFoodError = createAction<IFoodStateContext>(
//   FoodActionEnums.createFoodError,
//   () => ({ isPending: false, isSuccess: false, isError: true })
// );

// export const searchFoodPending = createAction<IFoodStateContext>(
//   FoodActionEnums.searchFoodPending,
//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const searchFoodSuccess = createAction<IFoodStateContext, IFood>(
//   FoodActionEnums.searchFoodSuccess,
//   (food: IFood) => ({
//     isPending: false,
//     isSuccess: true,
//     isError: false,
//     food,
//   })
// );

// export const searchFoodError = createAction<IFoodStateContext>(
//   FoodActionEnums.searchFoodError,
//   () => ({ isPending: false, isSuccess: false, isError: true })
// );
