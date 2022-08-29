import { combineReducers } from "redux";
import authReducer from "./authSlice";
import consultantReducer from "./consultantSlice";
import messageReducer from "./messageSlice";
import statusReducer from "./statusSlice";

export const rootReducers = {
  auth: authReducer,
  message: messageReducer,
  consultant: consultantReducer,
  status: statusReducer,
};

const combinedReducers = combineReducers(rootReducers);
export type RootState = ReturnType<typeof combinedReducers>;
