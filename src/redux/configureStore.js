import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//모듈 불러오기
import userSlice from "./reducers/userSlice";
import mainSlice from "./reducers/mainSlice";
import postSlice from "./reducers/eitherCardSlice";
import multiPostSlice from "./reducers/multiCardSlice";
import profileSlice from "./reducers/profileSlice";
import searchSlice from "./reducers/searchSlice";
import multiDetailSlice from "./reducers/multiDetailSlice";

export const history = createBrowserHistory();

//리듀서 전달하기
const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  main: mainSlice.reducer,
  eitherCard: postSlice.reducer,
  multiCard: multiPostSlice.reducer,
  multiDetail: multiDetailSlice.reducer,
  profile: profileSlice.reducer,
  search: searchSlice.reducer,
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
