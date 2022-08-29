import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootReducers } from "./features";
import { rootSaga } from "./saga";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducers,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

// then run the saga
sagaMiddleware.run(rootSaga);

// render the application
export default store;
