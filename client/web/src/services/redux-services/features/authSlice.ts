import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typedAction } from "../utils";

export interface IAuthState {
  token: string;
  isLoading: boolean;
}

const initialState: IAuthState = {
  token: "",
  isLoading: false,
};

export interface ILoginParams {
  email: string;
  password: string;
}

// Actions creator
export const loginStart = (loginParams: ILoginParams) =>
  typedAction("AUTH/loginStart", loginParams);

export type LoginStart = typeof loginStart;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    loginDone(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
export const { loginDone, loginIsLoading } = authSlice.actions;
export default authReducer;
