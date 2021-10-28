import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//모듈 불러오기
import userSlice from "./reducers/userSlice";
import postSlice from "./reducers/eitherCardSlice";

export const history = createBrowserHistory();

//리듀서 전달하기
const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  eitherCard: postSlice.reducer,
});

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production", // production 일 때는, devtools 사용 안하도록 설정
});

export default store;
