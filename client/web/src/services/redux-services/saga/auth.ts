import { call, put, takeEvery } from "redux-saga/effects";
import { AuthServices } from "../../authservice";
import SagaAPIs from "../api";
import { loginDone, loginIsLoading, LoginStart } from "../features/authSlice";
import { showMessage } from "../features/messageSlice";

export function* watchLogin() {
  yield takeEvery("AUTH/loginStart", login);
}

function* login({ payload }: ReturnType<LoginStart>) {
  try {
    yield put(loginIsLoading(true));
    const {
      data: { access_token },
    }: { data: { access_token: string } } = yield call(
      SagaAPIs.auth.login,
      payload
    );
    if (access_token) {
      yield AuthServices.setAccessToken(access_token);
      yield put(loginDone(access_token));
    }
  } catch (error: any) {
    console.log("error ===>", error);

    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
        case 404:
          yield put(
            showMessage({
              text: "Wrong email or password",
              type: "error",
            })
          );
          break;

        default:
          break;
      }
    }
  } finally {
    yield put(loginIsLoading(false));
  }
}
