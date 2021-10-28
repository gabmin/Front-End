import { createSlice } from "@reduxjs/toolkit";

import { PostDB } from "../actions/multiCard";

export const initialState = {
  PostDBLoading: false,
  PostDBDone: false,
  PostDBError: null,
  multiPost: [],
};

const multiPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(PostDB.pending, state => {
        state.PostDBLoading = true;
        state.PostDBDone = false;
        state.PostDBError = null;
      })
      .addCase(PostDB.fulfilled, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBDone = true;
        state.multiPost = action.payload;
      })
      .addCase(PostDB.rejected, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBError = action.error;
      }),
});

export default multiPostSlice;
