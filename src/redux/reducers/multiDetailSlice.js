import { createSlice } from "@reduxjs/toolkit";

import { DetailDB } from "../actions/multiDetail";

export const initialState = {
  DetailDBLoading: false,
  DetailDBDone: false,
  DetailDBError: null,
  multiDetail: [],
};

const multiDetailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //detail 보기
      .addCase(DetailDB.pending, state => {
        state.DetailDBLoading = true;
        state.DetailDBDone = false;
        state.DetailDBError = null;
      })
      .addCase(DetailDB.fulfilled, (state, action) => {
        state.DetailDBLoading = false;
        state.DetailDBDone = true;
        state.multiDetail = action.payload;
        console.log("action", action);
      })
      .addCase(DetailDB.rejected, (state, action) => {
        state.DetailDBLoading = false;
        state.DetailDBError = action.error;
      }),
});

export default multiDetailSlice;
