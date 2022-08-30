import { AuthAPI } from "./auth";
import { ConsultantAPI } from "./consultant";
import { StatusAPI } from "./status";

const SagaAPIs = {
  auth: AuthAPI,
  consultant: ConsultantAPI,
  status: StatusAPI,
};

export default SagaAPIs;
