import { call, put, takeLatest } from "redux-saga/effects";
import SagaAPIs from "../api";
import { showMessage } from "../features/messageSlice";
import {
  findAllStatusDone,
  findAllStatusLoading,
  IStatus,
} from "../features/statusSlice";

export function* watchFindAllStatus() {
  yield takeLatest("STATUS/findAllStatusStart", findAllStatus);
}

function* findAllStatus() {
  yield put(findAllStatusLoading(true));

  try {
    const { data }: { data: IStatus[] } = yield call(
      SagaAPIs.status.findAllStatus
    );
    yield put(findAllStatusDone(data));
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          yield put(
            showMessage({
              text: "Invalid Credentials",
              type: "error",
            })
          );
          break;

        default:
          break;
      }
    }
  } finally {
    yield put(findAllStatusLoading(false));
  }
}
