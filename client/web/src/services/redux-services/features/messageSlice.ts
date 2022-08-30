import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessageState {
  errorMessage: string;
  toggleShowMessage: boolean;
  type: AlertColor;
}
const initialMessageState: IMessageState = {
  errorMessage: "",
  toggleShowMessage: false,
  type: "success",
};

interface IMassageParams {
  text: string;
  type: AlertColor;
}

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    showMessage(state, action: PayloadAction<IMassageParams>) {
      state.errorMessage = action.payload.text;
      state.toggleShowMessage = true;
      state.type = action.payload.type;
    },
    hideMessage(state) {
      state.toggleShowMessage = false;
      state.errorMessage = "";
    },
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;
const messageReducer = messageSlice.reducer;
export default messageReducer;
