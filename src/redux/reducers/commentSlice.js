import { createSlice } from "@reduxjs/toolkit";

import { AddCommentDB } from "../actions/comment";

export const initialState = {
  AddCommentDBLoading: false,
  AddCommentDBDone: false,
  AddCommentDBError: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //multi 작성하기
      .addCase(AddCommentDB.pending, state => {
        state.AddCommentDBLoading = true;
        state.AddCommentDBDone = false;
        state.AddCommentDBError = null;
      })
      .addCase(AddCommentDB.fulfilled, (state, action) => {
        state.AddCommentDBLoading = false;
        state.AddCommentDBDone = true;
        // state.multiPost = [...state.multiPost, action.payload];
      })
      .addCase(AddCommentDB.rejected, (state, action) => {
        state.AddCommentDBLoading = false;
        state.AddCommentDBError = action.error;
      }),
});

export default commentSlice;
