import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import SagaAPIs from "../api";
import {
  findAllConsultantsDone,
  findAllConsultantsLoading,
  FindAllConsultantsStart,
  findConsultantByIdDone,
  IConsultant,
} from "../features/consultantSlice";
import { showMessage } from "../features/messageSlice";

export function* watchFindAllConsultants() {
  yield takeLatest("CONSULTANT/findAllConsultantsStart", findAllConsultants);
}

function* findAllConsultants({ payload }: ReturnType<FindAllConsultantsStart>) {
  try {
    yield put(findAllConsultantsLoading(true));
    const { data }: { data: IConsultant[] } = yield call(
      SagaAPIs.consultant.findAllConsultants,
      payload
    );
    yield put(findAllConsultantsDone(data));
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
    yield put(findAllConsultantsLoading(false));
  }
}

export function* watchFindConsultantById() {
  yield takeEvery("CONSULTANT/findConsultantById", findConsultantById);
}
function* findConsultantById({ payload }: ReturnType<FindAllConsultantsStart>) {
  yield put(findAllConsultantsLoading(true));
  try {
    const { data }: { data: IConsultant } = yield call(
      SagaAPIs.consultant.findConsultantById,
      payload
    );

    yield put(findConsultantByIdDone(data));
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
    yield put(findAllConsultantsLoading(false));
  }
}
