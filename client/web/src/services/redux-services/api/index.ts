import { login } from "./auth";
import { ConsultantAPI } from "./consultant";
import { findAllStatus } from "./status";

const SagaAPIs = {
  auth: {
    login,
  },
  consultant: ConsultantAPI,
  status: {
    findAllStatus,
  },
};

export default SagaAPIs;
