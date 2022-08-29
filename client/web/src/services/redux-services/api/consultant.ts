import axios, { AxiosPromise } from "axios";
import { IFindAllConsultantsFilter } from "../features/consultantSlice";

export class ConsultantAPI {
  static findAllConsultants = (
    filter?: IFindAllConsultantsFilter
  ): AxiosPromise<any> => axios.get(`/consultants`, { params: { ...filter } });

  static findConsultantById = (id: string): AxiosPromise<any> =>
    axios.get(`/consultants/${id}`);
}
