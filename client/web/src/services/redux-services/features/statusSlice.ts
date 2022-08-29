import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typedAction } from "../utils";

export interface IStatus {
  id: string;
  label: string;
  displayText: string;
}

export interface IStatusState {
  loading: boolean;
  statusList: IStatus[];
}

export const initialState: IStatusState = {
  loading: false,
  statusList: [] as IStatus[],
};
export const findAllStatusStart = () =>
  typedAction("STATUS/findAllStatusStart");

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    findAllStatusLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    findAllStatusDone: (state, action: PayloadAction<IStatus[]>) => {
      state.statusList = action.payload;
    },
  },
});

const statusReducer = statusSlice.reducer;
export const { findAllStatusDone, findAllStatusLoading } = statusSlice.actions;
export default statusReducer;
