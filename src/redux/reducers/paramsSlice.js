import { createSlice } from "@reduxjs/toolkit";

// 기본 state
export const initialState = {
  paramsId: "all",
};

// toolkit 사용방법
const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    SetParams: (state, action) => {
      state.paramsId = action.payload;
      console.log("payload", action.payload);
    },
  },
  extraReducers: builder => builder,
});

export const { SetParams } = paramsSlice.actions;

export default paramsSlice;
