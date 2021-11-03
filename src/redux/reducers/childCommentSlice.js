import { createSlice } from "@reduxjs/toolkit";

import { AddChildDB } from "../actions/childComment";

export const initialState = {
  AddChildDBLoading: false,
  AddChildDBDone: false,
  AddChildDBError: null,
  ChildCommentDB: [],
};

const childCommentSlice = createSlice({
  name: "childComment",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //childcomment 작성하기
      .addCase(AddChildDB.pending, state => {
        state.AddChildDBLoading = true;
        state.AddChildDBDone = false;
        state.AddChildDBError = null;
      })
      .addCase(AddChildDB.fulfilled, (state, action) => {
        state.AddChildDBLoading = false;
        state.AddChildDBDone = true;
        // state.ChildCommentDB = [...state.ChildCommentDB, action.payload];
      })
      .addCase(AddChildDB.rejected, (state, action) => {
        state.AddChildDBLoading = false;
        state.AddChildDBError = action.error;
      }),
});

export default childCommentSlice;
