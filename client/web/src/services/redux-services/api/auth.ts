import axios, { AxiosPromise } from "axios";
import { ILoginParams } from "../features/authSlice";

export const login = (loginParams: ILoginParams): AxiosPromise<any> =>
  axios.post(`/auth/login`, { ...loginParams });
