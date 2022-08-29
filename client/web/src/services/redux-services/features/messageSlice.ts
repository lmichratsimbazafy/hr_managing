import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessageState {
  errorMessage: string;
  toggleShowMessage: boolean;
}
const initialMessageState: IMessageState = {
  errorMessage: "",
  toggleShowMessage: false,
};

interface IMassageParams {
  text: string;
  type?: "success" | "error";
}

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    showMessage(state, action: PayloadAction<IMassageParams>) {
      state.errorMessage = action.payload.text;
      state.toggleShowMessage = true;
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
