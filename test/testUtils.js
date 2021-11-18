import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// 사용할 리듀서 임포트
import userReducer from "../src/redux/reducers/userSlice";

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { user: userReducer.reducer },
      initialState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
