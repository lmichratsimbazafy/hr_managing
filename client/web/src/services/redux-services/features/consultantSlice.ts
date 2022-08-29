import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typedAction } from "../utils";
import { IStatus } from "./statusSlice";

export interface IFindAllConsultantsFilter {
  statusIds?: string[];
}

export interface IConsultant {
  id: string;
  lastName: string;
  firstName: string;
  emailAddress: string;
  phone: string;
  status?: IStatus;
  startDate: Date;
  endDate: Date;
}

export interface IConsultantState {
  loading: boolean;
  consultants: IConsultant[];
  consultantDetails?: IConsultant;
}

const initialState: IConsultantState = {
  loading: false,
  consultants: [] as IConsultant[],
  consultantDetails: undefined,
};

export const findAllConsultantsStart = (params?: IFindAllConsultantsFilter) =>
  typedAction("CONSULTANT/findAllConsultantsStart", params);
export type FindAllConsultantsStart = typeof findAllConsultantsStart;

export const findConsultantByIdStart = (id: string) =>
  typedAction("CONSULTANT/findConsultantById", id);
export type FindConsultantByIdStart = typeof findConsultantByIdStart;

const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {
    findAllConsultantsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    findAllConsultantsDone: (state, action: PayloadAction<IConsultant[]>) => {
      state.consultants = action.payload;
    },
    findConsultantByIdDone: (state, action: PayloadAction<IConsultant>) => {
      state.consultantDetails = action.payload;
    },
  },
});

const consultantReducer = consultantSlice.reducer;
export const {
  findAllConsultantsDone,
  findAllConsultantsLoading,
  findConsultantByIdDone,
} = consultantSlice.actions;
export default consultantReducer;
