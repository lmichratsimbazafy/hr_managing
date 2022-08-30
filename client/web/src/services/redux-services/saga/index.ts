import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./auth";
import { watchFindAllConsultants, watchFindConsultantById } from "./consultant";
import { watchFindAllStatus } from "./status";

export const rootSaga = function* root() {
  yield all([
    fork(watchLogin),
    fork(watchFindAllConsultants),
    fork(watchFindAllStatus),
    fork(watchFindConsultantById),
  ]);
};
