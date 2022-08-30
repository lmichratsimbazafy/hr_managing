import axios, { AxiosPromise } from "axios";

export class StatusAPI {
  static findAllStatus = (): AxiosPromise<any> => axios.get("/status/findAll");
}
