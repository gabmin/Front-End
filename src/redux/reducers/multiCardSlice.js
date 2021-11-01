import { createSlice } from "@reduxjs/toolkit";

import {
  PostDB,
  PostingDB,
  PostCompleteDB,
  AddPostDB,
  DeletePostDB,
} from "../actions/multiCard";

export const initialState = {
  PostDBLoading: false,
  PostDBDone: false,
  PostDBError: null,
  multiPost: [],
  PostingDBLoading: false,
  PostingDBDone: false,
  PostingDBError: null,
  multiPosting: [],
  PostCompleteDBLoading: false,
  PostCompleteDBDone: false,
  PostCompleteDBError: null,
  multiPostComplete: [],
  AddPostDBLoading: false,
  AddPostDBDone: false,
  AddPostDBError: null,
  DeletePostDBLoading: false,
  DeletePostDBDone: false,
  DeletePostDBError: null,
};

const multiPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //multi 전체보기
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
      })
      //multi 진행중 보기
      .addCase(PostingDB.pending, state => {
        state.PostDBLoading = true;
        state.PostDBDone = false;
        state.PostDBError = null;
      })
      .addCase(PostingDB.fulfilled, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBDone = true;
        state.multiPosting = action.payload;
      })
      .addCase(PostingDB.rejected, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBError = action.error;
      })
      //multi 종료됨 보기
      .addCase(PostCompleteDB.pending, state => {
        state.PostDBLoading = true;
        state.PostDBDone = false;
        state.PostDBError = null;
      })
      .addCase(PostCompleteDB.fulfilled, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBDone = true;
        state.multiPostComplete = action.payload;
      })
      .addCase(PostCompleteDB.rejected, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBError = action.error;
      })
      //multi 작성하기
      .addCase(AddPostDB.pending, state => {
        state.AddPostDBLoading = true;
        state.AddPostDBDone = false;
        state.AddPostDBError = null;
      })
      .addCase(AddPostDB.fulfilled, (state, action) => {
        state.AddPostDBLoading = false;
        state.AddPostDBDone = true;
        // state.multiPost = [...state.multiPost, action.payload];
      })
      .addCase(AddPostDB.rejected, (state, action) => {
        state.AddPostDBLoading = false;
        state.AddPostDBError = action.error;
      })
      //multi 삭제하기
      .addCase(DeletePostDB.pending, state => {
        state.DeletePostDBLoading = true;
        state.DeletePostDBDone = false;
        state.DeletePostDBError = null;
      })
      .addCase(DeletePostDB.fulfilled, (state, action) => {
        state.DeletePostDBLoading = false;
        state.DeletePostDBDone = true;
        // state.multiPost = [...state.multiPost, action.payload];
      })
      .addCase(DeletePostDB.rejected, (state, action) => {
        state.DeletePostDBLoading = false;
        state.DeletePostDBError = action.error;
      }),
});

export default multiPostSlice;
