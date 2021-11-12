import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  paramsId: "all",
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    SetParams: (state, action) => {
      state.paramsId = action.payload;
    },
  },
});

export const { SetParams } = paramsSlice.actions;

export default paramsSlice;
