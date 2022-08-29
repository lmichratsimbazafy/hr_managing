import axios, { AxiosPromise } from "axios";

export const findAllStatus = (): AxiosPromise<any> =>
  axios.get("/status/findAll");
